import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { userstate } from "../../../zustand/Uzerstate";
import { Link, useNavigate } from "react-router-dom";

interface User {
  id: string;
  username: string;
  avatar?: string;
}

interface Message {
  id: string;
  content: string;
  timestamp: string;
  type: "user" | "system";
  user?: User;
}

export default function ChatPage() {
  const { globalstate } = userstate();
  const navigate = useNavigate();
  
  const navigateToProfile = () => {
    navigate("/UserProfaile");
  };
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const [input, setInput] = useState("");
  const [modalMessage, setModalMessage] = useState<Message | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Video call states
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);
  const [currentCallTarget, setCurrentCallTarget] = useState<string | null>(null);
  const [incomingCall, setIncomingCall] = useState<{ from: string; offer: RTCSessionDescriptionInit; username: string; avatar: string } | null>(null);
  const [isInCall, setIsInCall] = useState(false);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const iceServers = [
    { urls: "stun:stun.l.google.com:19302" },
  ];
  const config = { iceServers };

  useEffect(() => {
    if (!globalstate) return;
    console.log("[Socket] Initializing...");
    const socket = io("/", {
      path: "/socket.io",
      transports: ["websocket"],
      auth: {
        username: `${globalstate.firstName} ${globalstate.lastName}`,
        avatar: globalstate.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(globalstate.firstName + globalstate.lastName)}`,
      },
    });
    socketRef.current = socket;
    socket.on("connect", () => {
      console.log("[Socket] Connected with id:", socket.id);
      socket.emit("join", {
        username: `${globalstate.firstName} ${globalstate.lastName}`,
        avatar: globalstate.image || undefined,
      });
    });
    socket.on("disconnect", (reason) => {
      console.log("[Socket] Disconnected:", reason);
    });
    socket.on("connect_error", (err) => {
      console.error("[Socket] Connect error:", err);
    });
    socket.on("chat_history", (history: Message[]) => {
      console.log("[Socket] chat_history received:", history);
      setMessages(history || []);
    });
    socket.on("message", (msg: Message) => {
      console.log("[Socket] New message received:", msg);
      setMessages((prev) => [...prev, msg]);
    });
    socket.on("users_update", (users: User[]) => {
      console.log("[Socket] Online users update:", users);
      setOnlineUsers(users);
    });
   socket.on("message_deleted", (id: string) => {
    console.log("[Socket] Message deleted:", id);
    setMessages((prev) => prev.filter((m) => m.id !== id));
   });

    // Video call socket events
    socket.on("incoming_call", ({ from, offer, username, avatar }) => {
      setIncomingCall({ from, offer, username, avatar });
    });

    socket.on("call_accepted", async ({ answer }) => {
      if (peerConnection) {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
        setIsInCall(true);
      }
    });

    socket.on("ice_candidate", async ({ candidate }) => {
      if (peerConnection) {
        try {
          await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (error) {
          console.error("Error adding ICE candidate:", error);
        }
      }
    });

    socket.on("call_ended", () => {
      endCall();
    });

    return () => {
      console.log("[Socket] Cleaning up / disconnecting...");
      socket.disconnect();
      endCall();
    };
  }, [globalstate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim() || !socketRef.current) return;
    console.log("[Socket] Sending message:", input.trim());
    socketRef.current.emit("send_message", { content: input.trim() });
    setInput("");
  };

  const handleDelete = (msg: Message) => {
    if (!socketRef.current || !msg.user) return;
    if (msg.user.username !== `${globalstate?.firstName} ${globalstate?.lastName}`) return;
    console.log("[Socket] Deleting message id:", msg.id);
    socketRef.current.emit("delete_message", msg.id);
  };

  // Video call functions
  const getMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      return stream;
    } catch (error) {
      console.error("Error accessing media devices:", error);
      return null;
    }
  };

  const startCall = async (targetUserId: string) => {
    const stream = await getMedia();
    if (!stream || !socketRef.current) return;

    const pc = new RTCPeerConnection(config);
    setPeerConnection(pc);

    stream.getTracks().forEach((track) => pc.addTrack(track, stream));

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current?.emit("ice_candidate", { to: targetUserId, candidate: event.candidate });
      }
    };

    pc.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    socketRef.current.emit("call_user", { to: targetUserId, offer });

    setCurrentCallTarget(targetUserId);
  };

  const acceptCall = async () => {
    if (!incomingCall || !socketRef.current) return;

    const stream = await getMedia();
    if (!stream) return;

    const pc = new RTCPeerConnection(config);
    setPeerConnection(pc);

    stream.getTracks().forEach((track) => pc.addTrack(track, stream));

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current?.emit("ice_candidate", { to: incomingCall.from, candidate: event.candidate });
      }
    };

    pc.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    await pc.setRemoteDescription(new RTCSessionDescription(incomingCall.offer));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    socketRef.current.emit("answer_call", { to: incomingCall.from, answer });

    setIsInCall(true);
    setIncomingCall(null);
    setCurrentCallTarget(incomingCall.from);
  };

  const rejectCall = () => {
    setIncomingCall(null);
  };

  const endCall = () => {
    if (peerConnection) {
      peerConnection.close();
      setPeerConnection(null);
    }
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      setLocalStream(null);
    }
    if (localVideoRef.current) localVideoRef.current.srcObject = null;
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
    if (currentCallTarget && socketRef.current) {
      socketRef.current.emit("end_call", { to: currentCallTarget });
    }
    setCurrentCallTarget(null);
    setIsInCall(false);
    setIncomingCall(null);
  };

  if (!globalstate) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-4">
        <div className="text-center p-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl max-w-md w-full">
          <div className="text-4xl mb-4">🔒</div>
          <Link to={"/LogIn"}>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">მომხმარებლის ავტორიზაცია</h2>
          </Link>
          <p className="text-gray-600">მხოლოდ დალოგინებული მომხმარებლები შეუძლიათ ჩათის გამოყენება</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen overflow-auto">
      {/* მარცხენა პანელი - Desktop */}
      <div  className={`bg-gradient-to-br from-indigo-600 via-purple-600 to-p pink-600 text-white transition-transform duration-300 lg:translate-x-0 ${
      isMobileMenuOpen
        ? 'fixed inset-0 z-50 w-80 translate-x-0' // მობილურზე ზედ ჩასაშვებად fixed, ჩატზე ზემოდან
        : 'fixed inset-0 z-50 w-80 -translate-x-full'
    } lg:relative lg:w-80 lg:z-auto`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
          <div className="absolute top-10 right-10 w-32 h-32 bg-white/5 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 left-5 w-20 h-20 bg-white/5 rounded-full animate-bounce"></div>
        </div>
        
        {/* Mobile Close Button */}
        <button 
          className="lg:hidden absolute top-4 right-5 z-40 w-11 h-11 bg-white rounded-full flex items-center justify-center"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <span className="text-red-500 font-bold text-2xl">X</span>
        </button>
        
        {/* Header */}
        <div className="relative z-10 p-6 border-b border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold tracking-tight">ონლაინ</h2>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
              <span className="text-sm font-medium opacity-90">ახლა</span>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">მომხმარებლები</span>
              <div className="bg-white/20 rounded-full px-3 py-1">
                <span className="text-sm font-bold">{onlineUsers.length}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* მომხმარებლების სია */}
        <div className="relative z-10 flex-1 overflow-y-auto p-4">
          {/* Current User */}
          <div className="bg-white/10 rounded-2xl p-3 mb-4 backdrop-blur-sm border border-white/20">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img 
                  src={globalstate.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(globalstate.firstName + globalstate.lastName)}`}
                  className="w-12 h-12 rounded-xl object-cover ring-2 ring-white/30" 
                  alt="თქვენი ფოტო"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full animate-pulse"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white truncate">თქვენ ({globalstate.firstName} {globalstate.lastName})</p>
                <p className="text-sm text-white/70">ადმინისტრატორი</p>
              </div>
            </div>
          </div>
          
          {/* Other Users */}
          <div className="space-y-2">
            {onlineUsers.filter(u => u.id !== socketRef.current?.id).map((u) => (
              <div key={u.id} className="flex items-center space-x-3 p-3 rounded-2xl hover:bg-white/5 transition-all duration-300 hover:translate-x-1">
                <div className="relative">
                  <img 
                    src={u.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(u.username || "user")}`}
                    className="w-10 h-10 rounded-xl object-cover" 
                    alt={u.username}
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white truncate">{u.username || "Unknown"}</p>
                  <p className="text-xs text-white/60">ონლაინ</p>
                </div>
                <button
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-sm hover:from-green-600 hover:to-green-700"
                  onClick={() => startCall(u.id)}
                >
                  ზარი
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* მთავარი ჩათის არეა */}
      <div className="flex-1 flex flex-col bg-gradient-to-br from-slate-50 to-gray-100 relative">
        {/* Mobile Header & Desktop X Button */}
        <div className="bg-white/70 backdrop-blur-xl border-b border-gray-200/50 p-4 relative">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <span className="text-gray-600 text-xl">☰</span>
            </button>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                ♪
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-800">მთავარი ჩათი</h1>
                <p className="text-sm text-gray-500">{onlineUsers.length} წევრი ონლაინ</p>
              </div>
            </div>

            {/* X ღილაკი - გაზრდილი და უკეთ ხილული */}
            <button
              onClick={navigateToProfile}
              className="w-12 h-12 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-white"
            >
              <span className="text-white font-bold text-2xl leading-none">X</span>
            </button>
          </div>
        </div>
        
        {/* მესიჯები */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-4">
          {messages
            .filter((msg) => msg.type !== "system")
            .map((msg) => {
              const isOwnMessage = msg.user?.username === `${globalstate.firstName} ${globalstate.lastName}`;
              return (
                <div
                  key={msg.id}
                  className={`flex items-start space-x-2 sm:space-x-3 group ${
                    isOwnMessage ? "flex-row-reverse space-x-reverse" : ""
                  }`}
                >
                  <img 
                    src={
                      msg.user?.id === socketRef.current?.id
                        ? globalstate.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(globalstate.firstName + globalstate.lastName)}`
                        : msg.user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(msg.user?.username || "user")}`
                    }
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl object-cover flex-shrink-0" 
                    alt={msg.user?.username}
                  />
                  <div className={`flex-1 ${isOwnMessage ? "text-right" : ""} max-w-xs sm:max-w-md`}>
                    <div className={`flex items-center space-x-2 mb-1 text-xs sm:text-sm ${isOwnMessage ? "justify-end flex-row-reverse space-x-reverse" : ""}`}>
                      <span className="font-semibold text-gray-800 truncate">{msg.user?.username || "Unknown"}</span>
                      <span className="text-gray-500 flex-shrink-0">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  



<div 
  className={`group relative rounded-2xl p-3 sm:p-4 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${ 
    isOwnMessage ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-tr-md ml-auto" : "bg-white border border-gray-200/80 rounded-tl-md text-gray-800" 
  }`} 
  onClick={() => setModalMessage(msg)}
> 
  <p className="leading-relaxed text-sm sm:text-base break-words">{msg.content}</p> 
  {isOwnMessage && ( 
    <button 
      className="absolute top-1 left-1 sm:-top-2 sm:-left-2 z-10 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 hover:scale-110" 
      onClick={(e) => { e.stopPropagation(); handleDelete(msg); }} 
      title="მესიჯის წაშლა" 
    > 
      <span className="text-xs font-bold">X</span> 
    </button> 
  )} 
</div>



                  </div>
                </div>
              );
            })}
          <div ref={messagesEndRef}></div>
        </div>
        
        {/* მესიჯის Input */}
        <div className="bg-white/70 backdrop-blur-xl border-t border-gray-200/50 p-3 sm:p-4">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="flex-1 relative">
              <input 
                type="text" 
                placeholder="წერეთ მესიჯი..." 
                className="w-full bg-gray-100/80 border-0 rounded-2xl px-4 sm:px-6 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all placeholder-gray-500 text-sm sm:text-base"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
            </div>
            <button 
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-3 rounded-2xl transition-all hover:scale-105 shadow-lg hover:shadow-purple-500/25 flex-shrink-0"
              onClick={sendMessage}
              title="გაგზავნა"
            >
              <span className="text-lg">→</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Modal */}
      {modalMessage && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setModalMessage(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl transform scale-100 transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center space-x-4 mb-6">
              <img 
                src={modalMessage.user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(modalMessage.user?.username || "user")}`}
                className="w-16 h-16 rounded-2xl object-cover" 
                alt={modalMessage.user?.username}
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-xl text-gray-800 truncate">{modalMessage.user?.username || "Unknown"}</h3>
                <p className="text-gray-500 text-sm">{new Date(modalMessage.timestamp).toLocaleString()}</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4 mb-6">
              <p className="text-gray-800 leading-relaxed break-words">{modalMessage.content}</p>
            </div>
            <div className="flex space-x-3">
              <button 
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-2xl font-semibold transition-colors"
                onClick={() => setModalMessage(null)}
              >
                დახურვა
              </button>
              <button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-2xl font-semibold transition-all">
                პასუხი
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Incoming Call Modal */}
      {incomingCall && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2>{incomingCall.username} is calling...</h2>
            <button className="bg-green-500 text-white px-4 py-2 mr-2" onClick={acceptCall}>Accept</button>
            <button className="bg-red-500 text-white px-4 py-2" onClick={rejectCall}>Reject</button>
          </div>
        </div>
      )}

      {/* Video Call UI */}
      {isInCall && (
        <div className="fixed inset-0 bg-black/80 z-50 flex flex-col items-center justify-center">
          <video ref={localVideoRef} autoPlay muted className="w-1/4 h-1/4 absolute bottom-4 right-4 border border-white" />
          <video ref={remoteVideoRef} autoPlay className="w-3/4 h-3/4" />
          <button className="bg-red-500 text-white px-4 py-2 mt-4" onClick={endCall}>End Call</button>
        </div>
      )}
    </div>
  );
}