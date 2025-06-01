"use client"

import { useEffect, useState } from "react"
import { ChevronUp, ChevronDown, Star } from "lucide-react"
import { Button } from "../components/ui/button"
import { cn } from "../lib/utils"

const Products = () => {
  const [activeImage, setActiveImage] = useState(0)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)

  const productImages = [
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
  ]

  // Auto scroll images
  useEffect(() => {
    if (!isAutoScrolling) return

    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % productImages.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [isAutoScrolling, productImages.length])

  const handleImageHover = () => {
    setIsAutoScrolling(false)
  }

  const handleImageLeave = () => {
    setIsAutoScrolling(true)
  }

  const handleImageClick = (index) => {
    setActiveImage(index)
    setIsAutoScrolling(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left Column - Main Product Image and Name */}
        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-lg border shadow-md aspect-square">
            <img
              src={productImages[activeImage] || "/placeholder.svg"}
              alt="Premium Wireless Headphones"
              className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold tracking-tight">Premium Wireless Headphones</h1>
            <div className="flex items-center justify-center md:justify-start mt-2 space-x-1">
            </div>
          
          </div>
        </div>

        {/* Right Column - Sliding Images and Description */}
        <div className="space-y-8">
          <div className="relative h-[400px] overflow-hidden rounded-lg border shadow-md">
            <div
              className="absolute inset-0 transition-transform duration-1000 ease-in-out"
              style={{ transform: `translateY(-${activeImage * 100}%)` }}
            >
              {productImages.map((image, index) => (
                <div key={index} className="relative h-[400px] w-full">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Product view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                    <h3 className="text-xl font-bold">Feature {index + 1}</h3>
                    <p className="mt-2">
                      {index === 0 && "Premium sound quality with noise cancellation technology."}
                      {index === 1 && "Comfortable design for all-day wear with premium materials."}
                      {index === 2 && "Long-lasting battery life up to 30 hours of playback."}
                      {index === 3 && "Seamless connectivity with all your devices via Bluetooth 5.0."}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col space-y-2 bg-white/80 rounded-full p-1 shadow-md">
              <button
                onClick={() => setActiveImage((prev) => (prev - 1 + productImages.length) % productImages.length)}
                className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                aria-label="Previous image"
              >
                <ChevronUp className="h-5 w-5" />
              </button>
              <button
                onClick={() => setActiveImage((prev) => (prev + 1) % productImages.length)}
                className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                aria-label="Next image"
              >
                <ChevronDown className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {productImages.map((image, index) => (
              <div
                key={index}
                className={cn(
                  "relative aspect-square cursor-pointer overflow-hidden rounded-md border",
                  activeImage === index ? "ring-2 ring-offset-2 ring-black" : "",
                )}
                onClick={() => handleImageClick(index)}
                onMouseEnter={handleImageHover}
                onMouseLeave={handleImageLeave}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* <div className="space-y-4">
            <h2 className="text-2xl font-bold">Product Description</h2>
            <p>
              Experience premium sound quality with our wireless headphones. Designed for comfort and style, these
              headphones deliver exceptional audio performance with deep bass and crystal-clear highs.
            </p>
            <p>
              The advanced noise cancellation technology blocks out ambient noise, allowing you to focus on your music
              or calls. With up to 30 hours of battery life, you can enjoy your favorite tunes all day long.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="space-y-2">
                <h3 className="font-semibold">Key Features</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Active Noise Cancellation</li>
                  <li>30-hour battery life</li>
                  <li>Premium sound quality</li>
                  <li>Bluetooth 5.0 connectivity</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">What's in the box</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Wireless Headphones</li>
                  <li>Carrying Case</li>
                  <li>USB-C Charging Cable</li>
                  <li>User Manual</li>
                </ul>
              </div>
            </div>
          </div> */}
        </div>

        {/* 2nd left oloumn */}
        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-lg border shadow-md aspect-square">
            <img
              src={productImages[activeImage] || "/placeholder.svg"}
              alt="Premium Wireless Headphones"
              className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold tracking-tight">Premium Wireless Headphones</h1>
            <div className="flex items-center justify-center md:justify-start mt-2 space-x-1">
              
            </div>
           
          </div>
        </div>

        {/* 2nd right column */}
        
        <div className="space-y-8">
          <div className="relative h-[400px] overflow-hidden rounded-lg border shadow-md">
            <div
              className="absolute inset-0 transition-transform duration-1000 ease-in-out"
              style={{ transform: `translateY(-${activeImage * 100}%)` }}
            >
              {productImages.map((image, index) => (
                <div key={index} className="relative h-[400px] w-full">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Product view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                    <h3 className="text-xl font-bold">Feature {index + 1}</h3>
                    <p className="mt-2">
                      {index === 0 && "Premium sound quality with noise cancellation technology."}
                      {index === 1 && "Comfortable design for all-day wear with premium materials."}
                      {index === 2 && "Long-lasting battery life up to 30 hours of playback."}
                      {index === 3 && "Seamless connectivity with all your devices via Bluetooth 5.0."}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col space-y-2 bg-white/80 rounded-full p-1 shadow-md">
              <button
                onClick={() => setActiveImage((prev) => (prev - 1 + productImages.length) % productImages.length)}
                className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                aria-label="Previous image"
              >
                <ChevronUp className="h-5 w-5" />
              </button>
              <button
                onClick={() => setActiveImage((prev) => (prev + 1) % productImages.length)}
                className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                aria-label="Next image"
              >
                <ChevronDown className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {productImages.map((image, index) => (
              <div
                key={index}
                className={cn(
                  "relative aspect-square cursor-pointer overflow-hidden rounded-md border",
                  activeImage === index ? "ring-2 ring-offset-2 ring-black" : "",
                )}
                onClick={() => handleImageClick(index)}
                onMouseEnter={handleImageHover}
                onMouseLeave={handleImageLeave}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* <div className="space-y-4">
            <h2 className="text-2xl font-bold">Product Description</h2>
            <p>
              Experience premium sound quality with our wireless headphones. Designed for comfort and style, these
              headphones deliver exceptional audio performance with deep bass and crystal-clear highs.
            </p>
            <p>
              The advanced noise cancellation technology blocks out ambient noise, allowing you to focus on your music
              or calls. With up to 30 hours of battery life, you can enjoy your favorite tunes all day long.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="space-y-2">
                <h3 className="font-semibold">Key Features</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Active Noise Cancellation</li>
                  <li>30-hour battery life</li>
                  <li>Premium sound quality</li>
                  <li>Bluetooth 5.0 connectivity</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">What's in the box</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Wireless Headphones</li>
                  <li>Carrying Case</li>
                  <li>USB-C Charging Cable</li>
                  <li>User Manual</li>
                </ul>
              </div>
            </div>
          </div> */}
        </div>

        {/* 3rd left column */}
        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-lg border shadow-md aspect-square">
            <img
              src={productImages[activeImage] || "/placeholder.svg"}
              alt="Premium Wireless Headphones"
              className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold tracking-tight">Premium Wireless Headphones</h1>
            <div className="flex items-center justify-center md:justify-start mt-2 space-x-1">

            </div>
      
          </div>
        </div>

        {/* 3rd right column */}

        <div className="space-y-8">
          <div className="relative h-[400px] overflow-hidden rounded-lg border shadow-md">
            <div
              className="absolute inset-0 transition-transform duration-1000 ease-in-out"
              style={{ transform: `translateY(-${activeImage * 100}%)` }}
            >
              {productImages.map((image, index) => (
                <div key={index} className="relative h-[400px] w-full">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Product view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                    <h3 className="text-xl font-bold">Feature {index + 1}</h3>
                    <p className="mt-2">
                      {index === 0 && "Premium sound quality with noise cancellation technology."}
                      {index === 1 && "Comfortable design for all-day wear with premium materials."}
                      {index === 2 && "Long-lasting battery life up to 30 hours of playback."}
                      {index === 3 && "Seamless connectivity with all your devices via Bluetooth 5.0."}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col space-y-2 bg-white/80 rounded-full p-1 shadow-md">
              <button
                onClick={() => setActiveImage((prev) => (prev - 1 + productImages.length) % productImages.length)}
                className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                aria-label="Previous image"
              >
                <ChevronUp className="h-5 w-5" />
              </button>
              <button
                onClick={() => setActiveImage((prev) => (prev + 1) % productImages.length)}
                className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                aria-label="Next image"
              >
                <ChevronDown className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {productImages.map((image, index) => (
              <div
                key={index}
                className={cn(
                  "relative aspect-square cursor-pointer overflow-hidden rounded-md border",
                  activeImage === index ? "ring-2 ring-offset-2 ring-black" : "",
                )}
                onClick={() => handleImageClick(index)}
                onMouseEnter={handleImageHover}
                onMouseLeave={handleImageLeave}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* <div className="space-y-4">
            <h2 className="text-2xl font-bold">Product Description</h2>
            <p>
              Experience premium sound quality with our wireless headphones. Designed for comfort and style, these
              headphones deliver exceptional audio performance with deep bass and crystal-clear highs.
            </p>
            <p>
              The advanced noise cancellation technology blocks out ambient noise, allowing you to focus on your music
              or calls. With up to 30 hours of battery life, you can enjoy your favorite tunes all day long.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="space-y-2">
                <h3 className="font-semibold">Key Features</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Active Noise Cancellation</li>
                  <li>30-hour battery life</li>
                  <li>Premium sound quality</li>
                  <li>Bluetooth 5.0 connectivity</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">What's in the box</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Wireless Headphones</li>
                  <li>Carrying Case</li>
                  <li>USB-C Charging Cable</li>
                  <li>User Manual</li>
                </ul>
              </div>
            </div>
          </div> */}
        </div>
        
      </div>
    </div>
  )
}

export default Products
