import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { testimonialSelector } from '../../redux/store'; // Assuming you have a testimonialSelector in your store

// Function to sanitize HTML content, useful if 'testimony' field can contain HTML
const html = (value) => {
  const myHTML = value;
  const mySafeHTML = DOMPurify.sanitize(myHTML);
  return mySafeHTML;
};

function TestimonialDetail() {
  const { id } = useParams(); // Get the ID from the URL parameters
  const { testimonials } = useSelector(testimonialSelector); // Select testimonials from Redux store

  // Find the specific testimonial based on the ID from URL
  const filteredTestimonial = testimonials.find((testimonial) => testimonial.id === parseInt(id));

  // If testimonial is not found, display a message
  if (!filteredTestimonial) {
    return (
      <div className="flex flex-col items-center justify-center h-screen px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Testimonial Not Found</h1>
        <p className="text-gray-600 mb-6">The testimonial you are looking for does not exist or has been removed.</p>
        <Link
          to="/admin/testimonials"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Back to Testimonials
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col items-center justify-center w-full lg:w-3/5 md:w-4/5">

        <div className="flex mb-6 w-full justify-between items-center">
          {/* Link to go back to the testimonials list */}
          <Link
            to="/admin/testimonials"
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Back to Testimonials
          </Link>

          {/* Link to update the current testimonial */}
          <Link
            to={`/admin/updateTestimonial/${filteredTestimonial.id}`}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Update Testimonial
          </Link>
        </div>

        <div className="flex mb-6 w-full items-start">
          <div className="w-full text-center">
            {/* Display the testimonial giver's name */}
            <h1
              className="w-full text-gray-900 text-xl sm:text-2xl lg:text-3xl font-semibold break-words"
            >
              {filteredTestimonial.name}
            </h1>
          </div>
        </div>

        <div className="flex mb-6 w-full items-center justify-center">
          {/* Display the testimonial image */}
          <img
            className="w-full max-h-96 object-contain rounded-md shadow-md"
            src={filteredTestimonial.image}
            alt={filteredTestimonial.name}
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x300/000000/FFFFFF?text=No+Image'; }} // Fallback image
          />
        </div>

        <div className="flex mb-6 w-full items-start">
          <div className="w-full">
            {/* Display the testimonial content, sanitized to prevent XSS */}
            <div
              className="w-full py-1.5 text-gray-800 text-base lg:text-lg leading-relaxed prose prose-blue max-w-none" // Added prose classes for better typography
            >
              <div dangerouslySetInnerHTML={{ __html: html(`${filteredTestimonial.testimony}`) }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestimonialDetail;
