import React, { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
//import { Alert, AlertDescription } from "../components/ui/alert"
import { Separator } from "../components/ui/separator"
import { Laptop, Monitor, FileText, Wifi, Building, Package, ArrowLeft, Info, Calendar, ChevronLeft, ChevronRight, Star, ShoppingCart, Heart, Eye } from 'lucide-react'
import Eyob from "../pages/Featurebrands"

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [categoryProducts, setCategoryProducts] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Updated 6 Categories
  const categories = [
    "Laptops and computers", 
    "Monitors and displays", 
    "Software licenses", 
    "Networking devices",
    "Office equipments",
    "Others"
  ]

  // Your actual backend URL
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000"

  // Sample products for all 6 categories (replace with real API calls)
  const sampleProducts = {
    "Laptops and computers": [
      {
        id: 1,
        name: "MacBook Pro 16-inch",
        description: "Powerful laptop with M2 Pro chip, perfect for professional work and creative tasks.",
        category: "Laptops and computers",
        price: 2499.99,
        picture: "https://res.cloudinary.com/deqp41wyr/image/upload/v1748789975/5900142066988600122_x1oqv4.jpg",
        createdAt: "2024-01-15T10:30:00Z"
      },
      {
        id: 2,
        name: "Dell XPS 15",
        description: "Premium Windows laptop with 4K OLED display and Intel Core i9 processor.",
        category: "Laptops and computers",
        price: 1899.99,
        picture: "https://res.cloudinary.com/deqp41wyr/image/upload/v1748789994/5900142066988600119_zwi6vk.jpg",
        createdAt: "2024-01-16T11:45:00Z"
      },
      {
        id: 3,
        name: "Gaming Desktop PC",
        description: "High-performance gaming desktop with RTX 4080 graphics card and liquid cooling.",
        category: "Laptops and computers",
        price: 2799.99,
        picture: "https://res.cloudinary.com/deqp41wyr/image/upload/v1748789975/5900142066988600113_uaakrs.jpg",
        createdAt: "2024-01-20T10:30:00Z"
      }
    ],
    "Monitors and displays": [
      {
        id: 4,
        name: "4K Ultra HD Monitor 27\"",
        description: "Professional 4K monitor with HDR support and USB-C connectivity for creative work.",
        category: "Monitors and displays",
        price: 599.99,
        picture: "https://res.cloudinary.com/deqp41wyr/image/upload/v1748789976/5900142066988600124_giicd3.jpg",
        createdAt: "2024-01-17T14:20:00Z"
      },
      {
        id: 5,
        name: "Gaming Monitor 144Hz",
        description: "High refresh rate gaming monitor with G-Sync technology and curved display.",
        category: "Monitors and displays",
        price: 449.99,
        picture: "https://res.cloudinary.com/deqp41wyr/image/upload/v1748789994/5900142066988600119_zwi6vk.jpg",
        createdAt: "2024-01-18T09:10:00Z"
      },
      {
        id: 6,
        name: "Ultrawide Monitor 34\"",
        description: "Ultra-wide curved monitor perfect for productivity and immersive gaming experience.",
        category: "Monitors and displays",
        price: 799.99,
        picture: "https://res.cloudinary.com/deqp41wyr/image/upload/v1748789975/5900142066988600122_x1oqv4.jpg",
        createdAt: "2024-01-19T11:30:00Z"
      }
    ],
    "Software licenses": [
      {
        id: 7,
        name: "Microsoft Office 365",
        description: "Complete productivity suite with Word, Excel, PowerPoint, and cloud storage.",
        category: "Software licenses",
        price: 99.99,
        picture: null,
        createdAt: "2024-01-17T09:15:00Z"
      },
      {
        id: 8,
        name: "Adobe Creative Cloud",
        description: "Full suite of creative applications including Photoshop, Illustrator, and Premiere Pro.",
        category: "Software licenses",
        price: 52.99,
        picture: null,
        createdAt: "2024-01-18T13:25:00Z"
      },
      {
        id: 9,
        name: "Windows 11 Pro",
        description: "Latest Windows operating system with enhanced security and productivity features.",
        category: "Software licenses",
        price: 199.99,
        picture: null,
        createdAt: "2024-01-22T09:15:00Z"
      }
    ],
    "Networking devices": [
      {
        id: 10,
        name: "Wi-Fi 6 Router",
        description: "High-speed wireless router with Wi-Fi 6 technology for ultra-fast internet connectivity.",
        category: "Networking devices",
        price: 299.99,
        picture: "https://res.cloudinary.com/deqp41wyr/image/upload/v1748789975/5900142066988600113_uaakrs.jpg",
        createdAt: "2024-01-20T14:20:00Z"
      },
      {
        id: 11,
        name: "Ethernet Switch 24-Port",
        description: "Managed Gigabit Ethernet switch for enterprise networking solutions.",
        category: "Networking devices",
        price: 449.99,
        picture: "https://res.cloudinary.com/deqp41wyr/image/upload/v1748789994/5900142066988600119_zwi6vk.jpg",
        createdAt: "2024-01-21T10:30:00Z"
      },
      {
        id: 12,
        name: "Mesh Network System",
        description: "Whole-home mesh Wi-Fi system for seamless coverage in large spaces.",
        category: "Networking devices",
        price: 399.99,
        picture: "https://res.cloudinary.com/deqp41wyr/image/upload/v1748789976/5900142066988600124_giicd3.jpg",
        createdAt: "2024-01-22T15:45:00Z"
      }
    ],
    "Office equipments": [
      {
        id: 13,
        name: "HP LaserJet Pro Printer",
        description: "High-quality laser printer for office and home use with wireless connectivity.",
        category: "Office equipments",
        price: 299.99,
        picture: "https://res.cloudinary.com/deqp41wyr/image/upload/v1748789975/5900142066988600122_x1oqv4.jpg",
        createdAt: "2024-01-16T14:20:00Z"
      },
      {
        id: 14,
        name: "Document Scanner",
        description: "High-speed document scanner with automatic document feeder for office productivity.",
        category: "Office equipments",
        price: 199.99,
        picture: "https://res.cloudinary.com/deqp41wyr/image/upload/v1748789975/5900142066988600113_uaakrs.jpg",
        createdAt: "2024-01-23T11:20:00Z"
      },
      {
        id: 15,
        name: "Conference Camera",
        description: "4K conference camera with auto-tracking and noise cancellation for video meetings.",
        category: "Office equipments",
        price: 599.99,
        picture: "https://res.cloudinary.com/deqp41wyr/image/upload/v1748789994/5900142066988600119_zwi6vk.jpg",
        createdAt: "2024-01-24T09:30:00Z"
      }
    ],
    "Others": [
      {
        id: 16,
        name: "Wireless Mouse",
        description: "Ergonomic wireless mouse with precision tracking and long battery life.",
        category: "Others",
        price: 29.99,
        picture: "https://res.cloudinary.com/deqp41wyr/image/upload/v1748789976/5900142066988600124_giicd3.jpg",
        createdAt: "2024-01-19T10:30:00Z"
      },
      {
        id: 17,
        name: "USB-C Hub",
        description: "Multi-port USB-C hub with HDMI, USB 3.0, and SD card reader for laptops.",
        category: "Others",
        price: 49.99,
        picture: "https://res.cloudinary.com/deqp41wyr/image/upload/v1748789975/5900142066988600122_x1oqv4.jpg",
        createdAt: "2024-01-19T14:15:00Z"
      },
      {
        id: 18,
        name: "Mechanical Keyboard",
        description: "RGB backlit mechanical keyboard with blue switches for gaming and typing.",
        category: "Others",
        price: 89.99,
        picture: "https://res.cloudinary.com/deqp41wyr/image/upload/v1748789975/5900142066988600113_uaakrs.jpg",
        createdAt: "2024-01-23T10:30:00Z"
      }
    ]
  }

  // Real API function to fetch products by category
  const fetchProductsByCategory = async (category) => {
    try {
      setLoading(true)
      setError(null)

      console.log(`Fetching products for category: ${category}`)

      const response = await fetch(`${API_BASE_URL}/products/category/${encodeURIComponent(category)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors'
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data.products || []

    } catch (err) {
      console.error(`Error fetching ${category} products:`, err)
      
      // Fallback to sample data for preview
      console.log(`Using sample data for ${category}`)
      await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API delay
      return sampleProducts[category] || []

    } finally {
      setLoading(false)
    }
  }

  // Real API function to fetch product by ID
  const fetchProductById = async (id) => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors'
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data.product || null

    } catch (err) {
      console.error(`Error fetching product ${id}:`, err)
      
      // Fallback to sample data
      for (const categoryProducts of Object.values(sampleProducts)) {
        const product = categoryProducts.find(p => p.id === id)
        if (product) {
          await new Promise(resolve => setTimeout(resolve, 300))
          return product
        }
      }
      return null

    } finally {
      setLoading(false)
    }
  }

  // Load products for all categories on component mount
  useEffect(() => {
    const loadAllProducts = async () => {
      console.log('Loading all products...')
      const allProducts = {}
      
      for (const category of categories) {
        const products = await fetchProductsByCategory(category)
        allProducts[category] = products
      }
      
      setCategoryProducts(allProducts)
    }

    loadAllProducts()
  }, [])

  const getCategoryIcon = (category) => {
    switch(category) {
      case "Laptops and computers": return Laptop
      case "Monitors and displays": return Monitor
      case "Software licenses": return FileText
      case "Networking devices": return Wifi
      case "Office equipments": return Building
      case "Others": return Package
      default: return Package
    }
  }

  const getCategoryDescription = (category) => {
    switch(category) {
      case "Laptops and computers": return "High-performance laptops, desktops, and computer systems"
      case "Monitors and displays": return "Professional monitors, displays, and visual solutions"
      case "Software licenses": return "Software licenses and digital productivity tools"
      case "Networking devices": return "Routers, switches, and networking infrastructure"
      case "Office equipments": return "Printers, scanners, and office productivity devices"
      case "Others": return "Accessories, peripherals, and other tech products"
      default: return "Various tech products"
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  }

  const handleProductClick = async (productId) => {
    const product = await fetchProductById(productId)
    if (product) {
      setSelectedProduct(product)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Our Product Catalog
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Discover our comprehensive range of technology products across 6 specialized categories. From cutting-edge laptops to professional office equipment.
          </p>
        </div>

        {error && (
          <Alert className="mb-6 bg-red-50 border-red-200">
            <Info className="h-4 w-4 text-red-500" />
            <AlertDescription className="text-red-700">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {selectedProduct ? (
          // Product Detail View (same as before)
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <Button 
                variant="outline" 
                onClick={() => setSelectedProduct(null)} 
                className="flex items-center gap-2 hover:bg-blue-50 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Catalog
              </Button>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Product Image */}
                <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 p-8">
                  <div className="aspect-square overflow-hidden rounded-xl bg-white shadow-lg">
                    {selectedProduct.picture ? (
                      <img
                        src={selectedProduct.picture || "/placeholder.svg"}
                        alt={selectedProduct.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-32 h-32 text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Product Information */}
                <div className="p-8 lg:p-12">
                  <div className="space-y-6">
                    <div>
                      <Badge variant="outline" className="mb-4 text-blue-600 border-blue-200">
                        {selectedProduct.category}
                      </Badge>
                      <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                        {selectedProduct.name}
                      </h1>
                      <div className="flex items-center gap-4 mb-6">
                        <span className="text-4xl font-bold text-blue-600">
                          ${selectedProduct.price}
                        </span>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          ))}
                          <span className="text-gray-600 ml-2">(4.8)</span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-gray-900">Description</h3>
                      <p className="text-gray-700 leading-relaxed text-lg">
                        {selectedProduct.description}
                      </p>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-gray-900">Product Information</h3>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Package className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <span className="font-medium text-gray-600">Product ID:</span>
                            <span className="ml-2 text-gray-900 font-semibold">#{selectedProduct.id}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <span className="font-medium text-gray-600">Added:</span>
                            <span className="ml-2 text-gray-900 font-semibold">
                              {formatDate(selectedProduct.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex gap-4 pt-4">
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold">
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Add to Cart
                      </Button>
                      <Button variant="outline" className="px-6 py-3 border-2 hover:bg-gray-50">
                        <Heart className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Category View with Moving Cards - Now with 6 categories
          <div className="space-y-16">
            {categories.map(category => {
              const IconComponent = getCategoryIcon(category)
              const products = categoryProducts[category] || []

              return (
                <div key={category} className="space-y-6">
                  {/* Category Header */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <IconComponent className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">{category}</h2>
                      <p className="text-gray-600">{getCategoryDescription(category)}</p>
                    </div>
                    <Badge variant="secondary" className="ml-auto text-lg px-4 py-2">
                      {products.length} products
                    </Badge>
                  </div>

                  {/* Moving Cards Carousel */}
                  <MovingCarousel 
                    products={products} 
                    onProductClick={handleProductClick}
                    loading={loading}
                  />
                </div>
              )
            })}
          </div>
        )}

        <div className="mt-16">
          <Eyob />
        </div>
      </div>
    </div>
  )
}

// MovingCarousel component remains the same as before
const MovingCarousel = ({ products, onProductClick, loading }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (isAutoPlaying && products.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % products.length)
      }, 3000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAutoPlaying, products.length])

  const handlePrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex(prev => (prev - 1 + products.length) % products.length)
  }

  const handleNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex(prev => (prev + 1) % products.length)
  }

  const handleCardClick = (productId) => {
    setIsAutoPlaying(false)
    onProductClick(productId)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-2xl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-2xl">
        <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <p>No products available in this category</p>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-2xl">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {products.map(product => (
            <div key={product.id} className="w-full flex-shrink-0">
              <Card 
                className="mx-2 cursor-pointer group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white border-0 shadow-lg"
                onClick={() => handleCardClick(product.id)}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0 h-80">
                    {/* Product Image */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                      {product.picture ? (
                        <img
                          src={product.picture || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="w-20 h-20 text-gray-400" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                        <Eye className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6 flex flex-col justify-center">
                      <Badge variant="outline" className="mb-3 w-fit text-blue-600 border-blue-200">
                        {product.category}
                      </Badge>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-blue-600">
                          ${product.price}
                        </span>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      {products.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg border-0 w-12 h-12"
            onClick={handlePrevious}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg border-0 w-12 h-12"
            onClick={handleNext}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </>
      )}

      {/* Dots Indicator */}
      {products.length > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {products.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-blue-600 w-8' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              onClick={() => {
                setCurrentIndex(index)
                setIsAutoPlaying(false)
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Products