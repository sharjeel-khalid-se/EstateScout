import { useState, useEffect } from 'react'
import { propertiesAPI } from '../services/api'
import PropertyCard from '../components/PropertyCard'
import { Search, Loader, AlertCircle, Sliders, X } from 'lucide-react'

export default function PropertiesPage() {
  const [properties, setProperties] = useState([])
  const [filteredProperties, setFilteredProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showFilters, setShowFilters] = useState(true)
  const [filters, setFilters] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    location: '',
  })

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    try {
      setLoading(true)
      const { data } = await propertiesAPI.getAll()
      setProperties(data)
      setFilteredProperties(data)
    } catch (err) {
      setError('Failed to fetch properties. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters({ ...filters, [name]: value })
  }

  const applyFilters = () => {
    let filtered = properties

    if (filters.type) {
      filtered = filtered.filter(p => p.type === filters.type)
    }
    if (filters.minPrice) {
      filtered = filtered.filter(p => p.price >= Number(filters.minPrice))
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(p => p.price <= Number(filters.maxPrice))
    }
    if (filters.location) {
      filtered = filtered.filter(p =>
        p.location.toLowerCase().includes(filters.location.toLowerCase())
      )
    }

    setFilteredProperties(filtered)
  }

  const resetFilters = () => {
    setFilters({ type: '', minPrice: '', maxPrice: '', location: '' })
    setFilteredProperties(properties)
  }

  useEffect(() => {
    applyFilters()
  }, [filters])

  const hasActiveFilters = Object.values(filters).some(val => val !== '')

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-2 gradient-text">Find Properties</h1>
          <p className="text-gray-600 text-lg">
            Browse our extensive collection of {properties.length} amazing properties
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg flex items-center space-x-3 text-red-700 animate-fade-in">
            <AlertCircle size={24} className="flex-shrink-0" />
            <span className="font-semibold">{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Filter Header */}
              <div className="flex items-center justify-between mb-6 lg:mb-0">
                <h2 className="text-xl font-bold flex items-center space-x-2">
                  <Sliders size={24} className="text-blue-600" />
                  <span>Filters</span>
                </h2>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  {showFilters ? <X size={24} /> : <Sliders size={24} />}
                </button>
              </div>

              {/* Filter Panel */}
              {showFilters && (
                <div className="card-elevated p-6 space-y-6 animate-fade-in">
                  {/* Property Type */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Property Type
                    </label>
                    <select
                      name="type"
                      value={filters.type}
                      onChange={handleFilterChange}
                      className="input-field capitalize"
                    >
                      <option value="">All Types</option>
                      <option value="apartment">Apartment</option>
                      <option value="villa">Villa</option>
                      <option value="studio">Studio</option>
                      <option value="townhouse">Townhouse</option>
                      <option value="office">Office</option>
                    </select>
                  </div>

                  {/* Price Range */}
                  <div className="space-y-4 border-t pt-6">
                    <p className="font-semibold text-gray-700">Price Range</p>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                        Minimum Price
                      </label>
                      <input
                        type="number"
                        name="minPrice"
                        value={filters.minPrice}
                        onChange={handleFilterChange}
                        className="input-field"
                        placeholder="Min price"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                        Maximum Price
                      </label>
                      <input
                        type="number"
                        name="maxPrice"
                        value={filters.maxPrice}
                        onChange={handleFilterChange}
                        className="input-field"
                        placeholder="Max price"
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div className="border-t pt-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={filters.location}
                      onChange={handleFilterChange}
                      className="input-field"
                      placeholder="Search location..."
                    />
                  </div>

                  {/* Actions */}
                  <div className="border-t pt-6 space-y-3">
                    {hasActiveFilters && (
                      <button
                        onClick={resetFilters}
                        className="btn-secondary w-full"
                      >
                        Clear Filters
                      </button>
                    )}
                    <button
                      onClick={() => setShowFilters(false)}
                      className="lg:hidden btn-primary w-full"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Properties Grid */}
          <div className="lg:col-span-3">
            {/* Results Info */}
            {!loading && (
              <div className="mb-6 flex items-center justify-between">
                <p className="text-gray-700 font-semibold">
                  Showing <span className="text-blue-600 font-bold">{filteredProperties.length}</span> of <span className="text-blue-600 font-bold">{properties.length}</span> properties
                </p>
              </div>
            )}

            {/* Loading State */}
            {loading ? (
              <div className="flex justify-center items-center h-96">
                <div className="text-center">
                  <Loader size={48} className="animate-spin text-blue-600 mx-auto mb-4" />
                  <p className="text-gray-600 font-semibold">Loading properties...</p>
                </div>
              </div>
            ) : filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProperties.map(property => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-96 text-center">
                <Search size={64} className="text-gray-300 mb-4" />
                <h3 className="text-2xl font-bold text-gray-700 mb-2">No Properties Found</h3>
                <p className="text-gray-600 mb-6 max-w-md">
                  Try adjusting your filters to find more properties.
                </p>
                <button
                  onClick={resetFilters}
                  className="btn-primary"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
