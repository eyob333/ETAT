import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Separator } from "../components/ui/separator"
import { Laptop, Printer, FileText, Package, Calendar, Monitor } from 'lucide-react'
import { fetchProducts } from "../redux/product/productSlice"
import { productSelector } from "../redux/store"
import LoadingScreen from "../conditions/LoadingScreen"

const Products = () => {
  const dispatch = useDispatch()
  const { products, isLoading, error } = useSelector(productSelector)
  const [selectedCategory, setSelectedCategory] = useState(null)

  // Get unique categories from the database
  const categories = [...new Set(products.map(product => product.category))]

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts())
    }
  }, [dispatch, products.length])

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products

  if (isLoading) {
    return <LoadingScreen />
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">
          <h2 className="text-2xl font-semibold">Error loading products</h2>
          <p>Please try again later</p>
        </div>
      </div>
    )
  }

  const getCategoryIcon = (category) => {
    switch(category) {
      case "Laptop computers": return Laptop
      case "Printing devices": return Printer
      case "Monitors & Displays": return Monitor
      case "Software licenses": return FileText
      default: return Package
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-6">
        {/* Category Selection */}
        <div className="flex flex-wrap gap-4">
          {categories.map((category) => {
            const Icon = getCategoryIcon(category)
            return (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="flex items-center gap-2"
              >
                <Icon className="w-4 h-4" />
                {category}
              </Button>
            )
          })}
        </div>

        <Separator className="my-4" />

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full text-center py-8">
              <h3 className="text-xl font-semibold text-gray-600">No products found</h3>
            </div>
          ) : (
            filteredProducts.map((product) => (
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
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Products