/* eslint-disable max-len */
/* eslint-disable no-empty */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
// import { useState } from 'react';
// import { toast } from 'react-toastify';
// import { Link } from 'react-router-dom';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import logo from '../assets/image/ethiotech2.png';

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Current Password is required'),
  newPassword: Yup.string()
    .required('New Password is required')
    .min(8, 'New Password must be at least 8 characters long'),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm New Password is required'),
});

export default function ChangePassword() {
  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    const formData = new FormData();
    formData.append('currentPassword', values.currentPassword);
    formData.append('newPassword', values.newPassword);

    try {
      console.log(values.newPassword);
    } catch (error) {
      setSubmitting(false);
      setErrors(error);
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
            <h1 className="block text-2xl font-bold text-gray-800">Change password</h1>
          </div>

          <div className="mt-5">
            <Formik
              initialValues={{
                currentPassword: '',
                newPassword: '',
                confirmNewPassword: '',
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting, setErrors }) => {
                onSubmit(values, { setSubmitting, setErrors });
              }}
            >
              <Form>
                <div className="grid gap-y-4">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-bold ml-1 mb-2">Current Password</label>
                    <div className="relative">
                      <Field
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-400 focus:outline-none focus:ring shadow-sm"
                      />
                    </div>
                    <ErrorMessage name="currentPassword" component="div" className="text-red-500 flex items-end" />
                  </div>
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-bold ml-1 mb-2">New Password</label>
                    <div className="relative">
                      <Field
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-400 focus:outline-none focus:ring shadow-sm"
                      />
                    </div>
                    <ErrorMessage name="newPassword" component="div" className="text-red-500 flex items-end" />
                  </div>
                  <div>
                    <label htmlFor="confirmNewPassword" className="block text-sm font-bold ml-1 mb-2">Confirm Password</label>
                    <div className="relative">
                      <Field
                        type="password"
                        id="confirmNewPassword"
                        name="confirmNewPassword"
                        className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-400 focus:outline-none focus:ring shadow-sm"
                      />
                    </div>
                    <ErrorMessage name="confirmNewPassword" component="div" className="text-red-500 flex items-end" />
                  </div>
                  <button type="submit" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all text-sm ">Change password</button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
