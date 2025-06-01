"use client"

import { useState, useEffect, useRef } from "react"
import "react-responsive-modal/styles.css"
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import ProjectCard from "../components/project/ProjectCard"
import ProjectDetail from "../components/project/ProjectDetail"
import { projectSelector } from "../redux/store"
import { fetchProject } from "../redux/project/projectSlice"
import LoadingScreen from "../conditions/LoadingScreen"

export default function Project() {
  const dispatch = useDispatch()
  const { projects, isLoading } = useSelector(projectSelector)

  // Canvas reference for code background
  const canvasRef = useRef(null)

  useEffect(() => {
    if (projects.length === 0) {
      dispatch(fetchProject())
    }
  }, [dispatch, projects.length])

  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const [openModalId, setOpenModalId] = useState(null)

  // Testimonial slider state
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(1)
  const [isAnimating, setIsAnimating] = useState(false)

  // Testimonial data
  const testimonials = [
    {
      id: 1,
      imageSrc: "https://res.cloudinary.com/deqp41wyr/image/upload/v1745869230/four_mgcnah.jpg?height=500&width=350",
      title: "Faith Import and Trade",
    },
    {
      id: 2,
      imageSrc: "https://res.cloudinary.com/deqp41wyr/image/upload/v1745869226/two_ezrhm6.jpg?height=500&width=350",
      title: "GI",
    },
    {
      id: 3,
      imageSrc: "https://res.cloudinary.com/deqp41wyr/image/upload/v1745837298/NID_bw1oko.png?height=500&width=350",
      title: "Faith Import and Trade",
    },
    {
      id: 4,
      imageSrc: "https://res.cloudinary.com/deqp41wyr/image/upload/v1745837301/PMO_kvzlhs.jpg?height=500&width=350",
      title: "Company Certificate",
    },
    {
      id: 5,
      imageSrc: "https://res.cloudinary.com/deqp41wyr/image/upload/v1746007783/Slide_01_dphp7w.jpg?height=500&width=350",
      title: "Business Award",
    },
  ]

  // Testimonial slider functions
  const goToTestimonial = (index) => {
    if (isAnimating) return

    setIsAnimating(true)
    setCurrentTestimonialIndex(index)

    // Reset animation flag after transition completes
    setTimeout(() => {
      setIsAnimating(false)
    }, 500)
  }

  const goToPreviousTestimonial = () => {
    const newIndex = currentTestimonialIndex === 0 ? testimonials.length - 1 : currentTestimonialIndex - 1
    goToTestimonial(newIndex)
  }

  const goToNextTestimonial = () => {
    const newIndex = currentTestimonialIndex === testimonials.length - 1 ? 0 : currentTestimonialIndex + 1
    goToTestimonial(newIndex)
  }

  // Auto-advance the testimonial slider every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      goToNextTestimonial()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentTestimonialIndex])

  // Calculate indices for visible testimonials
  const getVisibleTestimonialIndices = () => {
    const prevIndex = currentTestimonialIndex === 0 ? testimonials.length - 1 : currentTestimonialIndex - 1
    const nextIndex = currentTestimonialIndex === testimonials.length - 1 ? 0 : currentTestimonialIndex + 1

    return {
      prevIndex,
      currentIndex: currentTestimonialIndex,
      nextIndex,
    }
  }

  // Code background animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions to match window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Code characters to display
    const characters =
      "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン<>{}[]=/\\*+-"

    // Create columns for the matrix effect
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)

    // Array to track the y position of each column
    const drops = []
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100
    }

    // Draw the matrix effect
    const draw = () => {
      // Semi-transparent background to create fade effect
      ctx.fillStyle = "rgba(240, 240, 240, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Set text color and font - using sky blue
      ctx.fillStyle = "rgba(14, 165, 233, 0.15)" // sky-500 with low opacity
      ctx.font = `${fontSize}px monospace`

      // Draw each character
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = characters.charAt(Math.floor(Math.random() * characters.length))

        // Draw the character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        // Move the drop down
        drops[i]++

        // Reset drop to top with random delay when it reaches bottom
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
      }
    }

    // Animation loop
    const interval = setInterval(draw, 50)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  // Original project page functionality
  const categories = ["All", ...Array.from(new Set(projects.map((item) => item.area)))]
  const statusArray = ["All", "Completed", "Ongoing"]

  const filteredData =
    selectedCategory === "All" && selectedStatus === "All"
      ? projects
      : projects.filter(
          (data) =>
            (selectedCategory === "All" || data.area === selectedCategory) &&
            (selectedStatus === "All" || data.status === (selectedStatus === "Ongoing")),
        )

  const itemsPerPage = 4
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(projects.length / itemsPerPage)

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1)
  }

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo(10, 0)
  }
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedItems = filteredData.slice(startIndex, endIndex)

  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    handlePageChange(1)
  }

  const handleStatusChange = (status) => {
    setSelectedStatus(status)
    handlePageChange(1)
  }

  useEffect(() => {
    setShouldAnimate(true)
  }, [filteredData])

  const openModal = (id) => {
    setOpenModalId(id)
  }

  const closeModal = () => {
    setOpenModalId(null)
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  const { prevIndex, nextIndex } = getVisibleTestimonialIndices()

  return (
    <div className="relative">
      {/* Code in motion background - very subtle */}
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full opacity-20" style={{ zIndex: -10 }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
        <div className="text-center pb-12">
          <h1 className="font-bold text-mainColor font-railway-500 text-3xl pb-10 underline-offset-2">Our Projects</h1>
          {/* <h3 className="">
            
          </h3> */}
        </div>

       
        {/* Original Project Filtering */}
        <div className="flex flex-wrap justify-center mb-10">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-3 py-1 rounded-md mb-2 mr-2 ${selectedCategory === category ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center mb-10">
          {statusArray.map((status) => (
            <button
              key={status}
              className={`px-3 py-1 rounded-md mb-2 mr-2 ${
                selectedStatus === status ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => handleStatusChange(status)}
            >
              {status}
            </button>
          ))}
        </div>
        <div className="">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7 px-5">
            <ProjectCard filteredData={paginatedItems} openModal={openModal} shouldAnimate={shouldAnimate} />

            {openModalId && <ProjectDetail openModalId={openModalId} dataArray={projects} closeModal={closeModal} />}
          </div>
        </div>

        <div className="flex justify-center mt-5">
          {currentPage !== 1 && (
            <div className="relative group">
              <button
                className={`px-5 py-2 mx-1 bg-gray-200 text-gray-700 rounded-md h-full ${
                  currentPage === 1 ? "bg-blue-700 h-full" : "hover:bg-gray-400"
                }`}
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                <MdOutlineKeyboardArrowLeft color="gray" />
              </button>
            </div>
          )}

          {pageNumbers.map((number) => (
            <button
              key={number}
              className={`px-4 py-2 mx-1 ${
                currentPage === number ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
              } ${currentPage !== number ? "hover:bg-gray-400 hover:text-white" : ""} rounded-md `}
              onClick={() => handlePageChange(number)}
            >
              {number}
            </button>
          ))}

          {currentPage !== totalPages && (
            <div className="relative group">
              <button
                className={`px-5 py-2 mx-1 bg-gray-200 text-gray-700 rounded-md h-full ${
                  currentPage === totalPages ? "bg-blue-700 invisible" : "hover:bg-gray-400"
                }`}
                onClick={handleNextPage}
              >
                <MdOutlineKeyboardArrowRight color="gray" />
              </button>
            </div>
          )}
        </div>
         {/* Testimonials Section */}
         <section className="relative w-full py-16 overflow-hidden bg-gray-100 mb-12 rounded-lg">
          {/* Sky blue gradient elements on sides */}
          <div className="absolute bottom-0 left-0 w-1/4 h-full bg-gradient-to-r from-sky-300/40 to-transparent" />
          <div className="absolute bottom-0 right-0 w-1/4 h-full bg-gradient-to-l from-sky-300/40 to-transparent" />

          <div className="container relative z-10 px-4 mx-auto">
            <h1 className="mb-16 text-4xl font-bold text-center text-gray-700">Our Testimonials</h1>

            <div className="relative h-[500px]">
              {/* Slider container */}
              <div className="relative flex items-center justify-center w-full h-full">
                {/* Previous slide (left) */}
                <div
                  className="absolute left-0 z-10 transform -translate-x-1/4 md:left-[10%]"
                  style={{ perspective: "1000px", transform: "rotateY(-25deg)" }}
                >
                  <div className="relative transition-all duration-500 bg-white rounded-md shadow-lg opacity-70 hover:opacity-80 w-[280px] h-[400px]">
                    <img
                      src={testimonials[prevIndex].imageSrc || "https://res.cloudinary.com/deqp41wyr/image/upload/v1745837303/TECHIN1_qv03we.png"}
                      alt={testimonials[prevIndex].title}
                      className="object-cover rounded-md w-full h-full"
                    />
                  </div>
                </div>

                {/* Current slide (center) */}
                <div
                  className="relative z-20 transition-all duration-500 transform scale-110"
                  style={{ perspective: "1000px" }}
                >
                  <div className="relative bg-white rounded-md shadow-xl w-[320px] h-[450px]">
                    <img
                      src={testimonials[currentTestimonialIndex].imageSrc || "https://res.cloudinary.com/deqp41wyr/image/upload/v1745837254/EIH_jq8vhx.png"}
                      alt={testimonials[currentTestimonialIndex].title}
                      className="object-cover rounded-md w-full h-full"
                    />
                  </div>
                </div>

                {/* Next slide (right) */}
                <div
                  className="absolute right-0 z-10 transform translate-x-1/4 md:right-[10%]"
                  style={{ perspective: "1000px", transform: "rotateY(25deg)" }}
                >
                  <div className="relative transition-all duration-500 bg-white rounded-md shadow-lg opacity-70 hover:opacity-80 w-[280px] h-[400px]">
                    <img
                      src={testimonials[nextIndex].imageSrc || "https://res.cloudinary.com/deqp41wyr/image/upload/v1746007783/Slide_01_dphp7w.jpg"}
                      alt={testimonials[nextIndex].title}
                      className="object-cover rounded-md w-full h-full"
                    />
                  </div>
                </div>
              </div>

              {/* Navigation buttons */}
              <button
                onClick={goToPreviousTestimonial}
                className="absolute left-4 z-30 p-2 text-gray-700 transform -translate-y-1/2 bg-white rounded-full shadow-md top-1/2 hover:bg-gray-100"
                disabled={isAnimating}
              >
                <MdOutlineKeyboardArrowLeft className="w-6 h-6" />
              </button>

              <button
                onClick={goToNextTestimonial}
                className="absolute right-4 z-30 p-2 text-gray-700 transform -translate-y-1/2 bg-white rounded-full shadow-md top-1/2 hover:bg-gray-100"
                disabled={isAnimating}
              >
                <MdOutlineKeyboardArrowRight className="w-6 h-6" />
              </button>

              {/* Dots indicator */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 mt-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      currentTestimonialIndex === index ? "bg-sky-500" : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}

