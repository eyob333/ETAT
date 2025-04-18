// import React from 'react'

// const ComingSoon = () => {
//   return (
//     <div className='w-8/12 mx-auto my-2 flex items-center justify-center p-2 min-h-[50vh]'>
//       <p className='text-2xl font-bolder'>Coming Soon</p>
//     </div>
//   )
// }

// export default ComingSoon



// src/ComingSoon.jsx
import React from 'react';
import { motion } from 'framer-motion';

const ComingSoon = () => {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center text-white px-4 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-6xl font-extrabold mb-4"
      >
        🚀 Coming Soon
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-lg md:text-xl max-w-xl"
      >
        We're working hard to launch our new site. Stay tuned for something awesome.
      </motion.p>
    </div>
  );
};

export default ComingSoon;