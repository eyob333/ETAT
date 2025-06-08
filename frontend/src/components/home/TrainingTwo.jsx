"use client";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const comingSoonTrainingsWithImages = [
  {
    id: "training-1",
    title: "Programming",
    imageUrl: "https://res.cloudinary.com/deqp41wyr/image/upload/v1747508678/programming_jbs1js.jpg",
  },
  {
    id: "training-2",
    title: "Data Science",
    imageUrl: "https://res.cloudinary.com/deqp41wyr/image/upload/v1747508755/Data_Science_trjhs7.jpg",
  },
  {
    id: "training-3",
    title: "AI",
    imageUrl: "https://res.cloudinary.com/deqp41wyr/image/upload/v1747508665/AI_vqy08i.jpg",
  },
  {
    id: "training-4",
    title: "Robotics & Autonomous",
    imageUrl: "https://res.cloudinary.com/deqp41wyr/image/upload/v1747508987/Robotics_ulj2gk.jpg",
  },
  {
    id: "training-5",
    title: "CISSP",
    imageUrl: "https://res.cloudinary.com/deqp41wyr/image/upload/v1747508755/Data_Science_trjhs7.jpg",
  },
  {
    id: "training-6",
    title: "CISA",
    imageUrl: "https://res.cloudinary.com/deqp41wyr/image/upload/v1745869226/two_ezrhm6.jpg",
  },
  {
    id: "training-7",
    title: "CISM",
    imageUrl: "https://res.cloudinary.com/deqp41wyr/image/upload/v1745869217/three_mh3esy.jpg",
  },
  {
    id: "training-8",
    title: "PMP",
    imageUrl: "https://res.cloudinary.com/deqp41wyr/image/upload/v1745869230/four_mgcnah.jpg",
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Reduced stagger time for smoother appearance
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "tween", // Using tween instead of spring for more predictable motion
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// Hover animation - more subtle and performant
const hoverVariants = {
  rest: {
    scale: 1,
    boxShadow: "0px 0px 0px rgba(0,0,0,0.1)",
    transition: {
      type: "tween",
      ease: "easeInOut",
      duration: 0.3,
    },
  },
  hover: {
    scale: 1.05,
    boxShadow: "0px 10px 20px rgba(0,0,0,0.15)",
    transition: {
      type: "tween",
      ease: "easeInOut",
      duration: 0.3,
    },
  },
};

export default function TrainingTwo() {
  return (
    <div className="bg-white dark:bg-gray-900 py-12 overflow-hidden">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-12">
          Our Upcoming Trainings
        </h1>

        {/* Horizontal layout using flex */}
        <motion.div
          className="flex flex-row overflow-x-auto gap-8 py-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          aria-label="Upcoming training courses"
        >
          {comingSoonTrainingsWithImages.map((item) => (
            <motion.div
              key={item.id}
              className="flex-shrink-0 w-64 sm:w-80 md:w-96 flex flex-col items-center text-center"
              variants={itemVariants}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <motion.div
                initial="rest"
                whileHover="hover"
                animate="rest"
                variants={hoverVariants}
                className="relative rounded-lg overflow-hidden w-full aspect-video"
              >
                {/* Preload image with fixed aspect ratio */}
                <div className="w-full h-0 pb-[56.25%] relative bg-gray-200">
                  <motion.img
                    src={item.imageUrl}
                    alt={`${item.title} training course`}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="absolute top-0 left-0 bg-gray-300 text-gray-700 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg text-sm">
                  Planned
                </div>
              </motion.div>

              <motion.h2
                className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200"
                variants={{
                  hover: { y: -2 },
                  rest: { y: 0 },
                }}
              >
                {item.title}
              </motion.h2>

              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                Coming Soon
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Link
            to="/trainings"
            className="bg-mainColor hover:bg-secondColor text-white font-semibold py-3 px-8 rounded-md shadow-lg transition duration-300 ease-in-out text-sm inline-block"
            aria-label="View all available training courses"
          >
            View All Trainings
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
