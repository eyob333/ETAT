import React, { useState } from "react"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Separator } from "../components/ui/separator"
import { Laptop, Printer, FileText, Package, Calendar } from 'lucide-react'

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)

  // Categories
  const categories = [
    "Laptop computers", 
    "Printing devices", 
    "Software licenses", 
    "Others"
  ]

  // Sample products data
  const products = [
    {
      id: 1,
      name: "MacBook Pro 16-inch",
      description: "Powerful laptop with M2 Pro chip, perfect for professional work and creative tasks.",
      category: "Laptop computers",
      picture: "https://res.cloudinary.com/deqp41wyr/image/upload/v1748789975/5900142066988600122_x1oqv4.jpg",
      createdAt: "2024-01-15T10:30:00Z"
    },
    {
      id: 2,
      name: "Dell XPS 15",
      description: "Premium Windows laptop with 4K OLED display and Intel Core i9 processor.",
      category: "Laptop computers",
      picture: "https://res.cloudinary.com/deqp41wyr/image/upload/v1748789994/5900142066988600119_zwi6vk.jpg",
      createdAt: "2024-01-16T11:45:00Z"
    },
    {
      id: 3,
      name: "HP LaserJet Pro",
      description: "High-quality laser printer for office and home use with wireless connectivity.",
      category: "Printing devices",
      picture: "https://res.cloudinary.com/deqp41wyr/image/upload/v1748789975/5900142066988600113_uaakrs.jpg",
      createdAt: "2024-01-16T14:20:00Z"
    },
    {
      id: 4,
      name: "Epson EcoTank",
      description: "Eco-friendly inkjet printer with refillable ink tanks for low-cost printing.",
      category: "Printing devices",
      picture: "https://res.cloudinary.com/deqp41wyr/image/upload/v1748789976/5900142066988600124.jpg",
      createdAt: "2024-01-17T09:15:00Z"
    }
  ]

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-6">
        {/* Category Selection */}
        <div className="flex flex-wrap gap-4">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="flex items-center gap-2"
            >
              {category === "Laptop computers" && <Laptop className="w-4 h-4" />}
              {category === "Printing devices" && <Printer className="w-4 h-4" />}
              {category === "Software licenses" && <FileText className="w-4 h-4" />}
              {category === "Others" && <Package className="w-4 h-4" />}
              {category}
            </Button>
          ))}
        </div>

        <Separator className="my-4" />

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0">
                <img
                  src={product.picture}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <Badge variant="secondary">{product.category}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(product.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Products