/* eslint-disable max-len */
/* eslint-disable dot-notation */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'b  //';
import * as Yup from 'yup';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContact } from '../../redux/contact/contactSlice';
import { contactSelector } from '../../redux/store';
import { useGetContactQuery } from '../../redux/contact/contactApiSlice';
import LoadingScreen from '../../conditions/LoadingScreen';

export default function Contactorm() {
  const dispatch = useDispatch();
  const { contacts, isLoading } = useSelector(contactSelector);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    if (contacts.length === 0) {
      dispatch(fetchContact());
    }
  }, [dispatch, contacts.length]);

  let content;
  let filteredContact;
  if (isLoading) {
    content = <LoadingScreen />;
  } else if (!isLoading) {
    content = (
      <div className="px-4 lg:pt-0  rounded-lg md:p-8 lg:mt-2 mt-5 lg:w-3/4 lg:mx-6 items-center ">

        <Formik
          initialValues={{
            contactPhone: contacts.phone,
            contactEmail: contacts.email,
            contactAddress: contacts.address,
            contactMapLocation: contacts.map_location,
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
                  disabled
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
                  disabled
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
                disabled
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
                disabled
                className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
              <ErrorMessage name="contactMapLocation" component="div" className="text-red-500  flex items-start" />

            </div>
          </Form>
        </Formik>
      </div>
    );
    console.log(contacts);
  }

  return (
    <div className="">
      <center className="">
        <div className="flex mb-2 w-full justify-end pt-10 px-8 lg:w-3/4 lg:mx-6 items-center">
          <Link
            to="/admin/updateContact"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Update
          </Link>
        </div>
        <div className="text-center  px-8  lg:w-3/4 lg:mx-6 py-2 flex items-center justify-center">
          <h1 className="block text-3xl font-bold text-gray-800 w-5/6">Company Contact Information</h1>
        </div>
        {content}
      </center>
    </div>
  );
}
