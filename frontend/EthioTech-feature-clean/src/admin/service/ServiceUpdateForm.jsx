/* eslint-disable radix */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { serviceSelector } from '../../redux/store';
import { useUpdateServiceDataMutation } from '../../redux/service/serviceApiSlice';
import { fetchService, updateServiceState } from '../../redux/service/serviceSlice';
import LoadingScreen from '../../conditions/LoadingScreen';
import ButtonLoadingScreen from '../../conditions/ButtonLoadingScreen';

const validationSchema = Yup.object().shape({
  serviceTitle: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title must not exceed 20 characters')
    .required('Title is required'),
  serviceDescription: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must not exceed 500 characters')
    .required('Description is required'),
});

function ServiceUpdateForm() {
  const navigate = useNavigate();
  const [updateService, { isLoading: loading }] = useUpdateServiceDataMutation();
  const dispatch = useDispatch();
  const [file, setFile] = useState('');
  const { id } = useParams();
  const { services, isLoading } = useSelector(serviceSelector);
  let filteredService;

  const handleFileChanges = (e) => {
    setFile(e.target.files[0]);
    console.log(file);
  };

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', values.serviceTitle);
    formData.append('body', values.serviceDescription);
    formData.append('id', filteredService[0].id);

    try {
      const res = await updateService(formData).unwrap();
      console.log(res);
      dispatch(updateServiceState(res.service));
      setSubmitting(false);
      toast.success('Service Updated Successfully');
      navigate('/admin/services');
    } catch (error) {
      setSubmitting(false);
      setErrors(error);
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    if (services.length === 0) {
      dispatch(fetchService());
    }
  }, [dispatch, services.length]);

  let content;
  if (isLoading) {
    content = <LoadingScreen />;
  } else if (!isLoading && services.length > 0) {
    filteredService = services.filter((service) => service.id === parseInt(id));
    content = (
      <div className="">
        <center>
          <div className="flex mb-6 w-full justify-start pt-10 px-8 items-center">
            <Link
              to="/admin/services"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              back
            </Link>
          </div>
          <div className="text-center  px-8  w-full">
            <h1 className="block text-3xl font-bold text-gray-800 w-5/6">Update Service</h1>
          </div>
          <Formik
            initialValues={{
              serviceTitle: filteredService[0].title,
              serviceDescription: filteredService[0].body,
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              onSubmit(values, { setSubmitting, setErrors });
            }}
          >
            <Form className="flex flex-col items-start px-8 py-10 w-full">
              <div className="flex mb-6 w-5/6 items-start">
                <label htmlFor="serviceTitle" className="text-sm font-medium leading-6 text-gray-900 w-24 mt-2 flex items-start">
                  Title*
                </label>
                <div className="w-4/5">
                  <Field
                    id="serviceTitle"
                    name="serviceTitle"
                    placeholder="Title"
                    className="w-full rounded-md border-2 py-1.5 border-grey-200 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring px-2 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage name="serviceTitle" component="div" className="text-red-500  flex items-start" />

                </div>
              </div>

              <div className="flex mb-6 w-5/6 items-start">
                <label htmlFor="serviceDescription" className="text-sm font-medium leading-6 text-gray-900 w-24 mt-2 flex items-start">
                  Description*
                </label>
                <div className="w-4/5">
                  <Field
                    as="textarea"
                    rows={5}
                    id="serviceDescription"
                    name="serviceDescription"
                    placeholder="Description"
                    className="w-full rounded-md border-2 py-1.5 border-grey-200 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring px-2 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage name="serviceDescription" component="div" className="text-red-500  flex items-start" />
                </div>
              </div>

              <div className="flex mb-6 w-5/6 items-start">
                <label htmlFor="serviceImage" className="text-sm font-medium leading-6 text-gray-900 w-24 mt-2 flex items-start">
                  Image
                </label>
                <input
                  id="serviceImage"
                  name="serviceImage"
                  placeholder="Description"
                  type="file"
                  accept=".jpg, .png, .jpeg"
                  className="py-1.5"
                  onChange={handleFileChanges}
                />
              </div>

              <div className="flex mb-6 w-5/6 items-center justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 flex gap-2 justify-center items-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  {loading ? <ButtonLoadingScreen /> : ''}
                  <span>Update Service</span>

                </button>
              </div>
            </Form>
          </Formik>
        </center>
      </div>
    );
  }
  return (
    <>
      {content}
    </>
  );
}
export default ServiceUpdateForm;
