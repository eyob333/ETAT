"use client";
import { useState, useEffect, useRef } from "react";
import { BiTimeFive } from "react-icons/bi";
import { AiOutlineBook } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";



const trainings = [
  {
    id: "cissp",
    title: "Programming",
    phases: 1,
    location: "Online",
    description: "A foundational course designed for individuals new to the field.",
    longDescription:
      "Comprehensive preparation for all 8 CISSP domains including security and risk management, asset security, security architecture, network security, and more. Develop the expertise needed to design, implement, and manage cybersecurity programs.",
    picture: "https://res.cloudinary.com/deqp41wyr/image/upload/v1747508755/Data_Science_trjhs7.jpg",
  },
  {
    id: "cissp",
    title: "Data Science",
    phases: 1,
    location: "Online",
    description: "A foundational course designed for individuals new to the field.",
    longDescription:
      "Comprehensive preparation for all 8 CISSP domains including security and risk management, asset security, security architecture, network security, and more. Develop the expertise needed to design, implement, and manage cybersecurity programs.",
    picture: "https://res.cloudinary.com/deqp41wyr/image/upload/v1745869214/one_zc27bt.jpg",
  },
  {
    id: "cissp",
    title: "AI",
    phases: 1,
    location: "Online",
    description: "A foundational course designed for individuals new to the field.",
    longDescription:
      "Comprehensive preparation for all 8 CISSP domains including security and risk management, asset security, security architecture, network security, and more. Develop the expertise needed to design, implement, and manage cybersecurity programs.",
    picture: "https://res.cloudinary.com/deqp41wyr/image/upload/v1747508665/AI_vqy08i.jpg",
  },
  {
    id: "cissp",
    title: "Robotics & Autonomous",
    phases: 1,
    location: "Online",
    description: "A foundational course designed for individuals new to the field.",
    longDescription:
      "Comprehensive preparation for all 8 CISSP domains including security and risk management, asset security, security architecture, network security, and more. Develop the expertise needed to design, implement, and manage cybersecurity programs.",
    picture: "https://res.cloudinary.com/deqp41wyr/image/upload/v1747508987/Robotics_ulj2gk.jpg",
  },
  {
    id: "cissp",
    title: "CISSP",
    phases: 1,
    location: "Online",
    description: "A foundational course designed for individuals new to the field.",
    longDescription:
      "Comprehensive preparation for all 8 CISSP domains including security and risk management, asset security, security architecture, network security, and more. Develop the expertise needed to design, implement, and manage cybersecurity programs.",
    picture: "https://res.cloudinary.com/deqp41wyr/image/upload/v1745869214/one_zc27bt.jpg",
  },
  {
    id: "cisa",
    title: "CISA",
    phases: 2,
    location: "Addis Ababa",
    description: "An in-depth training covering advanced concepts and practical applications.",
    longDescription:
      "Learn information systems auditing, governance, and protection. Develop skills to assess vulnerabilities, report on compliance, and institute controls. Master the five domains of the CISA certification with hands-on practice and expert guidance.",
    picture: "https://res.cloudinary.com/deqp41wyr/image/upload/v1745869226/two_ezrhm6.jpg",
  },
  {
    id: "cism",
    title: "CISM",
    phases: 1,
    location: "Hybrid",
    description: "A focused workshop on a specific emerging technology.",
    longDescription:
      "Master information security governance, risk management, program development, and incident management for enterprise-level security operations. Learn to align security strategies with organizational goals and effectively manage security teams.",
    picture: "https://res.cloudinary.com/deqp41wyr/image/upload/v1745869217/three_mh3esy.jpg",
  },
  {
    id: "pmp",
    title: "PMP",
    phases: 3,
    location: "International",
    description: "A high-level masterclass led by industry experts.",
    longDescription:
      "Learn project integration, scope, time, cost, quality, resource, communications, risk, procurement, and stakeholder management according to PMI standards. Develop the skills to lead and direct projects and teams effectively.",
    picture: "https://res.cloudinary.com/deqp41wyr/image/upload/v1745869230/four_mgcnah.jpg",
  },
];

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

