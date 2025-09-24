import { NavLink } from "react-router-dom"
import UserMenu from "./UserMenu"
import { useState, useEffect, useRef } from "react"
import { userstate } from "../../../zustand/Uzerstate"

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement | null>(null)

  const {globalstate} = userstate()

  const linkClasses =
    "text-white font-medium transition-all duration-300 block px-4 py-2"

  const links = [
    { to: "/", label: "Home" },
    { to: "/AboutPatge", label: "About" },
    { to: "/ContactPatge", label: "Contact" },
  ]

  // Click outside handler to close mobile menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        mobileOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node) &&
        !(e.target as HTMLElement).closest("#hamburger-btn")
      ) {
        setMobileOpen(false)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [mobileOpen])

  return (
    <nav className="w-full bg-indigo-600 shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 flex items-center justify-center bg-yellow-400 text-indigo-700 rounded-full shadow-lg text-xl font-bold">
              🌟
            </div>
            <span className="text-white text-2xl font-extrabold hover:text-yellow-300 transition-colors">
              FunZone
            </span>
          </NavLink>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `${linkClasses} ${
                    isActive
                      ? "text-yellow-300 text-lg border-b-2 border-yellow-300"
                      : "hover:text-yellow-300"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* User Menu */}

          {
            globalstate && <div className="hidden md:flex">
              <UserMenu />
            </div>
          }
          

          {/* Mobile Hamburger & User Menu */}
          <div className="flex items-center md:hidden space-x-2">
            <UserMenu /> {/* მხოლოდ ერთი ავატარი */}
            <button
              id="hamburger-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {mobileOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          id="mobile-menu"
          className="md:hidden flex flex-col items-center animate-slide-down bg-blue-900 shadow-lg w-full"
        >
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                ` ${linkClasses} ${
                  isActive
                    ? "text-yellow-300 bg-indigo-800"
                    : "hover:text-yellow-300 hover:bg-indigo-700"
                } text-center w-full`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}

      {/* Tailwind animation */}
      <style>
        {`
          @keyframes slide-down {
            0% { transform: translateY(-100%); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          .animate-slide-down {
            animation: slide-down 0.3s ease-out forwards;
          }
        `}
      </style>
    </nav>
  )
}

export default Header
