"use client"; // This directive is typically for Next.js App Router to mark a component as a Client Component

import { useState, useEffect, useRef } from "react";
import "react-responsive-modal/styles.css"; // Assuming this is for a modal component
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

// Import selectors from your Redux store
import { projectSelector, testimonialSelector } from "../redux/store";

// Import actions/thunks from your Redux slices
import { fetchProject } from "../redux/project/projectSlice";
import { fetchTestimonials } from "../redux/testimonial/testimonialSlice"; // Your traditional testimonial thunk

// Import other components and utilities
import ProjectCard from "../components/project/ProjectCard";
import ProjectDetail from "../components/project/ProjectDetail";
import LoadingScreen from "../conditions/LoadingScreen";
import convertToWebP from "../utils/ToWebp"; // Assuming this utility is used elsewhere


const URL = import.meta.env.VITE_BASE_URL + "/"

export default function Project() {
  const dispatch = useDispatch();

  // Select project state from Redux store
  const { projects, isLoading: projectsLoading } = useSelector(projectSelector);

  // Select testimonial state from Redux store
  const {
    testimonials,
    isLoading: testimonialsLoading,
    errMsg: testimonialsErrorMsg,
    error: testimonialsHasError,
  } = useSelector(testimonialSelector);

  // Canvas reference for code background animation
  const canvasRef = useRef(null);

  // --- Data Fetching Side Effects ---
  useEffect(() => {
    // Fetch projects if they haven't been loaded yet
    if (projects.length === 0) {
      dispatch(fetchProject());
    }

    // Fetch testimonials if they haven't been loaded, aren't currently loading, and there's no previous error
    if (testimonials.length === 0 && !testimonialsLoading && !testimonialsHasError) {
      dispatch(fetchTestimonials());
    }
    // Dependencies ensure this effect runs when dispatch or relevant state changes
  }, [dispatch, projects.length, testimonials.length, testimonialsLoading, testimonialsHasError]);


  // --- Project Filtering and Pagination States ---
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [shouldAnimate, setShouldAnimate] = useState(false); // For animation control, likely on project cards
  const [openModalId, setOpenModalId] = useState(null); // For project detail modal

  // --- Testimonial Slider States ---
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false); // To prevent rapid transitions during slide changes

  // --- Testimonial Slider Functions ---
  const goToTestimonial = (index) => {
    // Prevent actions if already animating or no testimonials
    if (isAnimating || testimonials.length === 0) return;

    setIsAnimating(true); // Start animation
    setCurrentTestimonialIndex(index);

    // Reset animation flag after a short delay (matches CSS transition duration)
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const goToPreviousTestimonial = () => {
    if (testimonials.length === 0) return; // Exit if no testimonials
    const newIndex = currentTestimonialIndex === 0 ? testimonials.length - 1 : currentTestimonialIndex - 1;
    goToTestimonial(newIndex);
  };

  const goToNextTestimonial = () => {
    if (testimonials.length === 0) return; // Exit if no testimonials
    const newIndex = currentTestimonialIndex === testimonials.length - 1 ? 0 : currentTestimonialIndex + 1;
    goToTestimonial(newIndex);
  };

  // Auto-advance the testimonial slider every 5 seconds
  useEffect(() => {
    // Only set up auto-advance if there's more than one testimonial to slide
    if (testimonials.length > 1) {
      const interval = setInterval(() => {
        goToNextTestimonial();
        console.log(testimonials)
      }, 5000);

      return () => clearInterval(interval); // Clear interval on component unmount or dependencies change
    }
  }, [currentTestimonialIndex, testimonials.length]); // Re-run effect if index or testimonial count changes

  // Calculate indices for previous, current, and next visible testimonials in the slider
  const getVisibleTestimonialIndices = () => {
    // Handle cases where there are 0, 1, or 2 testimonials to prevent index out of bounds errors
    if (testimonials.length === 0) {
      return { prevIndex: 0, currentIndex: 0, nextIndex: 0 };
    }
    if (testimonials.length === 1) {
      return { prevIndex: 0, currentIndex: 0, nextIndex: 0 };
    }
    if (testimonials.length === 2) {
      const prev = currentTestimonialIndex === 0 ? 1 : 0;
      const next = currentTestimonialIndex === 0 ? 1 : 0;
      return { prevIndex: prev, currentIndex: currentTestimonialIndex, nextIndex: next };
    }

    // Standard logic for 3 or more testimonials
    const prevIndex = currentTestimonialIndex === 0 ? testimonials.length - 1 : currentTestimonialIndex - 1;
    const nextIndex = currentTestimonialIndex === testimonials.length - 1 ? 0 : currentTestimonialIndex + 1;

    return {
      prevIndex,
      currentIndex: currentTestimonialIndex,
      nextIndex,
    };
  };

  // --- Code Background Animation Effect ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas(); // Set initial size
    window.addEventListener("resize", resizeCanvas); // Resize on window change

    // Characters for the "Matrix" effect
    const characters =
      "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン<>{}[]=/\\*+-";

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    const drops = []; // Array to track the y-position of each falling character
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100; // Start off-screen
    }

    const draw = () => {
      // Semi-transparent rectangle to create the "fade" effect
      ctx.fillStyle = "rgba(240, 240, 240, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(14, 165, 233, 0.15)"; // Sky-blue color with transparency
      ctx.font = `${fontSize}px monospace`;

      // Draw each falling character
      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        drops[i]++; // Move character down

        // If character falls off screen, reset it to the top randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
      }
    };

    const interval = setInterval(draw, 50); // Animation speed

    return () => {
      clearInterval(interval); // Clean up interval on unmount
      window.removeEventListener("resize", resizeCanvas); // Clean up event listener
    };
  }, []); // Empty dependency array means this runs once on mount and cleans up on unmount


  // --- Project Filtering and Pagination Logic ---
  const categories = ["All", ...Array.from(new Set(projects.map((item) => item.area)))]; // Dynamically get categories
  const statusArray = ["All", "Completed", "Ongoing"]; // Fixed statuses

  const filteredData =
    selectedCategory === "All" && selectedStatus === "All"
      ? projects // No filtering if 'All' is selected for both
      : projects.filter(
          (data) =>
            (selectedCategory === "All" || data.area === selectedCategory) &&
            (selectedStatus === "All" || data.status === (selectedStatus === "Ongoing")), // 'status' is boolean in data?
        );

  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage); // totalPages based on filteredData

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(1, prevPage - 1)); // Ensure page doesn't go below 1
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(totalPages, prevPage + 1)); // Ensure page doesn't exceed totalPages
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on page change
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = filteredData.slice(startIndex, endIndex);

  // Generate page numbers for pagination controls
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Handlers for filter changes, reset to first page
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    handlePageChange(1);
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    handlePageChange(1);
  };

  // Trigger animation when filtered data changes (e.g., for project cards)
  useEffect(() => {
    setShouldAnimate(true);
  }, [filteredData]);

  // Modal open/close handlers
  const openModal = (id) => {
    setOpenModalId(id);
  };

  const closeModal = () => {
    setOpenModalId(null);
  };

  // --- Loading and Error Handling ---
  // Display a loading screen if either projects or testimonials are loading
  if (projectsLoading || testimonialsLoading) {
    return <LoadingScreen />;
  }

  // Display an error message if testimonials failed to load
  if (testimonialsHasError) {
    console.error("Error loading testimonials:", testimonialsErrorMsg); // Log full error for debugging
    return (
      <div className="text-center text-red-500 p-8">
        Failed to load testimonials. Please try again later.
        {testimonialsErrorMsg && <p className="text-sm">Details: {testimonialsErrorMsg?.message || JSON.stringify(testimonialsErrorMsg)}</p>}
      </div>
    );
  }

  // --- Destructure indices for testimonial slider after checks ---
  const { prevIndex, nextIndex } = getVisibleTestimonialIndices();


  // --- Component Render ---
  return (
    <div className="relative">
      {/* Code in motion background */}
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full opacity-20" style={{ zIndex: -10 }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
        <div className="text-center pb-12">
          <h1 className="font-bold text-mainColor font-railway-500 text-3xl pb-10 underline-offset-2">
            Our Projects
          </h1>
        </div>

        {/* Project Filtering Controls */}
        <div className="flex flex-wrap justify-center mb-10">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-3 py-1 rounded-md mb-2 mr-2 ${
                selectedCategory === category ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
              }`}
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

        {/* Project Cards Grid */}
        <div className="">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7 px-5">
            <ProjectCard filteredData={paginatedItems} openModal={openModal} shouldAnimate={shouldAnimate} />

            {/* Project Detail Modal */}
            {openModalId && <ProjectDetail openModalId={openModalId} dataArray={projects} closeModal={closeModal} />}
          </div>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-5">
          {/* Previous Page Button */}
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

          {/* Page Number Buttons */}
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

          {/* Next Page Button */}
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
        {/* Only render this section if there are testimonials to display */}
        {testimonials.length > 0 && (
          <section className="relative w-full py-16 overflow-hidden bg-gray-100 mb-12 rounded-lg mt-12">
            {/* Sky blue gradient elements on sides for visual flair */}
            <div className="absolute bottom-0 left-0 w-1/4 h-full bg-gradient-to-r from-sky-300/40 to-transparent" />
            <div className="absolute bottom-0 right-0 w-1/4 h-full bg-gradient-to-l from-sky-300/40 to-transparent" />

            <div className="container relative z-10 px-4 mx-auto">
              <h1 className="mb-16 text-4xl font-bold text-center text-gray-700">Our Testimonials</h1>

              <div className="relative h-[500px]"> {/* Container for the slider */}
                <div className="relative flex items-center justify-center w-full h-full">
                  {/* Previous slide (left) - Rotated and scaled for visual effect */}
                  <div
                    className="absolute left-0 z-10 transform -translate-x-1/4 md:left-[10%]"
                    style={{ perspective: "1000px", transform: "rotateY(-25deg)" }}
                  >
                    <div className="relative transition-all duration-500 bg-white rounded-md shadow-lg opacity-70 hover:opacity-80 w-[280px] h-[400px]">
                      <img
                        // Use optional chaining for safe access to properties
                        src={ URL + testimonials[prevIndex]?.image || "https://res.cloudinary.com/deqp41wyr/image/upload/v1745837303/TECHIN1_qv03we.png"}
                        alt={testimonials[prevIndex]?.name || "Testimonial Image"}
                        className="object-cover rounded-md w-full h-full"
                      />
                    </div>
                  </div>

                  {/* Current slide (center) - Larger and more prominent */}
                  <div
                    className="relative z-20 transition-all duration-500 transform scale-110"
                    style={{ perspective: "1000px" }}
                  >
                    <div className="relative bg-white rounded-md shadow-xl w-[320px] h-[450px]">
                      <img
                        // Use optional chaining for safe access to properties
                        src={ URL + testimonials[currentTestimonialIndex]?.image || "https://res.cloudinary.com/deqp41wyr/image/upload/v1745837254/EIH_jq8vhx.png"}
                        alt={testimonials[currentTestimonialIndex]?.name || "Testimonial Image"}
                        className="object-cover rounded-md w-full h-full"
                      />
                    </div>
                  </div>

                  {/* Next slide (right) - Rotated and scaled for visual effect */}
                  <div
                    className="absolute right-0 z-10 transform translate-x-1/4 md:right-[10%]"
                    style={{ perspective: "1000px", transform: "rotateY(25deg)" }}
                  >
                    <div className="relative transition-all duration-500 bg-white rounded-md shadow-lg opacity-70 hover:opacity-80 w-[280px] h-[400px]">
                      <img
                        // Use optional chaining for safe access to properties
                        src={URL + testimonials[nextIndex]?.image || "https://res.cloudinary.com/deqp41wyr/image/upload/v1746007783/Slide_01_dphp7w.jpg"}
                        alt={testimonials[nextIndex]?.title || "Testimonial Image"}
                        className="object-cover rounded-md w-full h-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Navigation buttons */}
                <button
                  onClick={goToPreviousTestimonial}
                  className="absolute left-4 z-30 p-2 text-gray-700 transform -translate-y-1/2 bg-white rounded-full shadow-md top-1/2 hover:bg-gray-100"
                  // Disable if animating or if there's only one testimonial (no need to slide)
                  disabled={isAnimating || testimonials.length <= 1}
                >
                  <MdOutlineKeyboardArrowLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={goToNextTestimonial}
                  className="absolute right-4 z-30 p-2 text-gray-700 transform -translate-y-1/2 bg-white rounded-full shadow-md top-1/2 hover:bg-gray-100"
                  // Disable if animating or if there's only one testimonial
                  disabled={isAnimating || testimonials.length <= 1}
                >
                  <MdOutlineKeyboardArrowRight className="w-6 h-6" />
                </button>

                {/* Dots indicator for direct navigation */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 mt-4">
                  {testimonials.map((item) => (
                    <img
                      key={item.id}
                      src={item.image || 'https://placehold.co/150x150/000000/FFFFFF?text=No+Image'}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-full mx-auto mb-2"
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}