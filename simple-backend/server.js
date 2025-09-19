const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors"); // Added CORS package

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret_in_prod";
const API_KEY = process.env.API_KEY || "mysecret123"; // ესაა ჩვენი სერვერის გასაღები

// Enable CORS for all origins
app.use(cors()); // Added CORS middleware

// აქ არის განსაზღვრული თუ რა ტიპის ინფორმაციას ელოდება
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ეს არის ჩვენი ესქიუელ სერვერი
const db = new sqlite3.Database(path.join(__dirname, "mydb.sqlite"), (err) => {
  if (err) console.error("DB connection error:", err.message);
  else console.log("SQLite connected.");
});

// ეს კი არის თუ რა ტიპის მომხმარებლის ინფორმაციას მიიღებს
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

// ეს არის ჯივიტი ტოცენი რომ ჩვენი მომხმარებლები უსაფრთხოდ იყვნენ
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

// აქ მოწოდებულ გასაღებს ამოწმებს და შესაბამისად მოქმედებს
function authKeyMiddleware(req, res, next) {
  const key = req.headers["x-api-key"];
  if (!key || key !== API_KEY) {
    return res.status(403).json({ error: "Forbidden: Invalid API Key" });
  }
  next();
}

app.get("/health", (req, res) => res.json({ ok: true }));

// რეგისტრაციის ფუნქცია
app.post("/api/register", async (req, res) => {
  const { firstName, lastName, email, phone, password, confirmPassword, image } = req.body;

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: "All required fields must be filled." });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match." });
  }

  // შეამოწმე, არსებობს თუ არა მომხმარებელი
  db.get("SELECT * FROM users WHERE email = ?", [email.toLowerCase()], async (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (row) return res.status(400).json({ error: "Email already registered." });

    const hashed = await bcrypt.hash(password, 10);
    const now = new Date().toISOString();

    // ახალი მომხმარებლის დამატება
    db.run(
      `INSERT INTO users (firstName,lastName,email,phone,password,image,createdAt,updatedAt)
       VALUES (?,?,?,?,?,?,?,?)`,
      [firstName, lastName, email.toLowerCase(), phone || null, hashed, image || null, now, now],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });

        // user object password-ის გარეშე
        const user = {
          id: this.lastID,
          firstName,
          lastName,
          email: email.toLowerCase(),
          phone: phone || null,
          image: image || null,
          createdAt: now,
          updatedAt: now
        };

        // შექმენი token
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "2h" });

        // აბრუნებს token + user
        res.json({ token, user });
      }
    );
  });
});


// შესვლის თუ ვალიდაციის რაც ქვია ეე იმის ფუნქცია
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  // სწრაფი ვალიდაცია
  if (!email || !password) {
    return res.status(400).json({ error: "Email or password is incorrect." });
  }

  const normalizedEmail = email.toLowerCase();

  db.get("SELECT * FROM users WHERE email = ?", [normalizedEmail], async (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error." });
    }

    // ერთი მესიჯი ყველა არასწორ შემთხვევაში
    const invalidMsg = { error: "Email or password is incorrect." };

    if (!user) {
      return res.status(400).json(invalidMsg);
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(400).json(invalidMsg);
    }

    // JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    const { password: _, ...userWithoutPassword } = user;

    res.json({
      token,
      user: userWithoutPassword,
    });
  });
});


// ყველა მომხმარებლის წამოღება
app.get("/api/users", authKeyMiddleware, authMiddleware, (req, res) => {
  db.all("SELECT id, firstName, lastName, email, phone, image, createdAt, updatedAt FROM users", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// ერთი კონკრეტული მომხმარებლის ინფორმაციის წამოღება აიდით
app.get("/api/users/:id", authKeyMiddleware, authMiddleware, (req, res) => {
  const id = Number(req.params.id);
  db.get("SELECT id, firstName, lastName, email, phone, image, createdAt, updatedAt FROM users WHERE id = ?", [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "User not found" });
    res.json(row);
  });
});

// აბდეით ფუნქცია
app.put("/api/users/:id", authKeyMiddleware, authMiddleware, (req, res) => {
  const id = Number(req.params.id);
  const { firstName, lastName, phone, image } = req.body;
  const now = new Date().toISOString();

  db.run(
    "UPDATE users SET firstName=?, lastName=?, phone=?, image=?, updatedAt=? WHERE id=?",
    [firstName, lastName, phone, image, now, id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: "User not found" });
      res.json({ message: "User updated" });
    }
  );
});

// წაშლის ფუნქცია
app.delete("/api/users/:id", authKeyMiddleware, authMiddleware, (req, res) => {
  const id = Number(req.params.id);
  db.run("DELETE FROM users WHERE id=?", [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted" });
  });
});

// ეს არის ერორი არ გვჭირდება მაგრამ მაინც იყოს
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});