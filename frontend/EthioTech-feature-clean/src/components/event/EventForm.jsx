/* eslint-disable radix */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../redux/store';
import { useEnrollEventMutation } from '../../redux/eventAttendee/eventAttendeeApiSlice';
import ButtonLoadingScreen from '../../conditions/ButtonLoadingScreen';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required'),
  email: Yup.string()
    .required('Email is required'),
  phone: Yup.number()
    .required('Phone is required'),
  // .max(15, 'max 15 characters'),

});

export default function EventForm() {
  const [enrollEvent, { isLoading }] = useEnrollEventMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      console.log(values);
      const res = await enrollEvent(values).unwrap();
      toast.success("You've have successfully registered for the event! You will receive a confirmation email shortly.");
      setSubmitting(false);
      navigate('/event');
    } catch (error) {
      setSubmitting(false);
      setErrors(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <section className=" py-1 bg-blueGray-50">
      <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-xl font-bold">
                Attend Event
              </h6>
              <Link to="/event" className="bg-mainColor text-white active:bg-lightMain font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button">
                Back
              </Link>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <Formik
              initialValues={{
                name: '',
                email: '',
                phone: '',
                event_id: parseInt(id),
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting, setErrors }) => {
                onSubmit(values, { setSubmitting, setErrors });
              }}
            >
              <Form>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Job Information
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-gray-500 text-xs font-bold mb-2" htmlFor="grid-password">
                        Full Name
                      </label>

                      <Field
                        type="text"
                        id="name"
                        name="name"
                        placeholder="name"
                        className="border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      />
                      <ErrorMessage name="name" component="div" className="text-red-500  flex items-start" />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-gray-500 text-xs font-bold mb-2" htmlFor="grid-password">
                        Email
                      </label>
                      <Field
                        type="text"
                        id="email"
                        name="email"
                        placeholder="email"
                        className="border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        // value="jesse@example.com"
                      />
                      <ErrorMessage name="email" component="div" className="text-red-500  flex items-start" />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-gray-500 text-xs font-bold mb-2" htmlFor="grid-password">
                        Phone Number
                      </label>

                      <Field
                        type="text"
                        id="phone"
                        name="phone"
                        placeholder="phone"
                        className="border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      />
                      <ErrorMessage name="phone" component="div" className="text-red-500  flex items-start" />
                    </div>
                  </div>

                </div>
                <button className="bg-mainColor mt-6 ml-5 flex gap-2 justify-center items-center text-white active:bg-lightMain font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="submit">
                  {isLoading ? <ButtonLoadingScreen /> : ''}
                  <span>Submit</span>
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
}
