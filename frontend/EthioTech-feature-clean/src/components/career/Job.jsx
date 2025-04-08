/* eslint-disable react/button-has-type */
/* eslint-disable import/no-duplicates */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BiSolidUserCircle } from 'react-icons/bi';
import { AiOutlineFilePdf } from 'react-icons/ai';
import { CiCalendar } from 'react-icons/ci';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FaShareSquare } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { jobSelector } from '../../redux/store';
import { useCreateJobAppMutation } from '../../redux/jobApplication/JobApplicationApiSlice';
import { fetchJob } from '../../redux/job/jobSlice';
import LoadingScreen from '../../conditions/LoadingScreen';
import ButtonLoadingScreen from '../../conditions/ButtonLoadingScreen';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required'),
  address: Yup.string()
    .required('Address is required'),
  phone: Yup.string()
    .required('Phone date is required'),
  email: Yup.string()
    .required('Email is required'),
  field_of_study: Yup.string()
    .required('field_of_study is required'),
  gpa: Yup.string()
    .required('gpa is required'),
  name_of_previous_company: Yup.string()
    .required('Company is required'),
  total_years_of_experience: Yup.string()
    .required('experience is required'),
  available_start_date: Yup.string()
    .required('Start date is required'),
  expected_salary: Yup.number()
    .required('Salary type is required'),
});

const workplaces = [
  { value: 'office', label: 'Office' },
  { value: 'remote', label: 'Remote' },
  { value: 'client_site', label: 'Client Site' },
];

