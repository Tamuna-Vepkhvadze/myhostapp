const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const { v4: uuidv4 } = require("uuid");
const FormData = require("form-data");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret_in_prod";
const API_KEY = process.env.API_KEY || "mysecret123";
const IMGBB_API_KEY = "d101c63beadeac1bed4c81a40491c18c";
// Enable CORS
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.static(path.join(__dirname, "public")));
// SQLite init
const db = new sqlite3.Database(path.join(__dirname, "mydb.sqlite"), (err) => {
  if (err) console.error("DB connection error:", err.message);
  else console.log("SQLite connected.");
});
// Users table
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    password TEXT NOT NULL,
    image TEXT,
    createdAt TEXT,
    updatedAt TEXT
  )
`);
// Middlewares
function authMiddleware(req, res, next) {
  const auth = req.headers["authorization"];
  if (!auth) return res.status(401).json({ error: "Authorization header missing" });
  const parts = auth.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") return res.status(401).json({ error: "Invalid auth format" });
  const token = parts[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
function authKeyMiddleware(req, res, next) {
  const key = req.headers["x-api-key"];
  if (!key || key !== API_KEY) {
    return res.status(403).json({ error: "Forbidden: Invalid API Key" });
  }
  next();
}
// Health check
app.get("/health", (req, res) => res.json({ ok: true }));

// Function to upload image to ImgBB
async function uploadImageToImgBB(imageData) {
  if (!imageData) return null;

  let imageBuffer;
  let filename = "profile.jpg";

  if (typeof imageData === "string") {
    // If it's a URL, just return it (existing functionality)
    return imageData;
  } else if (imageData.startsWith("data:")) {
    // Base64 data
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, "");
    imageBuffer = Buffer.from(base64Data, "base64");
    filename = `profile_${Date.now()}.jpg`;
  } else {
    // Assume it's a file path or binary, but since it's JSON, likely base64
    return null; // Invalid format
  }

  // Save temp file
  const tempPath = path.join(__dirname, "temp", filename);
  if (!fs.existsSync(path.join(__dirname, "temp"))) {
    fs.mkdirSync(path.join(__dirname, "temp"));
  }
  fs.writeFileSync(tempPath, imageBuffer);

  const form = new FormData();
  form.append("key", IMGBB_API_KEY);
  form.append("image", fs.createReadStream(tempPath));

  try {
    const response = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: form,
    });
    const result = await response.json();

    // Clean up temp file
    fs.unlinkSync(tempPath);

    if (result.success) {
      return result.data.url;
    } else {
      console.error("ImgBB upload error:", result);
      return null;
    }
  } catch (error) {
    console.error("Upload error:", error);
    // Clean up temp file if exists
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
    return null;
  }
}

// Register
app.post("/api/register", async (req, res) => {
  const { firstName, lastName, email, phone, password, confirmPassword, image } = req.body;
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: "All required fields must be filled." });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match." });
  }
  db.get("SELECT * FROM users WHERE email = ?", [email.toLowerCase()], async (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (row) return res.status(400).json({ error: "Email already registered." });
    const hashed = await bcrypt.hash(password, 10);
    const now = new Date().toISOString();

    // Upload image if provided
    const uploadedImageUrl = await uploadImageToImgBB(image);

    db.run(
      `INSERT INTO users (firstName,lastName,email,phone,password,image,createdAt,updatedAt)
       VALUES (?,?,?,?,?,?,?,?)`,
      [firstName, lastName, email.toLowerCase(), phone || null, hashed, uploadedImageUrl, now, now],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        const user = {
          id: this.lastID,
          firstName,
          lastName,
          email: email.toLowerCase(),
          phone: phone || null,
          image: uploadedImageUrl,
          createdAt: now,
          updatedAt: now,
        };
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "2h" });
        res.json({ token, user });
      }
    );
  });
});
// Login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email and password are required." });
  const normalizedEmail = email.toLowerCase();
  db.get("SELECT * FROM users WHERE email = ?", [normalizedEmail], async (err, user) => {
    if (err) return res.status(500).json({ error: "Internal server error." });
    const invalidMsg = { error: "Email or password is incorrect." };
    if (!user) return res.status(401).json(invalidMsg);
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json(invalidMsg);
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "2h" });
    const { password: _, ...userWithoutPassword } = user;
    res.json({ token, user: userWithoutPassword });
  });
});
// Get all users
app.get("/api/users", authKeyMiddleware, authMiddleware, (req, res) => {
  db.all("SELECT id, firstName, lastName, email, phone, image, createdAt, updatedAt FROM users", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});
// Get user by id
app.get("/api/users/:id", authKeyMiddleware, authMiddleware, (req, res) => {
  const id = Number(req.params.id);
  db.get("SELECT id, firstName, lastName, email, phone, image, createdAt, updatedAt FROM users WHERE id = ?", [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "User not found" });
    res.json(row);
  });
});
// Update user
app.put("/api/users/:id", authKeyMiddleware, authMiddleware, async (req, res) => {
  const id = Number(req.params.id);
  const { firstName, lastName, phone, image } = req.body;
  const now = new Date().toISOString();

  // Upload new image if provided
  const uploadedImageUrl = await uploadImageToImgBB(image);

  db.run(
    "UPDATE users SET firstName=?, lastName=?, phone=?, image=?, updatedAt=? WHERE id=?",
    [firstName, lastName, phone, uploadedImageUrl, now, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: "User not found" });
      db.get("SELECT * FROM users WHERE id = ?", [id], (err, updatedUser) => {
        if (err) return res.status(500).json({ error: err.message });
        const { password, ...userWithoutPassword } = updatedUser;
        res.json({ user: userWithoutPassword });
      });
    }
  );
});
// Delete user
app.delete("/api/users/:id", authKeyMiddleware, authMiddleware, (req, res) => {
  const id = Number(req.params.id);
  db.run("DELETE FROM users WHERE id=?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted" });
  });
});
// Change password
app.post("/api/change-password", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) return res.status(400).json({ error: "Both old and new passwords are required." });
    db.get("SELECT * FROM users WHERE id = ?", [userId], async (err, user) => {
      if (err) return res.status(500).json({ error: "Database error." });
      if (!user) return res.status(404).json({ error: "User not found." });
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) return res.status(401).json({ error: "Old password is incorrect." });
      const hashed = await bcrypt.hash(newPassword, 10);
      const now = new Date().toISOString();
      db.run("UPDATE users SET password = ?, updatedAt = ? WHERE id = ?", [hashed, now, userId], (err) => {
        if (err) return res.status(500).json({ error: "Failed to update password." });
        res.json({ message: "Password changed successfully." });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unexpected server error." });
  }
});
// -------------------- SOCKET.IO CHAT --------------------
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
  path: "/socket.io",
});

const users = new Map();
const messages = [];

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  
  // auth-ის მონაცემების მიღება connection-ის დროს
  const authData = socket.handshake.auth;
  console.log("Auth data received:", authData);
  
  socket.on("join", (userData) => {
    const username = userData?.username || authData?.username || `User-${socket.id.slice(0, 5)}`;
    
    // avatar-ის სწორად დამუშავება
    let avatar;
    if (userData?.avatar) {
      avatar = userData.avatar;
    } else if (authData?.avatar) {
      avatar = authData.avatar;
    } else {
      // default dicebear avatar
      avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(username)}`;
    }
    
    const user = {
      id: socket.id,
      username,
      avatar, // ახლა სწორად მიიღება ყველა შემთხვევაში
    };
    
    users.set(socket.id, user);
    
    socket.emit("chat_history", messages);
    io.emit("users_update", Array.from(users.values()));
    
    const joinMsg = {
      id: uuidv4(),
      type: "system",
      content: `${user.username} joined the chat`,
      timestamp: new Date().toISOString(),
    };
    
    messages.push(joinMsg);
    io.emit("message", joinMsg);
    console.log(`${user.username} joined the chat with avatar: ${avatar}`);
  });

  socket.on("send_message", (data) => {
    const user = users.get(socket.id);
    if (!user) return;
    
    const message = {
      id: uuidv4(),
      type: "user",
      content: data.content,
      timestamp: new Date().toISOString(),
      user,
    };
    
    messages.push(message);
    if (messages.length > 200) messages.shift();
    
    io.emit("message", message);
    console.log(`Message from ${user.username}: ${data.content}`);
  });
  socket.on("edit_message", ({ msgId, newContent }) => {
  const user = users.get(socket.id);
  if (!user) return;
  const msg = messages.find(m => m.id === msgId && m.type === "user");
  if (msg && msg.user?.username === user.username) {
    msg.content = newContent;
    io.emit("message_edited", msg);
  }
})

  socket.on("delete_message", (msgId) => {
    const user = users.get(socket.id);
    if (!user) return;
    
    const index = messages.findIndex((m) => m.id === msgId && m.type === "user");
    if (index !== -1) {
      const msg = messages[index];
      if (msg.user && msg.user.username === user.username) {
        messages.splice(index, 1);
        io.emit("message_deleted", msgId);
        console.log(`Message ${msgId} deleted by ${user.username}`);
      }
    }
  });

  socket.on("typing", (isTyping) => {
    const user = users.get(socket.id);
    if (user) {
      socket.broadcast.emit("user_typing", {
        userId: socket.id,
        username: user.username,
        isTyping,
      });
    }
  });

  // ზარის სიგნალიზაციის მოვლენები
  socket.on("call_user", (data) => {
    const { to, offer } = data;
    const user = users.get(socket.id);
    if (!user) return;

    // გაგზავნე ზარის მოთხოვნა მითითებულ მომხმარებელზე
    socket.to(to).emit("incoming_call", {
      from: socket.id,
      offer,
      username: user.username,
      avatar: user.avatar,
    });
  });

  socket.on("answer_call", (data) => {
    const { to, answer } = data;
    socket.to(to).emit("call_accepted", { answer });
  });

  socket.on("ice_candidate", (data) => {
    const { to, candidate } = data;
    socket.to(to).emit("ice_candidate", { candidate });
  });

  socket.on("end_call", (data) => {
    const { to } = data;
    socket.to(to).emit("call_ended");
  });

  socket.on("disconnect", () => {
    const user = users.get(socket.id);
    if (user) {
      const leaveMsg = {
        id: uuidv4(),
        type: "system",
        content: `${user.username} left the chat`,
        timestamp: new Date().toISOString(),
      };
      
      messages.push(leaveMsg);
      users.delete(socket.id);
      io.emit("message", leaveMsg);
      io.emit("users_update", Array.from(users.values()));
      console.log(`${user.username} left the chat`);
    }
    console.log("User disconnected:", socket.id);
  });
});


// Start server with socket.io
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});