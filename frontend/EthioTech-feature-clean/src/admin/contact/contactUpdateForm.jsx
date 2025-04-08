/* eslint-disable max-len */
/* eslint-disable dot-notation */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateContactDataMutation } from '../../redux/contact/contactApiSlice';
import { contactSelector, userSelector } from '../../redux/store';
import { fetchContact } from '../../redux/contact/contactSlice';
import ButtonLoadingScreen from '../../conditions/ButtonLoadingScreen';

const validationSchema = Yup.object().shape({
  contactMapLocation: Yup.string()
    .min(20, 'Map Location Link must be at least 20 characters')
    .max(300, 'Map Location Link must not exceed 300 characters')
    .required('Map Location Link is required'),
  contactAddress: Yup.string()
    .min(5, 'Address must be at least 5 characters')
    .max(100, 'Address must not exceed 100 characters')
    .required('Address is required'),
  contactEmail: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  contactPhone: Yup.string()
    .matches(/^\+?[0-9]{10,20}$/, 'Please enter a valid phone number')
    .required('Phone number is required'),
});

export default function ContactUpdateForm() {
  const navigate = useNavigate();
  const [updateContactData, { isLoading: loading }] = useUpdateContactDataMutation();
  const dispatch = useDispatch();
  const { contacts, isLoading } = useSelector(contactSelector);
  // const [searchInput, setSearchInput] = useState('');

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    console.log(`${values.contactAddress}dd`);

    try {
      console.log(`${values.contactEmail}rrrrrrrrt`);
      const res = await updateContactData({
        email: values.contactEmail, map_location: values.contactMapLocation, phone: values.contactPhone, address: values.contactAddress,
      }).unwrap();
      const { contact } = res;
      console.log(`${res.contact.email}dhhhhhhhhhhhhhhhhhh`);
      dispatch(fetchContact(res.contact));
      setSubmitting(false);
      toast.success("You've successfully updated contact information");
      navigate('/admin/contact');
    } catch (error) {
      setSubmitting(false);
      setErrors(error);
      if (error.status === 500) {
        toast.error(error.data.error);
      } else {
        toast.error('Something went wrong');
      }
    }
  };

  useEffect(() => {
    dispatch(fetchContact());
  }, [dispatch, contacts.length]);

  let content;
  let filteredContact;
  if (isLoading) {
    content = <div>loading.....</div>;
  } else if (!isLoading) {
    content = (
      <div className="px-4 lg:pt-6  rounded-lg md:p-8 lg:mt-2  mt-5 lg:w-3/4 lg:mx-6 items-center ">

        <Formik
          initialValues={{
            contactPhone: contacts.phone,
            contactEmail: contacts.email,
            contactAddress: contacts.address,
            contactMapLocation: contacts.map_location,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            onSubmit(values, { setSubmitting, setErrors });
          }}
        >
          <Form>

            <div className="-mx-2 md:items-center md:flex mt-4 flex items-start justify-start  mb-5">

              <div className="flex-1 px-2 max-h-20 flex flex-col items-start justify-start">
                <label className="block mb-2 text-sm text-gray-600 ">Email Address*</label>
                <Field
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  placeholder="johndoe@example.com"
                  className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                <ErrorMessage name="contactEmail" component="div" className="text-red-500  flex items-start" />

              </div>

              <div className="flex-1 px-2 md:mt-0  max-h-20 flex flex-col items-start justify-start">
                <label className="block mb-2 text-sm text-gray-600 ">Phone</label>
                <Field
                  type="tel"
                  id="contactPhone"
                  name="contactPhone"
                  placeholder="+2519101010"
                  className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                <ErrorMessage name="contactPhone" component="div" className="text-red-500  flex items-start" />

              </div>
            </div>
            <div className=" flex flex-col items-start justify-start mt-10">

              <label className="block text-sm text-gray-600 ">Address*</label>
              <Field
                type="text"
                id="contactAddress"
                name="contactAddress"
                placeholder="example: 100 Smith Street Collingwood VIC 3066 AU "
                className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
              <ErrorMessage name="contactAddress" component="div" className="text-red-500  flex items-start" />

            </div>
            <div className=" flex flex-col items-start justify-start mt-5">

              <label className="block text-sm text-gray-600 ">Map Link*</label>
              <Field
                type="text"
                id="contactMapLocation"
                name="contactMapLocation"
                placeholder="example: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3668.4132835618157!2d38.79837940094183!3d8.989363586319747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b84e74f6bd87b%3A0x34743e9c6fecf60c!2sBole%20Community%20Elementary%20School!5e0!3m2!1sen!2set!4v1696364493063!5m2!1sen!2set"
                className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
              <ErrorMessage name="contactMapLocation" component="div" className="text-red-500  flex items-start" />

            </div>

            <button type="submit" className="w-full px-6 flex gap-2 justify-center items-center py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
              {loading ? <ButtonLoadingScreen /> : ''}
              <span>Update contact</span>
            </button>
          </Form>
        </Formik>
      </div>
    );
    console.log(contacts);
  }

  return (
    <div className="">
      <center className="">
        <div className="flex mb-2 w-full justify-start pt-10 px-8 lg:w-3/4 lg:mx-6 items-center">
          <Link
            to="/admin/contact"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            back
          </Link>
        </div>
        <div className="text-center  px-8  w-full py-2 flex items-center justify-center">
          <h1 className="block text-3xl font-bold text-gray-800 w-5/6">Update Contact</h1>
        </div>
        {content}
      </center>
    </div>
  );
}
