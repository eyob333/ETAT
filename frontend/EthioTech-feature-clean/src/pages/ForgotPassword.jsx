/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-empty */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
// import { useState } from 'react';
// import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import logo from '../assets/image/ethiotech2.png';
import { useRequestChangeMutation } from '../redux/resetPassword/passwordApiSlice';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Please enter a valid email').required('Email is required'),
});

export default function ForgotPassword() {
  const [requestChange] = useRequestChangeMutation();
  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      console.log(values);
      const res = await requestChange(values).unwrap();
      toast.success('we have sent you an email to reset your password');
    } catch (error) {
      setSubmitting(false);
      setErrors(error);
      toast.error('something went wrong');
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 mt-16">
      <div className="mt-7 bg-white  rounded-xl shadow-lg">
        <div className="p-4 sm:p-7">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto h-20 w-auto" src={logo} alt="Your Company" />
          </div>

          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800">Forgot password?</h1>
            <p className="mt-2 text-sm text-gray-600 ">
              Remember your password?
              <Link className="text-blue-600 decoration-2 hover:underline font-medium" to="/signin">
                Sign Up here
              </Link>
            </p>
          </div>

          <div className="mt-5">
            <Formik
              initialValues={{
                email: '',
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting, setErrors }) => {
                onSubmit(values, { setSubmitting, setErrors });
              }}
            >
              <Form>
                <div className="grid gap-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold ml-1 mb-2">Email address</label>
                    <div className="relative">
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="email"
                        className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-400 focus:outline-none focus:ring shadow-sm"
                      />
                    </div>
                    <ErrorMessage name="email" component="div" className="text-red-500 flex items-end" />
                    {/* <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p> */}
                  </div>
                  <button type="submit" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all text-sm ">Reset password</button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
