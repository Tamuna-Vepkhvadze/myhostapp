import { NavLink } from "react-router-dom"


const Header = () => {
  const linkClasses = "text-white font-medium transition-all duration-300"
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

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${linkClasses} ${isActive ? "text-yellow-300 text-lg border-b-2 border-yellow-300" : "hover:text-yellow-300"}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/AboutPatge"
              className={({ isActive }) =>
                `${linkClasses} ${isActive ? "text-yellow-300 text-lg border-b-2 border-yellow-300" : "hover:text-yellow-300"}`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/ContactPatge"
              className={({ isActive }) =>
                `${linkClasses} ${isActive ? "text-yellow-300 text-lg border-b-2 border-yellow-300" : "hover:text-yellow-300"}`
              }
            >
              Contact
            </NavLink>
          </div>

          {/* Mobile Menu Placeholder */}
          <div className="md:hidden">
            {/* Hamburger Menu */}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header