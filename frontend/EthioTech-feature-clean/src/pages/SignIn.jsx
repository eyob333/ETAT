/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import logo from '../assets/image/ethiotech2.png';
import { setCredentials } from '../redux/auth/authSlice';
import { useLoginMutation } from '../redux/auth/authApiSlice';
import LoadingScreen from '../conditions/LoadingScreen';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Please enter a valid email').required('Email is required'),
  password: Yup.string().required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
});

export default function SignIn() {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  // useEffect(() => {

  // }, [email, password]);

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    const Email = values.email;
    const Password = values.password;

    try {
      const userData = await login({ email: values.email, password: values.password }).unwrap();
      dispatch(setCredentials({ ...userData, email: values.email }));
      console.log(userData);
      // setUser('');
      // setPwd('');
      navigate('/admin');
      toast.success('You have successfully logged in');
    } catch (error) {
      setSubmitting(false);
      setErrors(error);
      if (error.status === 401) {
        toast.error('Invalid credentials');
      }
      console.log(error, 'error');
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const userData = await login({ email, password }).unwrap();
  //     dispatch(setCredentials({ ...userData, email }));
  //     setUser('');
  //     setPwd('');
  //     navigate('/admin');
  //     toast.success('You have successfully logged in');
  //   } catch (error) {
  //     if (error.status === 401) {
  //       toast.error('Invalid credentials');
  //     }
  //     console.log(error);
  //   }
  // };

  // const handleUserInput = (e) => setUser(e.target.value);
  // const handlePwdInput = (e) => setPwd(e.target.value);

  if (isLoading === true) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <LoadingScreen />
      </div>
    );
  }
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-20 w-auto" src={logo} alt="Your Company" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            onSubmit(values, { setSubmitting, setErrors });
          }}
        >
          <Form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
              <div className="mt-2">
                <Field
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-400 focus:outline-none focus:ring shadow-sm"
                />
              </div>
              <ErrorMessage name="email" component="div" className="text-red-500 flex items-end" />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                <div className="text-sm">
                  <Link to="/forgotPassword" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</Link>
                </div>
              </div>
              <div className="relative">
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-400 focus:outline-none focus:ring shadow-sm"
                />
              </div>
              <ErrorMessage name="password" component="div" className="text-red-500 flex items-end" />
            </div>

            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
            </div>
          </Form>
        </Formik>

        {/* <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?
          <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</a>
        </p> */}
      </div>
    </div>
  );
}
