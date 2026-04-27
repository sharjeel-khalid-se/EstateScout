import { Link } from 'react-router-dom'
import { MapPin, Home, Square, Sparkles } from 'lucide-react'

export default function PropertyCard({ property }) {
  return (
    <Link to={`/properties/${property._id}`}>
      <div className="card-elevated overflow-hidden cursor-pointer group h-full flex flex-col transform transition-all duration-300 hover:translate-y-[-8px]">
        {/* Image Container */}
        <div className="relative w-full h-56 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
          <img
            src={property.thumbnail}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
          />
          
          {/* Price Badge */}
          <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg flex items-center space-x-1">
            <span className="text-lg">$</span>
            <span>{property.price.toLocaleString()}</span>
          </div>

          {/* Type Badge */}
          <div className="absolute top-4 left-4 badge-primary shadow-lg capitalize">
            {property.type}
          </div>

          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-4">
            <p className="text-white font-semibold text-sm">View Details →</p>
          </div>
        </div>

        {/* Details */}
        <div className="p-5 flex-grow flex flex-col">
          {/* Title */}
          <h3 className="text-lg font-bold text-gray-800 mb-2 truncate group-hover:text-blue-600 transition line-clamp-2">
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center text-gray-600 mb-4">
            <MapPin size={16} className="mr-2 text-blue-600 flex-shrink-0" />
            <span className="text-sm truncate">{property.location}</span>
          </div>

          {/* Features - Grid */}
          <div className="grid grid-cols-3 gap-2 mb-4 pb-4 border-b border-gray-200">
            <div className="flex flex-col items-center space-y-1">
              <Home size={18} className="text-blue-600" />
              <span className="text-xs font-semibold text-gray-700 capitalize text-center truncate">
                {property.type}
              </span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <Square size={18} className="text-green-600" />
              <span className="text-xs font-semibold text-gray-700 text-center">
                {property.area}m²
              </span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <Sparkles size={18} className="text-purple-600" />
              <span className="text-xs font-semibold text-gray-700 text-center">
                {property.amenities?.length || 0}
              </span>
            </div>
          </div>

          {/* Agent Info */}
          {property.agent && (
            <div className="flex items-center space-x-3 mt-auto">
              <img
                src={property.agent.profilePicture || 'https://via.placeholder.com/48'}
                alt={property.agent.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-blue-100"
              />
              <div className="flex-grow min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{property.agent.name}</p>
                <p className="text-xs text-gray-500 truncate">{property.agent.phone || 'Contact for details'}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
