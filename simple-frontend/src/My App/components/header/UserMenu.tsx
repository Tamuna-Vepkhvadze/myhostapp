import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { userstate } from "../../../zustand/Uzerstate"

const UserMenu = () => {
  const { globalstate, logOut } = userstate()
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const menuRef = useRef<HTMLDivElement>(null)

  // კლიკი დოკუმენტზე -> თუ არ არის menu-ში, დახუროს
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = () => {
    logOut()
    setMenuOpen(false)
    navigate("/LogIn")
  }

  if (!globalstate) return null

  return (
    <div className="relative" ref={menuRef}>
      {/* User Avatar/Button */}
      <button
        onClick={() => setMenuOpen((prev) => !prev)}
        className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-300 flex items-center justify-center text-indigo-800 font-bold shadow-lg hover:ring-4 hover:ring-yellow-200 focus:outline-none transition-all duration-300"
      >
        {globalstate.image ? (
          <img
            src={globalstate.image}
            alt="User avatar"
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          globalstate.firstName?.charAt(0).toUpperCase()
        )}
      </button>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-2xl py-2 z-50 ring-1 ring-gray-200 border border-gray-100 overflow-hidden">
          {[
            { label: "პროფილი", action: () => navigate("/UserProfaile"), color: "text-gray-800" },
            { label: "რედაქტირება", action: () => navigate(`/EditProfile/${globalstate.id}`), color: "text-gray-800" },
            { label: "პაროლის შეცვლა", action: () => navigate("/PasswordWechseln/"), color: "text-gray-800" },
            { label: "გასვლა", action: handleLogout, color: "text-red-600" },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => {
                item.action()
                setMenuOpen(false)
              }}
              className={`w-full text-left px-6 py-3 font-medium transition-all duration-300 
                          rounded-lg mb-1 last:mb-0
                          ${item.color} 
                          bg-white hover:bg-gradient-to-r hover:from-indigo-100 hover:to-purple-50 
                          hover:shadow-md hover:scale-105`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default UserMenu
