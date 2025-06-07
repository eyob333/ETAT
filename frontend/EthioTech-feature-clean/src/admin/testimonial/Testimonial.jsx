import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { toast } from 'react-toastify';
// Import testimonial-specific actions and selectors
import { fetchTestimonials, removeTestimonial } from '../../redux/testimonial/testimonialSlice'; // Adjust path if necessary
import { testimonialSelector } from '../../redux/store'; // Assuming you have a testimonialSelector in your store
import { useDeleteTestimonialMutation } from '../../redux/testimonial/testimonialApiSlice'; // Adjust path if necessary
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { MdReadMore } from 'react-icons/md';
import DOMPurify from 'dompurify'; // Used for sanitizing HTML if testimonial content can contain HTML
import LoadingScreen from '../../conditions/LoadingScreen';
import ButtonLoadingScreen from '../../conditions/ButtonLoadingScreen';

export default function Testimonials() {
  const dispatch = useDispatch();
  // Destructure the delete mutation for testimonials
  const [deleteTestimonial, { isLoading: loading }] = useDeleteTestimonialMutation();
  // Select testimonials data and loading state from the Redux store
  const { testimonials, isLoading } = useSelector(testimonialSelector); // Assuming testimonialSelector selects the testimonial slice
  const [searchInput, setSearchInput] = useState('');

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const [open, setOpen] = useState(null); // State to control modal open/close for deletion confirmation

  const handleOpenModal = (id) => {
    setOpen(id);
  };

  const handleCloseModal = () => {
    setOpen(null);
  };

  useEffect(() => {
    // Fetch testimonials only if the array is empty to avoid unnecessary fetches
    if (testimonials.length === 0) {
      dispatch(fetchTestimonials());
    }
  }, [dispatch, testimonials.length]);

  // Function to sanitize HTML content, useful if 'testimony' field can contain HTML
  const html = (value) => {
    const myHTML = value;
    const mySafeHTML = DOMPurify.sanitize(myHTML);
    return mySafeHTML;
  };

  // Handler for deleting a testimonial
  const handleDelete = async (id) => {
    try {
      console.log('Attempting to delete testimonial with ID:', id);
      const res = await deleteTestimonial(id).unwrap(); // Execute the delete mutation
      setOpen(null); // Close the modal
      if (res.message === 'Testimonial deleted successfully') { // Adjust message based on your backend response
        dispatch(removeTestimonial(id)); // Update Redux state
        toast.success('You have successfully deleted a testimonial');
      } else {
        toast.error('Failed to delete testimonial'); // Generic error for unexpected response
      }
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      if (error?.status === 400) { // Example error status
        toast.error('Testimonial cannot be deleted');
      } else if (error?.status === 403) {
        toast.error('Permission denied to delete testimonial');
      } else {
        toast.error('Something went wrong during deletion');
      }
    }
  };

  let content;
  let filteredTestimonials;

  if (isLoading) {
    // Show loading screen while data is being fetched
    content = <LoadingScreen />;
  } else if (!isLoading && testimonials.length > 0) {
    // Filter testimonials based on search input (by name)
    filteredTestimonials = testimonials.filter((testimonial) =>
      testimonial.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    content = (
      <section className="lg:pt-[30px] pb-12 pt-6 lg:pb-[0px]">
        <div className="container">
          <div className="flex flex-wrap px-6 pb-6 gap-6 md:gap-0 -mx-2">
            {filteredTestimonials.length === 0 ? (
              <h1 className="text-2xl text-center w-full">No Testimonials Found</h1>
            ) : (
              filteredTestimonials.map((item) => (
                <div className="w-full md:w-1/2 md:mt-4 lg:w-1/3 h-72 px-4" key={item.id}>
                  <div
                    className="
                      p-4
                      h-64
                      md:px-7
                      xl:px-10
                      bg-white
                      shadow-md
                      border
                      hover:shadow-lg
                      transition duration-300 ease-in-out
                      flex
                      flex-col
                      justify-center
                      relative
                      rounded-md
                    "
                  >
                    <div className="absolute top-2 right-2 text-lg" type="button">
                      <div className="flex gap-2">
                        {/* Link to view testimonial details */}
                        <Link className="text-green-500 text-xl" to={`/admin/testimonialDetail/${item.id}`} title="View Details">
                          <MdReadMore />
                        </Link>
                        {/* Link to edit testimonial */}
                        <Link className="text-blue-500 text-xl" to={`/admin/updateTestimonial/${item.id}`} title="Edit Testimonial">
                          <AiFillEdit />
                        </Link>
                        {/* Button to trigger testimonial deletion modal */}
                        <button className="text-red-600 text-xl" type="button" onClick={() => handleOpenModal(item.id)} title="Delete Testimonial">
                          <AiFillDelete />
                        </button>
                        {/* Modal for delete confirmation */}
                        <Modal open={open === item.id} onClose={handleCloseModal} center>
                          <div className="flex flex-col gap-3 p-5">
                            <h2 className="text-lg font-semibold">Are you sure you want to delete this testimonial?</h2>
                            <p className="text-gray-700">
                              Testimonial by: <span className="font-medium">{item.name}</span>
                            </p>
                            <div className="flex gap-3 mt-4 justify-end items-center">
                              <button
                                className="bg-red-500 flex gap-2 justify-center items-center text-white px-5 py-2 rounded-md hover:bg-red-600 transition duration-300"
                                onClick={() => handleDelete(open)}
                                type="button"
                                disabled={loading} // Disable button while loading
                              >
                                {loading ? <ButtonLoadingScreen /> : ''}
                                <span>Delete</span>
                              </button>
                              <button
                                className="bg-gray-300 text-gray-800 px-5 py-2 rounded-md hover:bg-gray-400 transition duration-300"
                                onClick={handleCloseModal}
                                type="button"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </Modal>
                      </div>
                    </div>
                    {/* Testimonial Card Content */}
                    <div className="group rounded w-full px-1 py-4 lg:p-0">
                      <div className="p-4 pl-0">
                        <div className="mb-2">
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-full mx-auto mb-2"
                              // onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150x150/000000/FFFFFF?text=No+Image'; }} // Fallback image
                            />
                          )}
                          <h2 className="font-semibold text-xl text-gray-800 group-hover:text-blue-600 break-words line-clamp-1 text-center">
                            {item.name}
                          </h2>
                        </div>
                        <div className="text-gray-700 mt-2 line-clamp-3 break-words text-sm" dangerouslySetInnerHTML={{ __html: html(`${item.testimony}`) }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    );
  } else {
    // Case when no testimonials are found after loading
    content = (
      <div className="text-center py-10">
        <h1 className="text-2xl text-gray-700">No testimonials available. Add a new one!</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-auto overflow-x-hidden py-10">
      <div className="flex justify-between items-center px-8 mb-6">
        <div>
          <div className="mt-1 relative lg:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              name="searchTestimonials"
              id="topbar-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 px-2.5 py-2"
              placeholder="Search testimonials by name"
              value={searchInput}
              onChange={handleSearchInput}
            />
          </div>
        </div>
        {/* Link to add a new testimonial */}
        <Link to="/admin/addTestimonial" className="px-6 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition duration-300">
          Add New Testimonial
        </Link>
      </div>
      <div>
        {content}
      </div>
    </div>
  );
}
