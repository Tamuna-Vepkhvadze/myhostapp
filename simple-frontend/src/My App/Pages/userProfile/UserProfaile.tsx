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

  const { favorites } = useFavoritesStore()
  const [showFavorite, setShowFavorite] = useState(false)
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
    cloceRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div
      ref={cloceRef}
      className="min-h-screen w-full bg-gray-100 flex flex-col relative"
    >
      {/* Cover Photo */}
      <div className="relative w-full h-80 mt-16 md:h-80">
        {cover && (
          <img
            src={cover}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        )}

        {/* User Info Section */}
        {globalstate && (
      <div className="absolute -bottom-70 md:-bottom-30 left-1/2 transform -translate-x-1/2 w-full px-4 flex flex-col items-center gap-4 md:flex-row md:w-[1400px] md:pl-15 md:justify-start">
            {/* Profile Photo */}
            <div className="relative w-36 h-36 md:w-52 md:h-52 flex-shrink-0">
              {/* Profile Image with border and shadow */}
              <div className="w-full h-full rounded-full border-4 border-white shadow-lg overflow-hidden">
                <img
                  src={globalstate.image || ohneImages}
                  alt={globalstate.firstName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Online indicator on top of everything */}
              <span className="
                absolute
                bottom-1/12
                right-1/12
                w-5 h-5
                md:w-7 md:h-7
                bg-green-500
                border-2 border-white
                rounded-full
                shadow-md
                z-30
              "></span>
            </div>




            {/* Name and Buttons */}
          <div className="flex flex-col items-center gap-1 md:flex-row md:gap-6 mt-2 md:mt-20">
              <h2 className="text-3xl font-bold text-gray-800 mt-1 md:text-5xl md:mt-5 text-center md:text-left">
                {globalstate.firstName} {globalstate.lastName}
              </h2>
              <div className="pt-7 flex flex-col md:flex-row gap-3">
                <button
                  onClick={() => setShowContact((prev) => !prev)}
                  className="px-4 py-2 md:px-6 md:py-3 bg-indigo-500 text-white font-semibold rounded-full shadow hover:bg-indigo-600 transition"
                >
                  {showContact ? "Hide Contact Info" : "Show Contact Info"}
                </button>

                <button
                  onClick={
                    favorites.length > 0
                      ? () => {
                          setShowFavorite(true)
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

 <button onClick={() => navigate("/ChatPage")} 
       
        className="group relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold py-2 px-4 rounded-full shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-[1.02] overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full animate-bounce"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex items-center justify-center space-x-3">
          {/* Chat Icon */}
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 group-hover:bg-white/30 transition-colors">
            <svg 
              className="w-5 h-5 text-white" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M12 3C6.48 3 2 6.58 2 11c0 2.4 1.05 4.58 2.83 6.24L3 22l4.76-1.83C9.15 20.7 10.54 21 12 21c5.52 0 10-3.58 10-8s-4.48-8-10-8zm-1 12h-2v-2h2v2zm0-3h-2c0-3.25 3-3 3-5 0-1.1-.9-2-2-2s-2 .9-2 2H6c0-2.21 1.79-4 4-4s4 1.79 4 4c0 2.5-3 2.75-3 5z"/>
            </svg>
          </div>
          
          {/* Text */}
          <span className="text-lg font-bold tracking-wide">მთავარი ჩათი</span>
        
        </div>
      
      </button>


              </div>



              
            </div>
          </div>
        )} 

     
      </div>

      {/* Contact Card */}
      {globalstate && showContact && (
        <div className="mt-78 md:mt-40 w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-4 md:p-6 flex flex-col space-y-4 transition-all duration-300 relative">
          <h3 className="text-xl font-bold text-gray-800 text-center md:text-left">
            Contact Info
          </h3>

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
      <div
        className={`w-full px-4 flex flex-col gap-6 md:w-full md:mx-auto ${
          showContact
            ? "pt-0 md:pt-0"   // showContact → mobile pt-5, desktop pt-10
            : "pt-65 md:pt-28"  // არა showContact → mobile pt-20, desktop pt-28
        }`}
      >
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
          onClick={() => {
            cloceFN()
            setShowFavorite(false)
          }}
          className="fixed right-4 bottom-4 md:right-10 md:bottom-10"
        >
          <CloceIcon />
        </div>
      )}
    </div>
  )
}

export default UserProfile


