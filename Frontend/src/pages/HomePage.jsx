import { Link } from 'react-router-dom'
import { Search, Users, Home, TrendingUp, ArrowRight } from 'lucide-react'

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white py-24 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Find Your
                <br />
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Dream Property
                </span>
              </h1>
              <p className="text-xl mb-8 opacity-95 leading-relaxed">
                EstateScout connects you with the best properties and experienced real estate agents in your area. Start your journey today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/properties" 
                  className="btn-primary bg-white text-blue-600 hover:bg-gray-50 flex items-center justify-center space-x-2 group"
                >
                  <Search size={20} />
                  <span>Browse Properties</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
                </Link>
                <Link 
                  to="/register" 
                  className="btn-outline border-white text-white hover:bg-white hover:text-blue-600 flex items-center justify-center space-x-2"
                >
                  <Home size={20} />
                  <span>List Your Property</span>
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="hidden md:block relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition"></div>
              <img
                src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&h=500&fit=crop"
                alt="Dream Property"
                className="rounded-2xl shadow-2xl w-full h-auto object-cover relative z-10 group-hover:scale-105 transition duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Why Choose EstateScout?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We make finding your perfect property simple, secure, and stress-free
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="card-elevated p-8 text-center group hover:bg-blue-50">
              <div className="flex justify-center mb-6 group-hover:scale-110 transition">
                <div className="p-4 bg-blue-100 rounded-full group-hover:bg-blue-200 transition">
                  <Search className="text-blue-600" size={32} />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Easy Search</h3>
              <p className="text-gray-600 leading-relaxed">
                Find properties using advanced filters and search options tailored to your needs.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card-elevated p-8 text-center group hover:bg-green-50">
              <div className="flex justify-center mb-6 group-hover:scale-110 transition">
                <div className="p-4 bg-green-100 rounded-full group-hover:bg-green-200 transition">
                  <Users className="text-green-600" size={32} />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Expert Agents</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with verified and experienced real estate professionals in your area.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card-elevated p-8 text-center group hover:bg-purple-50">
              <div className="flex justify-center mb-6 group-hover:scale-110 transition">
                <div className="p-4 bg-purple-100 rounded-full group-hover:bg-purple-200 transition">
                  <Home className="text-purple-600" size={32} />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Wide Selection</h3>
              <p className="text-gray-600 leading-relaxed">
                Browse thousands of properties from villas to apartments, studios to offices.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="card-elevated p-8 text-center group hover:bg-orange-50">
              <div className="flex justify-center mb-6 group-hover:scale-110 transition">
                <div className="p-4 bg-orange-100 rounded-full group-hover:bg-orange-200 transition">
                  <TrendingUp className="text-orange-600" size={32} />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Best Prices</h3>
              <p className="text-gray-600 leading-relaxed">
                Get competitive pricing and exclusive deals from verified sellers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold gradient-text mb-2">10K+</p>
              <p className="text-gray-600 font-semibold">Properties Listed</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold gradient-text mb-2">5K+</p>
              <p className="text-gray-600 font-semibold">Happy Customers</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold gradient-text mb-2">500+</p>
              <p className="text-gray-600 font-semibold">Expert Agents</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Find Your New Home?
          </h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            Join thousands of satisfied customers who found their perfect property on EstateScout.
          </p>
          <Link 
            to="/properties" 
            className="btn-primary bg-white text-blue-600 hover:bg-gray-50 inline-flex items-center space-x-2 group text-lg"
          >
            <span>Explore Properties</span>
            <ArrowRight size={24} className="group-hover:translate-x-1 transition" />
          </Link>
        </div>
      </section>
    </div>
  )
}
            
