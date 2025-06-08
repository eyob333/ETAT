import React, { useState } from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // useSelector for admin user might not be directly needed if ID is handled differently
import { toast } from 'react-toastify';
// Import testimonial-specific mutation and action
import { useCreateTestimonialMutation } from '../../redux/testimonial/testimonialApiSlice'; // Adjust path if necessary
import { addTestimonial } from '../../redux/testimonial/testimonialSlice'; // Adjust path if necessary
import ButtonLoadingScreen from '../../conditions/ButtonLoadingScreen';

// Validation schema for the testimonial form
const validationSchema = Yup.object().shape({
  name: Yup.string() // Changed from newsTitle to name
    .min(3, 'Name must be at least 3 characters')
    .max(100, 'Name must not exceed 100 characters')
    .required('Name is required'),
  // Removed newsAuthor and newsSource as per testimonial model
});

export default function TestimonialForm() {
  const navigate = useNavigate();
  // If user ID (e.g., admin ID) is needed for testimonial creation,
  // ensure it's accessed securely. For now, assuming backend handles association.
  // const { admin } = useSelector(userSelector); // Uncomment if needed and ensure path/selector is correct

  const dispatch = useDispatch();
  // Destructure the create mutation for testimonials
  const [createTestimonial, { isLoading }] = useCreateTestimonialMutation();
  const [file, setFile] = useState(null); // State for the image file
  const [testimonyContent, setTestimonyContent] = useState(''); // State for the rich text content
  const [contentError, setContentError] = useState(''); // State for validation errors on content

  const handleFileChanges = (e) => {
    // Only set the file if one is selected
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };

  const handleEditorChange = (value) => {
    setTestimonyContent(value);
    // Basic validation for rich text content
    if (value === '<p><br></p>' || value.trim() === '') {
      setContentError('Please enter testimonial content');
    } else {
      setContentError('');
    }
  };

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    const formData = new FormData();
    // Append image file if selected
    if (file) {
      formData.append('image', file);
    }
    // Append other form data
    formData.append('name', values.name); // Changed from title to name
    formData.append('testimony', testimonyContent); // Changed from body to testimony

    // Additional validation for image and content before API call
    if (!file) {
      toast.error('Please select an image for the testimonial');
      setSubmitting(false);
      return; // Stop submission
    }
    if (testimonyContent === '<p><br></p>' || testimonyContent.trim() === '') {
      toast.error('Please insert testimonial content');
      setSubmitting(false);
      return; // Stop submission
    }

    try {
      console.log("Preparing to create testimonial with FormData:");
      for (let [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
      }

      const res = await createTestimonial(formData).unwrap(); // Execute the create mutation
      console.log("Testimonial creation response:", res);
      dispatch(addTestimonial(res.data)); // Dispatch action to add the new testimonial to Redux state. Assuming res.data contains the new testimonial object
      setSubmitting(false);
      toast.success("You've successfully added a testimonial");
      navigate('/admin/testimonials'); // Navigate back to the testimonials list page
    } catch (error) {
      setSubmitting(false);
      setErrors(error); // Set form-level errors if any
      console.error('Error creating testimonial:', error);
      if (error?.status === 500 && error?.data?.error) {
        toast.error(error.data.error);
      } else if (error?.data?.message) { // Handle backend validation errors or custom messages
        toast.error(error.data.message);
      }
      else {
        toast.error('Something went wrong while adding the testimonial');
      }
    }
  };

  // ReactQuill modules and formats
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
          <h1 className="block text-3xl font-bold text-gray-800 w-5/6">Add Testimonial</h1>
        </div>

        <Formik
          initialValues={{
            name: '', // Initial value for testimonial name
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
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

            {/* Image Upload Field */}
            <div className="flex flex-col md:flex-row mb-6 w-full items-start md:items-center">
              <label htmlFor="image" className="text-sm font-medium leading-6 text-gray-900 md:w-24 mt-2 md:mt-0 flex items-start md:justify-start">
                Image*
              </label>
              <div className="w-full md:w-4/5 mt-1 md:mt-0">
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
                disabled={isLoading} // Disable button while loading
              >
                {isLoading ? <ButtonLoadingScreen /> : ''}
                <span>{isLoading ? 'Adding...' : 'Add Testimonial'}</span>
              </button>
            </div>
          </Form>
        </Formik>
      </center>
    </div>
  );
}
