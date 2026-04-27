import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, LogOut, Home, Plus } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
  const token = localStorage.getItem('token')

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const closeMenu = () => setIsOpen(false)

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b-2 border-gray-100">
      <div className="container flex justify-between items-center h-20">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-2xl font-bold gradient-text"
          onClick={closeMenu}
        >
          <Home size={28} className="text-blue-600" />
          <span>EstateScout</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-1 items-center">
          <Link 
            to="/properties" 
            className="px-4 py-2 text-gray-700 font-medium hover:text-blue-600 hover:bg-gray-50 rounded-lg transition"
          >
            Browse
          </Link>
          <Link 
            to="/" 
            className="px-4 py-2 text-gray-700 font-medium hover:text-blue-600 hover:bg-gray-50 rounded-lg transition"
          >
            Home
          </Link>
          
          {token ? (
            <>
              <Link 
                to="/add-property" 
                className="px-4 py-2 text-gray-700 font-medium hover:text-blue-600 hover:bg-gray-50 rounded-lg transition flex items-center space-x-1"
              >
                <Plus size={18} />
                <span>Add Property</span>
              </Link>
              <Link 
                to="/profile" 
                className="px-4 py-2 text-gray-700 font-medium hover:text-blue-600 hover:bg-gray-50 rounded-lg transition"
              >
                {user?.name || 'Profile'}
              </Link>
              <button
                onClick={handleLogout}
                className="btn-primary ml-4 flex items-center space-x-2 text-sm"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="btn-outline ml-2 text-sm"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="btn-primary ml-2 text-sm"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 hover:text-blue-600 transition p-2"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-b from-gray-50 to-white border-t border-gray-200 py-4 space-y-2 animate-fade-in">
          <Link
            to="/properties"
            className="block px-6 py-3 text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 transition"
            onClick={closeMenu}
          >
            Browse Properties
          </Link>
          <Link
            to="/"
            className="block px-6 py-3 text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 transition"
            onClick={closeMenu}
          >
            Home
          </Link>
          
          {token ? (
            <>
              <Link
                to="/add-property"
                className="block px-6 py-3 text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 transition flex items-center space-x-2"
                onClick={closeMenu}
              >
                <Plus size={18} />
                <span>Add Property</span>
              </Link>
              <Link
                to="/profile"
                className="block px-6 py-3 text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 transition"
                onClick={closeMenu}
              >
                Profile: {user?.name || 'Account'}
              </Link>
              <button
                onClick={() => {
                  handleLogout()
                  closeMenu()
                }}
                className="w-[calc(100%-24px)] mx-3 btn-primary flex items-center justify-center space-x-2 text-sm"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <div className="px-3 space-y-2 pt-2">
              <Link 
                to="/login" 
                className="btn-outline w-full text-center block"
                onClick={closeMenu}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="btn-primary w-full text-center block"
                onClick={closeMenu}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}