function formatDate(dateString) {
  const options = {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    hour12: true,
    year: 'numeric',
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleString('en-US', options).replace(',', '');

  const [month, day, year, at, hour, hour12] = formattedDate.split(' ');

  return {
    month,
    day,
    hour,
    hour12,
    year,
    at,
    formattedDate,
  };
}

const handleShareClick = async () => {
  const currentURL = window.location.href;

  try {
    await navigator.clipboard.writeText(currentURL);
    toast.success('Copied job to clipboard!');
  } catch (error) {
    console.error('Failed to copy link:', error);
  }
};

function calculateTime(dateString) {
  const options = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };

  const date = new Date(dateString);
  const currentDate = new Date();
  const timeDifference = Math.abs(currentDate - date);

  const minuteInMilliseconds = 60 * 1000;
  const hourInMilliseconds = 60 * minuteInMilliseconds;
  const dayInMilliseconds = 24 * hourInMilliseconds;
  const weekInMilliseconds = 7 * dayInMilliseconds;

  if (timeDifference < minuteInMilliseconds) {
    return 'Just now';
  } if (timeDifference < hourInMilliseconds) {
    const minutes = Math.floor(timeDifference / minuteInMilliseconds);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } if (timeDifference < dayInMilliseconds) {
    const hours = Math.floor(timeDifference / hourInMilliseconds);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } if (timeDifference < weekInMilliseconds) {
    const days = Math.floor(timeDifference / dayInMilliseconds);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
  const formattedDate = date.toLocaleString('en-US', options).replace(',', '');
  return formattedDate;
}

export default function Job() {
  const [file, setFile] = useState('');
  const [confirmation, setConfirmation] = useState(false);
  const { slug } = useParams();
  const { jobs, isLoadingJob } = useSelector(jobSelector);
  // const filteredjob = jobs.filter((job) => job.slug === slug);
  const [createJobApp, { isLoading: loading }] = useCreateJobAppMutation();
  const dispatch = useDispatch();
  let content;
  let filteredjob;

  useEffect(() => {
    if (jobs.length === 0) {
      dispatch(fetchJob());
    }
  }, [dispatch, jobs.length]);

  const handleConfirmationChange = () => {
    setConfirmation(!confirmation);
  };

  const handleFileChanges = (e) => {
    setFile(e.target.files[0]);
  };
  const location = useLocation();
  const currentURL = location.pathname;

  const copyToClipboard = () => {
    const pageLink = window.location.href;
    navigator.clipboard.writeText(currentURL)
      .then(() => {
        console.log('Page link copied to clipboard!');
        alert('Page link copied to clipboard!');
      })
      .catch((error) => {
        console.error('Error copying to clipboard:', error);
        alert('Error copying to clipboard. Please try again.');
      });
  };

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('phone', values.phone);
    formData.append('address', values.address);
    formData.append('field_of_study', values.field_of_study);
    formData.append('gpa', values.gpa);
    formData.append('total_years_of_experience', values.total_years_of_experience);
    formData.append('name_of_previous_company', values.name_of_previous_company);
    formData.append('expected_salary', values.expected_salary);
    formData.append('available_start_date', values.available_start_date);
    formData.append('cover_letter', values.cover_letter);
    formData.append('resume', file);
    formData.append('id', filteredjob[0].id);
    formData.append('prospectus_confirmation', confirmation);
    console.log(values);
    if (confirmation === false || file === '') {
      toast.error('Resume and confirmation required');
    } else {
      try {
        console.log(values);
        const res = await createJobApp(formData).unwrap();
        console.log(res);
        toast.success("You've successfully applied for this job");
      } catch (error) {
        setSubmitting(false);
        setErrors(error);
        toast.error('Something went wrong, please try again');
      }
    }
  };

  if (isLoadingJob) {
    content = <LoadingScreen />;
  } else if (!isLoadingJob && jobs.length > 0) {
    filteredjob = jobs.filter((job) => job.slug === slug);
    content = (
      <div className="flex-column relative">
        <div className="relative z-0 w-ful h-[450px] ">
          <div
            className="bg-cover bg-center bg-no-repeat h-[450px] flex flex-col items-start"
            style={{
              backgroundImage:
          'url(https://synaxtech.com/wp-content/uploads/2021/02/bg-number.jpg?_t=1673358156)',
            }}
          >
            <div className="container mx-auto pt-12  sm:px-6 lg:px-8  w-4/5 flex items-center justify-start">
              <h1 className="text-4xl sm:text-5xl md:text-6xl bg-raleway-700-6xl text-white text-left">
                {filteredjob[0].title}
              </h1>
            </div>

            <div className="flex flex-col mt-3 w-4/5  py-12  sm:px-6 lg:px-8  justify-items-start ">
              <div className="lg:w-3/4 sm:w-full md:mx-auto">
                <div className="flex w-full mt-2 pl-6 md:pl-0 gap-8 md:gap-14">
                  <div className="flex text-left items-center">
                    <BiSolidUserCircle className="h-10 w-10 rounded-full  object-cover white" />
                    <div>
                      <p className="font-semibold text-gray-200 text-sm"> EthioTech S.C </p>
                    </div>
                  </div>
                  <div className="flex text-right items-center">
                    <CiCalendar className="text-base text-lightMain" />
                    <span className="text-sm text-white">
                      {`${formatDate(filteredjob[0].start_date).month} ${formatDate(filteredjob[0].start_date).day}, ${formatDate(filteredjob[0].start_date).year} |  ${formatDate(filteredjob[0].start_date).hour}: 00 ${formatDate(filteredjob[0].start_date).hour12}` }
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
        <div className="lg:w-3/4 relative z-20 top-0 sm:w-full bg-rose-200 md:mx-auto">
          <div className="absolute z-20 bottom-44 md:right-96 lg:right-[450px] bg-red-500 rounded-md grid  gap-x-5">
            <div
              className=" bg-cover bg-center bg-no-repeat absolute z-20 bg-red-500 md:w-72 md:h-60 lg:w-96 lg:h-72"
              style={{
                backgroundImage:
          'url(https://www.echnoserve.com/assets/imges/p8.jpg)',
              }}
            />
            <button className="absolute bg-blue-500 top-0 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={copyToClipboard}>
              Share
            </button>
          </div>

        </div>

        <div className="relative z-10 lg:w-3/4 sm:w-full mx-auto bottom-20 bg-white rounded-md shadow-xl grid grid-cols-1 lg:grid-cols-2 gap-x-5">
          <div className="px-10 py-16 ">
            <div className="flex justify-between items-center">
              <div className="flex flex-1 items-center ">
                <div
                  className="inline-block h-5 min-h-[1em] w-1  bg-red-500  mr-1"
                />
                <h1 className="text-xl justify-start font-poppins text-bold">
                  Job Post
                </h1>
              </div>
              <button className="flex gap-2 justify-between text-white px-3 py-1 rounded-md hover:shadow-lg bg-mainColor items-center" type="button" onClick={handleShareClick}>
                <FaShareSquare />
                <span>share</span>
              </button>
            </div>

            <div className=" flex flex-col">
              <h1 className="text-3xl justify-start mb-2 font-poppins text-bold mt-5 text-mainColor">
                {filteredjob[0].title}
              </h1>
              <p>{filteredjob[0].createdAt !== filteredjob[0].updatedAt ? `Updated at: ${formatDate(filteredjob[0].updatedAt).formattedDate}` : ''}</p>
              <div className="flex gap-8">
                <p>
                  posted:
                  {' '}
                  {calculateTime(filteredjob[0].createdAt)}
                </p>
                <p>
                  {filteredjob[0].application_count}
                  {' '}
                  Applicants
                </p>
              </div>
            </div>

            <div className=" sm:w-full whitespace-pre-wrap leading-7 my-10 font-poppins text-sm">
              {filteredjob[0].body}
              <p className="mt-4 font-medium text-red-600">{`Deadline - ${formatDate(filteredjob[0].end_date).day}th ${formatDate(filteredjob[0].end_date).month} ${formatDate(filteredjob[0].end_date).year} `}</p>

            </div>

            <Formik
              initialValues={{
                name: '',
                email: '',
                phone: '',
                address: '',
                field_of_study: '',
                gpa: '',
                total_years_of_experience: '',
                name_of_previous_company: '',
                expected_salary: '',
                available_start_date: '',
                cover_letter: '',
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting, setErrors }) => {
                onSubmit(values, { setSubmitting, setErrors });
              }}
            >
              <Form className="sm:w-full my-10 font-poppins">
                <div className="space-y-5">
                  <div className="border-b border-blue-400/10 pb-10">
                    <h2 className="text-2xl font-semibold leading-7 text-gray-900">Please complete the form below to apply for this position</h2>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                          Full Name
                        </label>
                        <div className="mt-2">

                          <Field
                            type="text"
                            id="name"
                            name="name"
                            className="block w-full rounded-md border-2 py-1.5 border-grey-200 text-gray-900 shadow-sm  placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring px-2 sm:text-sm sm:leading-6"
                          />
                          <ErrorMessage name="name" component="div" className="text-red-500  flex items-start" />

                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                          Email
                        </label>
                        <div className="mt-2">
                          <Field
                            type="text"
                            id="email"
                            name="email"
                            className="block w-full rounded-md border-2 py-1.5 border-grey-200 text-gray-900 shadow-sm  placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring px-2 sm:text-sm sm:leading-6"
                          />

                          <ErrorMessage name="email" component="div" className="text-red-500  flex items-start" />
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                          Phone number
                        </label>
                        <Field
                          type="text"
                          id="phone"
                          name="phone"
                          className="block w-full rounded-md border-2 py-1.5 border-grey-200 text-gray-900 shadow-sm  placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring px-2 sm:text-sm sm:leading-6"
                        />

                        <ErrorMessage name="phone" component="div" className="text-red-500  flex items-start" />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                        Address
                      </label>
                      <div className="mt-2">
                        <Field
                          type="text"
                          id="address"
                          name="address"
                          className="block w-full rounded-md border-2 py-1.5 border-grey-200 text-gray-900 shadow-sm  placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring px-2 sm:text-sm sm:leading-6"
                        />

                        <ErrorMessage name="address" component="div" className="text-red-500  flex items-start" />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label htmlFor="field_of_study" className="block text-sm font-medium leading-6 text-gray-900">
                        Field of Study and University
                      </label>
                      <div className="mt-2">
                        <Field
                          as="select"
                          id="field_of_study"
                          name="field_of_study"
                          className="block w-full rounded-md border-2 py-1.5 border-grey-200 text-gray-900 shadow-sm  placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring px-2 sm:text-sm sm:leading-6"
                        >
                          <option value="">Select...</option>
                          {workplaces.map((item) => (
                            <option key={item.value} value={item.value}>
                              {item.label}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage name="field_of_study" component="div" className="text-red-500  flex items-start" />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label htmlFor="gpa" className="block text-sm font-medium leading-6 text-gray-900">
                        GPA
                      </label>
                      <div className="mt-2">
                        <Field
                          type="number"
                          id="gpa"
                          name="gpa"
                          className="block w-full rounded-md border-2 py-1.5 border-grey-200 text-gray-900 shadow-sm  placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring px-2 sm:text-sm sm:leading-6"
                        />

                        <ErrorMessage name="gpa" component="div" className="text-red-500  flex items-start" />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label htmlFor="total_years_of_experience" className="block text-sm font-medium leading-6 text-gray-900">
                        Total Year of Experience
                      </label>
                      <div className="mt-2">
                        <Field
                          type="number"
                          id="total_years_of_experience"
                          name="total_years_of_experience"
                          className="block w-full rounded-md border-2 py-1.5 border-grey-200 text-gray-900 shadow-sm  placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring px-2 sm:text-sm sm:leading-6"
                        />

                        <ErrorMessage name="total_years_of_experience" component="div" className="text-red-500  flex items-start" />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label htmlFor="name_of_previous_company" className="block text-sm font-medium leading-6 text-gray-900">
                        Previous Company
                      </label>
                      <div className="mt-2">
                        <Field
                          type="text"
                          id="name_of_previous_company"
                          name="name_of_previous_company"
                          className="block w-full rounded-md border-2 py-1.5 border-grey-200 text-gray-900 shadow-sm  placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring px-2 sm:text-sm sm:leading-6"
                        />

                        <ErrorMessage name="name_of_previous_company" component="div" className="text-red-500  flex items-start" />
                      </div>
                    </div>

                    <div className="sm:col-span-3 sm:col-start-1">
                      <label htmlFor="expected_salary" className="block text-sm font-medium leading-6 text-gray-900">
                        Expected salary
                      </label>
                      <div className="mt-2">
                        <Field
                          type="number"
                          id="expected_salary"
                          name="expected_salary"
                          className="block w-full rounded-md border-2 py-1.5 border-grey-200 text-gray-900 shadow-sm  placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring px-2 sm:text-sm sm:leading-6"
                        />

                        <ErrorMessage name="expected_salary" component="div" className="text-red-500  flex items-start" />
                      </div>
                    </div>

                    <div className="sm:col-span-3 sm:col-start-1">
                      <label htmlFor="available_start_date" className="block text-sm font-medium leading-6 text-gray-900">
                        Available start date
                      </label>
                      <div className="mt-2">
                        <Field
                          type="date"
                          id="available_start_date"
                          name="available_start_date"
                          className="block w-full rounded-md border-2 py-1.5 border-grey-200 text-gray-900 shadow-sm  placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring px-2 sm:text-sm sm:leading-6"
                        />

                        <ErrorMessage name="expected_salary" component="div" className="text-red-500  flex items-start" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-b border-blue-400/10 pb-12">

                  <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                    <div className="col-span-full">
                      <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                        Upload Your Resume
                      </label>
                      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-blue-400/25 px-6 py-10">
                        <div className="text-center">
                          <AiOutlineFilePdf className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                          <div className="mt-4 flex text-sm leading-6 text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                              <span>Upload a file</span>
                              <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChanges} />
                              {file && (
                              <p className="mt-2 text-indigo-600 ">
                                {' '}
                                {file.name}
                              </p>
                              )}
                            </label>

                          </div>
                          <p className="text-xs mt-4 leading-5 text-gray-600">PDF up to 10MB</p>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label htmlFor="cover_letter" className="block text-sm font-medium leading-6 text-gray-900">
                        Cover Letter
                      </label>
                      <div className="mt-2">

                        <Field
                          as="textarea"
                          rows={5}
                          id="cover_letter"
                          name="cover_letter"
                          type="text"
                          className="block w-full rounded-md border-2 py-1.5 border-grey-200 text-gray-900 shadow-sm  placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring px-2 sm:text-sm sm:leading-6"
                        />

                        <ErrorMessage name="cover_letter" component="div" className="text-red-500  flex items-start" />
                      </div>
                      <p className="mt-3 text-sm leading-6 text-gray-600">Please include a letter for the applicaiton.</p>
                    </div>
                  </div>
                </div>

                <div className="border-b border-blue-400/10 pb-12">
                  <div className="mt-2 space-y-10">
                    <fieldset>
                      <div className=" space-y-6">
                        <div className="flex items-center gap-x-3">
                          <input
                            type="checkbox"
                            id="prospectus_confirmation"
                            name="prospectus_confirmation"
                            checked={confirmation}
                            onChange={handleConfirmationChange}
                          />
                          <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                            I hereby confirm that the form has been filled with accurate information
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">

                  <button
                    type="submit"
                    className="rounded-md flex gap-2 justify-center items-center bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    {loading ? <ButtonLoadingScreen /> : ''}
                    <span>Submit</span>
                  </button>
                </div>
              </Form>
            </Formik>
          </div>

        </div>
        <div className="lg:w-4/4 relative sm:w-full bg-rose-200 md:mx-auto">
          <div className="absolute z-20 top-0 bg-green-500 rounded-md grid grid-cols-1 lg:grid-cols-3 gap-x-5">
            <div>hi</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>

      {content}
    </div>
  );
}
