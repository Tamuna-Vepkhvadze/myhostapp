import { useEffect, useRef, useState } from "react"
import { userstate } from "../../../zustand/Uzerstate"
import CategoryCards from "./cards"
import MotivationCard from "./MotivationCard"
import ohneImages from "../../../assets/user_img.png"
import Favorites from "../Recipes/Favorites"
import { useFavoritesStore } from "../../../zustand/useFavoritesStore"
import { useNavigate } from "react-router-dom"
import { CloceIcon } from "../Recipes/icon"

const coverPhotos = [
  "https://picsum.photos/1200/400?random=1",
  "https://picsum.photos/1200/400?random=2",
  "https://picsum.photos/1200/400?random=3",
  "https://picsum.photos/1200/400?random=4",
]

const UserProfile = () => {
  const navigate = useNavigate()
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

  const {favorites} = useFavoritesStore()


  const [showFavorite, setshowFavorite] = useState(false)

  const favoritesRef = useRef<HTMLDivElement>(null)

  const scrollToFavorites = () => {
    favoritesRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (showFavorite) {
      scrollToFavorites()
    }
  }, [showFavorite])


  const cloceRef = useRef<HTMLDivElement>(null)

  const cloceFN = () => {
    cloceRef.current?.scrollIntoView({behavior: "smooth"})
  }
  return (
    <div ref={cloceRef} className="min-h-screen w-full bg-gray-100 flex flex-col relative">
  {/* Cover Photo */}
  <div className="w-full h-80 mt-16 mb-25 md:h-80">
    {cover && <img src={cover} alt="Cover" className="w-full h-full object-cover" />}
  </div>

  {/* User Info Section */}
  {globalstate && (
    <div className="mt-6 w-full px-4 flex flex-col items-center gap-4 md:flex-row md:w-[1400px] md:pl-15 md:justify-start absolute md:top-70 top-70 left-1/2 transform -translate-x-1/2">
      {/* Profile Photo */}
      <div className="w-36 h-36 rounded-full border-4 border-white bg-white overflow-hidden shadow-lg flex-shrink-0 md:w-52 md:h-52">
        <img
          src={globalstate.image || ohneImages}
          alt={globalstate.firstName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Name and Buttons */}
      <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
        <h2 className="text-3xl font-bold text-gray-800 mt-2 md:text-5xl md:mt-5 text-center md:text-left">
          {globalstate.firstName} {globalstate.lastName}
        </h2>
        <div className="pt-7 flex flex-col md:flex-row gap-3">
          <button
            onClick={() => setShowContact(prev => !prev)}
            className="px-4 py-2 md:px-6 md:py-3 bg-indigo-500 text-white font-semibold rounded-full shadow hover:bg-indigo-600 transition"
          >
            {showContact ? "Hide Contact Info" : "Show Contact Info"}
          </button>

          <button
            onClick={
              favorites.length > 0
                ? () => {
                    setshowFavorite(true)
                    scrollToFavorites()
                  }
                : () => navigate("/Recipes")
            }
            className={`px-4 py-2 md:px-6 md:py-3 text-white font-semibold rounded-full shadow transition flex items-center gap-2
              ${
                favorites.length > 0
                  ? "bg-gradient-to-r from-orange-400 via-yellow-300 to-yellow-200 hover:from-orange-500 hover:via-yellow-400 hover:to-yellow-300"
                  : "bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 hover:from-blue-600 hover:via-blue-500 hover:to-cyan-500"
              }`}
          >
            {favorites.length > 0 ? (
              <>
                <span className="text-white">❤️</span>
                <span className="text-indigo-500">Visit favorites</span>
              </>
            ) : (
              <>
                <span className="text-white">➕</span>
                <span>Add favorites</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )}

  {/* Contact Card */}
  {globalstate && showContact && (
    <div className="mt-6 w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-4 md:p-6 flex flex-col space-y-4 transition-all duration-300 relative">
      <h3 className="text-xl font-bold text-gray-800 text-center md:text-left">Contact Info</h3>

      {/* Email */}
      <div
        className="relative text-indigo-500 cursor-pointer font-bold transition text-center md:text-left"
        onClick={() => handleCopy(globalstate.email)}
      >
        <span>{globalstate.email}</span>
        {copiedText === globalstate.email && (
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-indigo-500 text-white text-sm font-medium px-3 py-1 rounded-lg shadow-lg animate-fade-in-out z-10">
            Copied!
          </div>
        )}
      </div>

      {/* Phone */}
      <div
        className="relative text-gray-700 cursor-pointer transition font-bold text-center md:text-left"
        onClick={() => handleCopy(globalstate.phone || "")}
      >
        <span>{globalstate.phone || "Not provided"}</span>
        {copiedText === globalstate.phone && (
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-indigo-500 text-white text-sm font-medium px-3 py-1 rounded-lg shadow-lg animate-fade-in-out z-10">
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
  <div className="mt-6 w-full px-4 flex flex-col gap-6 md:w-full md:mx-auto">
    <MotivationCard />
    <CategoryCards />
    {showFavorite && <div ref={favoritesRef}><Favorites /></div>}
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

  {showFavorite && (
    <div
      onClick={() => {cloceFN(); setshowFavorite(false)}}
      className="fixed right-4 bottom-4 md:right-10 md:bottom-10"
    >
      <CloceIcon/>
    </div>
  )}
</div>

  )
}

export default UserProfile