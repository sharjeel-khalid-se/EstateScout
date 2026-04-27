import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Home } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white mt-20">
      {/* Main Footer Content */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Home size={28} className="text-blue-400" />
              <h3 className="text-2xl font-bold">EstateScout</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Find your dream property with our comprehensive real estate platform. Connecting buyers, sellers, and agents since day one.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link to="/" className="hover:text-blue-400 transition font-medium">
                  → Home
                </Link>
              </li>
              <li>
                <Link to="/properties" className="hover:text-blue-400 transition font-medium">
                  → Browse Properties
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-blue-400 transition font-medium">
                  → List Property
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-blue-400 transition font-medium">
                  → My Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Get In Touch</h4>
            <div className="space-y-4 text-gray-400">
              <div className="flex items-start space-x-3">
                <Phone size={20} className="text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">+1 (555) 123-4567</p>
                  <p className="text-sm">Available 24/7</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail size={20} className="text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">info@estatescout.com</p>
                  <p className="text-sm">We'll respond within 2 hours</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">123 Real Estate St</p>
                  <p className="text-sm">New York, NY 10001</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Follow Us</h4>
            <div className="grid grid-cols-2 gap-4">
              <a 
                href="#" 
                className="flex items-center justify-center w-12 h-12 bg-gray-800 rounded-lg hover:bg-blue-600 transition group"
              >
                <Facebook size={20} className="group-hover:text-white transition" />
              </a>
              <a 
                href="#" 
                className="flex items-center justify-center w-12 h-12 bg-gray-800 rounded-lg hover:bg-blue-400 transition group"
              >
                <Twitter size={20} className="group-hover:text-white transition" />
              </a>
              <a 
                href="#" 
                className="flex items-center justify-center w-12 h-12 bg-gray-800 rounded-lg hover:bg-pink-600 transition group"
              >
                <Instagram size={20} className="group-hover:text-white transition" />
              </a>
              <a 
                href="#" 
                className="flex items-center justify-center w-12 h-12 bg-gray-800 rounded-lg hover:bg-blue-700 transition group"
              >
                <Linkedin size={20} className="group-hover:text-white transition" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 py-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400">
          <p className="text-sm text-center md:text-left mb-4 md:mb-0">
            &copy; {currentYear} EstateScout. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="hover:text-blue-400 transition">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400 transition">Terms of Service</a>
            <a href="#" className="hover:text-blue-400 transition">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2026 EstateScout. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