export default function TrainingList() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState("next");
  const carouselRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.loop = true;
      videoRef.current.muted = true; // Ensure it's muted for autoplay
      const playPromise = videoRef.current.play();

      playPromise.catch((error) => {
        console.warn("Autoplay prevented:", error);
      });
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const nextSlide = () => {
    if (isAnimating) return;

    setDirection("next");
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === trainings.length - 1 ? 0 : prev + 1));

    setTimeout(() => {
      setIsAnimating(false);
    }, 700);
  };

  const prevSlide = () => {
    if (isAnimating) return;

    setDirection("prev");
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === 0 ? trainings.length - 1 : prev - 1));

    setTimeout(() => {
      setIsAnimating(false);
    }, 700);
  };

  const getCardPosition = (index) => {
    if (index === activeIndex) return "active";
    if (index === (activeIndex - 1 + trainings.length) % trainings.length) return "prev";
    if (index === (activeIndex + 1) % trainings.length) return "next";
    if (index === (activeIndex - 2 + trainings.length) % trainings.length) return "far-prev";
    if (index === (activeIndex + 2) % trainings.length) return "far-next";
    return "hidden";
  };

  const getCardClasses = (position) => {
    switch (position) {
      case "active":
        return "z-30 scale-100 opacity-100 translate-x-0 rotate-0 shadow-2xl";
      case "prev":
        return "z-20 scale-85 opacity-80 -translate-x-[70%] -rotate-8 shadow-xl";
      case "next":
        return "z-20 scale-85 opacity-80 translate-x-[70%] rotate-8 shadow-xl";
      case "far-prev":
        return "z-10 scale-70 opacity-50 -translate-x-[120%] -rotate-15 shadow-lg";
      case "far-next":
        return "z-10 scale-70 opacity-50 translate-x-[120%] rotate-15 shadow-lg";
      default:
        return "scale-50 opacity-0 translate-x-full";
    }
  };

  const getEntranceAnimation = (position, direction) => {
    if (position === "active" && !isAnimating) return "animate-float";
    if (isAnimating && position === "active" && direction === "next") return "animate-slide-right";
    if (isAnimating && position === "active" && direction === "prev") return "animate-slide-left";
    return "";
  };

  return (
    <div className="relative z-20 min-h-screen bg-white flex flex-col items-center overflow-hidden">
      {/* Background Video Section (30% of viewport height) */}
      <div className="absolute top-0 left-0 w-full h-[50vh] overflow-hidden z-0">
        <video
          ref={videoRef}
          className="min-w-full min-h-full absolute object-cover"
          src="https://res.cloudinary.com/deqp41wyr/video/upload/v1747517133/c780455026110284ea07a4e793fff651_cok4fk.mp4" // Replace with your video URL
          loop
          muted
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div> {/* Optional overlay */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center text-white">
          <motion.h1
            className="text-3xl sm:text-4xl font-bold mb-2"
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            Explore Our Cutting-Edge Trainings
          </motion.h1>
          <motion.p
            className="text-lg opacity-80"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            Elevate your skills and knowledge.
          </motion.p>
        </div>
      </div>

      {/* Trainings Carousel Section (below the video) */}
      <div className="pt-[30vh] w-full flex-grow flex flex-col items-center pb-10">
        <div className="flex flex-wrap">
          <div className="w-full px-4">
            <div className="text-center mx-auto mb-12 lg:mb-14 max-w-[510px]">
              <h2 className="font-bold text-3xl sm:text-4xl md:text-[40px] text-mainColor font-raleway">Trainings</h2>
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="container mx-auto">
          <div className="relative h-[500px] overflow-hidden my-16" style={{ perspective: "1500px" }} ref={carouselRef}>
            {/* Carousel Controls */}
            <div className="absolute inset-0 flex items-center justify-between z-40 pointer-events-none px-4">
              <button
                className="rounded-full bg-white shadow-lg p-3 pointer-events-auto hover:scale-110 transition-transform"
                onClick={prevSlide}
              >
                <FiChevronLeft className="h-6 w-6 text-gray-700" />
                <span className="sr-only">Previous</span>
              </button>
              <button
                className="rounded-full bg-white shadow-lg p-3 pointer-events-auto hover:scale-110 transition-transform"
                onClick={nextSlide}
              >
                <FiChevronRight className="h-6 w-6 text-gray-700" />
                <span className="sr-only">Next</span>
              </button>
            </div>

            {/* Carousel Items */}
            <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: "1000px" }}>
              {trainings.map((training, index) => {
                const position = getCardPosition(index);
                return (
                  <div
                    key={training.id}
                    className={`absolute w-full max-w-xl transition-all duration-700 ease-out transform ${getCardClasses(
                      position,
                      direction,
                    )} ${getEntranceAnimation(position, direction)}`}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="relative bg-white border pt-6 pb-8 rounded-xl shadow-md flex flex-col overflow-hidden h-[400px]">
                      <h3 className="mb-3 text-xl font-semibold text-gray-600 px-4">Coming Soon</h3>
                      <div className="flex flex-col h-full">
                        <div className="relative w-full h-64">
                          <img
                            className="w-full h-full object-cover"
                            src={training.picture || "/placeholder.svg"}
                            alt={training.title}
                          />
                          <p className="absolute top-0 bg-gray-300 text-gray-700 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">
                            Planned
                          </p>
                        </div>

                        <div className="w-full px-4 flex-grow flex flex-col">
                          <h1 className="text-gray-800 text-2xl font-bold mt-4">{training.title}</h1>
                          <p className="text-gray-600 text-md">{training.description}</p>
                          <div className="my-4 flex flex-col gap-2">
                            <div className="flex space-x-1 items-center">
                              <span className="text-xl text-gray-500">
                                <BiTimeFive />
                              </span>
                              <p>Duration: To be announced</p>
                            </div>
                            <div className="flex space-x-1 items-center">
                              <span className="text-xl text-gray-500">
                                <AiOutlineBook />
                              </span>
                              <p>
                                {training.phases} phase{training.phases !== 1 && "s"}
                              </p>
                            </div>
                            <div className="flex space-x-1 items-center">
                              <span className="text-xl text-gray-500">
                                <GoLocation />
                              </span>
                              <p>Location: {training.location}</p>
                            </div>
                          </div>
                          <div className="flex justify-start items-center mt-auto">
                            <div
                              className="bg-gray-300 text-gray-700 font-medium py-2 px-6 rounded-sm"
                              style={{ color: "#0369a1" }}
                            >
                              COMING SOON
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-40 flex-wrap px-4">
              {trainings.map((_, index) => (
                <button
                  key={index}
                  className={`h-3 rounded-full transition-all ${
                    index === activeIndex ? "bg-mainColor w-6" : "bg-gray-300 w-3"
                  }`}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true);
                      setDirection(index > activeIndex ? "next" : "prev");
                      setActiveIndex(index);
                      setTimeout(() => setIsAnimating(false), 700);
                    }
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
