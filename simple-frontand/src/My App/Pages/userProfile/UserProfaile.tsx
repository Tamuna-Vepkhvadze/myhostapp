import { useEffect, useState } from "react"
import { userstate } from "../../../zustand/Uzerstate"
import CategoryCards from "./cards"
import MotivationCard from "./MotivationCard"
import ohneImages from "../../../assets/user_img.png"

const coverPhotos = [
  "https://picsum.photos/1200/400?random=1",
  "https://picsum.photos/1200/400?random=2",
  "https://picsum.photos/1200/400?random=3",
  "https://picsum.photos/1200/400?random=4",
]

const UserProfile = () => {
  const { globalstate } = userstate()
  const [cover, setCover] = useState<string>("")
  const [showContact, setShowContact] = useState(false)
  const [copiedText, setCopiedText] = useState("")

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * coverPhotos.length)
    setCover(coverPhotos[randomIndex])
  }, [])

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(text)
    setTimeout(() => setCopiedText(""), 1500)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col relative">
      {/* Cover Photo */}
      <div className="w-full h-80 relative mt-16 mb-25">
        {cover && <img src={cover} alt="Cover" className="w-full h-full object-cover" />}
      </div>

      {/* User Info Section */}
      {globalstate && (
        <div className="mt-6 w-full max-w-4xl flex flex-row items-center gap-6 justify-center absolute top-70 ">
          {/* Profile Photo */}
          <div className="w-52 h-52 rounded-full border-4 border-white bg-white overflow-hidden shadow-lg flex-shrink-0">
            <img
              src={globalstate.image || ohneImages}
              alt={globalstate.firstName}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Name and Button */}
          <div className="flex flex-row gap-6">
            <h2 className="text-5xl font-bold text-gray-800 mt-5">
              {globalstate.firstName} {globalstate.lastName}
            </h2>
            <button
              onClick={() => setShowContact(prev => !prev)}
              className="px-6 py-3 bg-indigo-500 text-white font-semibold rounded-full shadow hover:bg-indigo-600 transition mt-7"
            >
              {showContact ? "Hide Contact Info" : "Show Contact Info"}
            </button>
          </div>
        </div>
      )}

      {/* Contact Card */}
      {globalstate && showContact && (
        <div className="mt-6 w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 flex flex-col space-y-4 transition-all duration-300 relative">
          <h3 className="text-xl font-bold text-gray-800">Contact Info</h3>

          {/* Email */}
          <div
            className="relative text-indigo-500 cursor-pointer font-bold transition"
            onClick={() => handleCopy(globalstate.email)}
          >
            <span>{globalstate.email}</span>
            {copiedText === globalstate.email && (
              <div className="absolute -top-10 left-20 transform -translate-x-1/2 bg-indigo-500 text-white text-sm font-medium px-3 py-1 rounded-lg shadow-lg animate-fade-in-out z-10">
                Copied!
              </div>
            )}
          </div>

          {/* Phone */}
          <div
            className="relative text-gray-700 cursor-pointer transition font-bold"
            onClick={() => handleCopy(globalstate.phone || "")}
          >
            <span>{globalstate.phone || "Not provided"}</span>
            {copiedText === globalstate.phone && (
              <div className="absolute -top-10 left-20 transform -translate-x-1/2 bg-indigo-500 text-white text-sm font-medium px-3 py-1 rounded-lg shadow-lg animate-fade-in-out z-10">
                Copied!
              </div>
            )}
          </div>
        </div>
      )}

      {!globalstate && (
        <h1 className="text-center text-gray-500 text-xl mt-20 mx-auto">
          მომხმარებლის პროფილი ვერ მოიძებნა
        </h1>
      )}

      {/* MotivationCard and CategoryCards */}
      <div className="mt-6 w-full  mx-auto">
        <MotivationCard />
        <CategoryCards />
      </div>

      {/* Tailwind keyframes */}
      <style>
        {`
          @keyframes fade-in-out {
            0%, 100% { opacity: 0; transform: translateY(-5px); }
            10%, 90% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-out {
            animation: fade-in-out 1.5s ease-in-out forwards;
          }
        `}
      </style>
    </div>
  )
}

export default UserProfile