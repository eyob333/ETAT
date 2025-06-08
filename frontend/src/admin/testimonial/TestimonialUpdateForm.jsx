import React, { useEffect, useState } from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
// Import testimonial-specific selectors and API hooks
import { testimonialSelector } from '../../redux/store'; // Adjust path if necessary
import { useUpdateTestimonialDataMutation } from '../../redux/testimonial/testimonialApiSlice'; // Adjust path if necessary
import { fetchTestimonials, updateTestimonialState } from '../../redux/testimonial/testimonialSlice'; // Adjust path if necessary
import LoadingScreen from '../../conditions/LoadingScreen';
import ButtonLoadingScreen from '../../conditions/ButtonLoadingScreen';

// Validation schema for the testimonial update form
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .max(100, 'Name must not exceed 100 characters')
    .required('Name is required'),
  // Removed author/source fields as per testimonial model
});

function TestimonialUpdateForm() {
  const navigate = useNavigate();
  // Destructure the update mutation for testimonials
  const [updateTestimonial, { isLoading: loading }] = useUpdateTestimonialDataMutation();
  const dispatch = useDispatch();
  const [file, setFile] = useState(null); // State for the selected image file
  const { id } = useParams(); // Get the testimonial ID from the URL parameters
  const { testimonials, isLoading } = useSelector(testimonialSelector); // Select testimonials from Redux store

  // Find the specific testimonial to be updated
  const filteredTestimonial = testimonials.find((testimonial) => testimonial.id === parseInt(id));

  // State for the rich text content (initialized from existing testimonial or empty)
  const [testimonyContent, setTestimonyContent] = useState('');
  const [contentError, setContentError] = useState(''); // State for validation errors on content

  // Effect to initialize content state when filteredTestimonial is available
  useEffect(() => {
    if (filteredTestimonial && filteredTestimonial.testimony && testimonyContent === '') {
      setTestimonyContent(filteredTestimonial.testimony);
    }
  }, [filteredTestimonial, testimonyContent]);

  // Effect to fetch testimonials if not already in Redux store
  useEffect(() => {
    if (testimonials.length === 0) {
      dispatch(fetchTestimonials());
    }
  }, [dispatch, testimonials.length]);

  const handleFileChanges = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    } else {
      setFile(null); // Clear file if nothing selected
    }
  };

  const handleEditorChange = (value) => {
    setTestimonyContent(value);
    if (value === '<p><br></p>' || value.trim() === '') {
      setContentError('Please enter testimonial content');
    } else {
      setContentError('');
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link'],
      [{ align: [] }, { color: [] }, { background: [] }],
      ['clean'],
    ],
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent', 'link', 'align', 'color', 'background',
  ];

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    const formData = new FormData();

    // Only append image if a new one is selected
    if (file) {
      formData.append('image', file);
    }
    formData.append('name', values.name); // Append name
    formData.append('testimony', testimonyContent); // Append updated testimony content
    formData.append('id', filteredTestimonial.id); // Append ID for backend identification

    if (testimonyContent === '<p><br></p>' || testimonyContent.trim() === '') {
      toast.error('Please insert testimonial content');
      setSubmitting(false);
      return;
    }

    try {
      console.log("Preparing to update testimonial with FormData:");
      for (let [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
      }

      const res = await updateTestimonial(formData).unwrap(); // Execute the update mutation
      console.log("Testimonial update response:", res);
      // Assuming backend returns the updated testimonial object in res.data
      dispatch(updateTestimonialState(res.data));
      setSubmitting(false);
      toast.success('Testimonial Updated Successfully');
      navigate('/admin/testimonials'); // Navigate back to the testimonials list
    } catch (error) {
      setSubmitting(false);
      setErrors(error);
      console.error('Error updating testimonial:', error);
      if (error?.status === 500 && error?.data?.error) {
        toast.error(error.data.error);
      } else if (error?.data?.message) {
        toast.error(error.data.message);
      } else {
        toast.error('Something went wrong while updating the testimonial');
      }
    }
  };

  // Display loading screen if data is being fetched or testimonial not found yet
  if (isLoading || !filteredTestimonial) {
    return <LoadingScreen />;
  }

  return (
    <div className="p-4">
      <center className="w-full">
        <div className="flex mb-6 w-full justify-start pt-10 px-8 items-center">
          <Link
            to="/admin/testimonials" // Link back to the testimonials list
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Back to Testimonials
          </Link>
        </div>
        <div className="text-center px-8 w-full">
          <h1 className="block text-3xl font-bold text-gray-800 w-5/6">Update Testimonial</h1>
        </div>
        <Formik
          initialValues={{
            name: filteredTestimonial.name, // Pre-fill with current name
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize // Important for updating initialValues when data changes
        >
          <Form className="flex flex-col items-start px-8 py-10 w-full md:w-5/6 lg:w-3/4 xl:w-2/3 mx-auto">
            {/* Testimonial Name Field */}
            <div className="flex flex-col md:flex-row mb-6 w-full items-start md:items-center">
              <label htmlFor="name" className="text-sm font-medium leading-6 text-gray-900 md:w-24 mt-2 md:mt-0 flex items-start md:justify-start">
                Name*
              </label>
              <div className="w-full md:w-4/5 mt-1 md:mt-0">
                <Field
                  id="name"
                  name="name"
                  placeholder="Testimonial Giver's Name"
                  className="w-full rounded-md border-2 py-2 px-3 border-gray-300 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm sm:leading-6"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1 flex items-start" />
              </div>
            </div>

            {/* Current Image & Image Upload Field */}
            <div className="flex flex-col md:flex-row mb-6 w-full items-start md:items-center">
              <label htmlFor="image" className="text-sm font-medium leading-6 text-gray-900 md:w-24 mt-2 md:mt-0 flex items-start md:justify-start">
                Image
              </label>
              <div className="w-full md:w-4/5 mt-1 md:mt-0 flex flex-col sm:flex-row items-center sm:space-x-4">
                {filteredTestimonial.image && (
                  <div className="mb-4 sm:mb-0">
                    <img
                      src={filteredTestimonial.image}
                      alt="Current Testimonial"
                      className="w-24 h-24 object-cover rounded-md shadow-sm border border-gray-200"
                      onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/100x100/E0E0E0/888888?text=No+Image'; }}
                    />
                  </div>
                )}
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept=".jpg, .png, .jpeg"
                  className="py-2.5 px-3 border border-gray-300 rounded-md w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  onChange={handleFileChanges}
                />
              </div>
            </div>

            {/* Testimonial Content (ReactQuill) Field */}
            <div className="flex flex-col md:flex-row mb-6 w-full items-start">
              <label htmlFor="testimonyContent" className="text-sm font-medium leading-6 text-gray-900 md:w-24 mt-2 md:mt-0 flex items-start md:justify-start">
                Testimony*
              </label>
              <div className="flex flex-col items-start justify-start w-full md:w-4/5">
                <div className="w-full mb-32"> {/* Increased bottom margin for Quill editor */}
                  <ReactQuill
                    style={{
                      height: '250px', // Adjusted height for better fit
                      marginBottom: '10px',
                      float: 'left',
                      width: '100%',
                      border: '1px solid #e2e8f0', // Tailwind-like border
                      borderRadius: '0.375rem' // Tailwind-like rounded corners
                    }}
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    value={testimonyContent}
                    onChange={handleEditorChange}
                    required
                  />
                </div>
                {contentError && <div className="text-red-500 text-sm mt-1 flex items-start">{contentError}</div>}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex mt-8 w-full items-center justify-center">
              <button
                type="submit"
                className="bg-blue-500 flex gap-2 justify-center items-center hover:bg-blue-600 text-white font-bold py-2.5 px-6 rounded-md transition duration-300"
                disabled={loading} // Disable button while loading
              >
                {loading ? <ButtonLoadingScreen /> : ''}
                <span>{loading ? 'Updating...' : 'Update Testimonial'}</span>
              </button>
            </div>
          </Form>
        </Formik>
      </center>
    </div>
  );
}

export default TestimonialUpdateForm;
