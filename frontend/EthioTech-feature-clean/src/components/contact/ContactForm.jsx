/* eslint-disable no-empty */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useState } from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCreateContactUSMutation } from '../../redux/contact/contactApiSlice';
import ButtonLoadingScreen from '../../conditions/ButtonLoadingScreen';

const validationSchema = Yup.object().shape({
  contactName: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .max(30, 'Name must not exceed 30 characters')
    .required('Name is required'),
  contactMessage: Yup.string()
    .min(10, 'Message must be at least 10 characters')
    .max(400, 'Message must not exceed 400 characters')
    .required('Message is required'),
  contactEmail: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  contactPhone: Yup.string()
    .min(10, 'Please enter a valid phone number')
    .max(20, 'Please enter a valid phone number'),
  subject: Yup.string()
    .required('Subject is required'),
});
const subjects = [
  { value: 'request', label: 'Make A Request' },
  { value: 'question', label: 'Ask A Question' },
  { value: 'feedback', label: 'Give Feedback' },
];
export default function ContactForm() {
  const navigate = useNavigate();
  const [createContactUs, { isLoading }] = useCreateContactUSMutation();

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    const formData = new FormData();
    formData.append('name', values.contactName);
    formData.append('message', values.contactMessage);
    formData.append('email', values.contactEmail);
    formData.append('phone', values.contactPhone);
    formData.append('subject', values.subject);

    try {
      const res = await createContactUs({
        email: values.contactEmail,
        phone: values.contactPhone,
        message: values.contactMessage,
        subject: values.subject,
        name: values.contactName,
      }).unwrap();
      setSubmitting(false);
      toast.success('Thank you for your message! We have received it and will respond to you as quickly as possible.', {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        // css: {
        //   top: '50%',
        //   left: '50%',
        //   transform: 'translate(-50%, -50%)',
        // },
      });
    } catch (error) {
      setSubmitting(false);
      setErrors(error);
    }
  };

  return (
    <div className="p-4 py-6 rounded-lg bg-white md:p-8 mt-8 lg:w-3/4 lg:mx-6">
      <h1 className="text-xl text-gray-600  mb-5 font-bold font-poppins">
        Send Us A Message
      </h1>
      <Formik
        initialValues={{
          contactName: '',
          contactMessage: '',
          contactEmail: '',
          contactPhone: '',
          subject: '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          onSubmit(values, { setSubmitting, setErrors });
        }}
      >
        <Form>
          <div className="">
            <label htmlFor="contactName" className="block mb-2 text-sm text-gray-600 ">First Name*</label>
            <Field
              id="contactName"
              name="contactName"
              placeholder="John"
              className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            <ErrorMessage name="contactName" component="div" className="text-red-500  flex items-start" />

          </div>

          <div className="-mx-2 md:items-center md:flex mt-4">

            <div className="flex-1 px-2 max-h-20">
              <label htmlFor="contactEmail" className="block mb-2 text-sm text-gray-600">Email address*</label>
              <Field
                type="email"
                id="contactEmail"
                name="contactEmail"
                placeholder="johndoe@example.com"
                className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
              <ErrorMessage name="contactEmail" component="div" className="text-red-500  flex items-start" />

            </div>

            <div className="flex-1 px-2 mt-4 md:mt-0  max-h-20">
              <label className="block mb-2 text-sm text-gray-600 ">Phone</label>
              <Field
                type="tel"
                id="contactPhone"
                name="contactPhone"
                placeholder="+251 9 10 10 10"
                className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
              <ErrorMessage name="contactPhone" component="h1" className="invisible" />
            </div>
          </div>

          <div className="w-full mt-5">
            <label htmlFor="subject" className="block mb-2 text-sm text-gray-600 ">Subject*</label>
            <Field
              as="select"
              id="subject"
              name="subject"
              className="py-1.5 px-1 border-2 border-grey-200 bg-white rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 flex justify-start w-48 text-gray-500"
            >
              <option value="">Select...</option>
              {subjects.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </Field>
            <ErrorMessage name="subject" component="div" className="text-red-500  flex items-start" />
          </div>

          <div className="w-full mt-4">
            <label className="block mb-2 text-sm text-gray-600 ">Message*</label>
            <Field
              id="contactMessage"
              name="contactMessage"
              className="block w-full h-32 px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg md:h-56 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            <ErrorMessage name="contactMessage" component="div" className="text-red-500  flex items-start" />

          </div>

          <button
            type="submit"
            className="w-full px-6 flex gap-2 justify-center items-center py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
          >
            {isLoading ? <ButtonLoadingScreen /> : ''}
            <span>Send message</span>

          </button>
        </Form>
      </Formik>
    </div>
  );
}
