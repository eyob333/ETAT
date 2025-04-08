/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import {
  Formik, Form, Field, ErrorMessage, useFormik,
} from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateTrainingMutation } from '../../redux/training/trainingApiSlice';
import { userSelector } from '../../redux/store';
import { addTraining } from '../../redux/training/trainingSlice';
import ButtonLoadingScreen from '../../conditions/ButtonLoadingScreen';

const validationSchema = Yup.object().shape({
  trainingTitle: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title must not exceed 20 characters')
    .required('Required'),
  trainingDescription: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .max(200, 'Description must not exceed 150 characters')
    .required('Required'),
  trainingLocation: Yup.string()
    .min(10, 'Location must be at least 10 characters')
    .max(50, 'Location must not exceed 20 characters')
    .required('Required'),
  trainingPhase: Yup.number(),
  trainingMaxAttendee: Yup.number().required('Required'),
  trainingStartDateTime: Yup.date()
    .required('Required')
    .min(new Date(), 'Start date must be later than today'),
  trainingEndDateTime: Yup.date().required('Required')
    .when('trainingStartDateTime', (trainingStartDateTime, schema) => (trainingStartDateTime
      ? schema.test('is-after-start', 'Must be after start date and time', (value) => !value || (value && new Date(value) > new Date(trainingStartDateTime)))
      : schema))
    .nullable(),
});

export default function TrainingCreateForm() {
  const { admin } = useSelector(userSelector);
  const [file, setFile] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createTraining, { isLoading }] = useCreateTrainingMutation();
  const handleFileChanges = (e) => {
    setFile(e.target.files[0]);
    console.log(file);
  };
  const currentDateTime = new Date();

  const isBeforeCurrentDate = (dateTime) => {
    const currentDateTime = new Date();
    // const providedDateTime = new Date(dateTime);

    return dateTime < currentDateTime.toISOString().slice(0, 16);
  };
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    console.log(`${currentDateTime.toISOString().slice(0, 16)}jj`);
    console.log(`${values.trainingEndDateTime}kk`);
    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', values.trainingTitle);
    formData.append('body', values.trainingDescription);
    formData.append('location', values.trainingLocation);
    const status = isBeforeCurrentDate(values.trainingEndDateTime) ? 'Completed' : 'Ongoing';
    console.log(status === 'Ongoing');
    formData.append('status', status === 'Ongoing');
    formData.append('phases', values.trainingPhase);
    formData.append('max_enrollment', values.trainingMaxAttendee);
    formData.append('start_date', values.trainingStartDateTime);
    formData.append('end_date', values.trainingEndDateTime);
    formData.append('id', admin[0].id);
    console.log(values.trainingEndDateTime);

    if (file === '') {
      toast.error('Please select an image');
    } else {
      try {
        const res = await createTraining(formData).unwrap();
        console.log(res);
        dispatch(addTraining(res));
        setSubmitting(false);
        toast.success("You've successfully added a new training");
        navigate('/admin/trainings');
        setSubmitting(false);
      } catch (error) {
        setSubmitting(false);
        setErrors(error);
        console.log(error);
        toast.success('Some thing went wrong');
      }
    }
    // try {
    //   const res = await createTraining(formData).unwrap();
    //   console.log(res);
    //   dispatch(addTraining(res));
    //   setSubmitting(false);
    //   toast.success("You've successfully added a new training");
    //   navigate('/admin/trainings');
    //   setSubmitting(false);
    // } catch (error) {
    //   setSubmitting(false);
    //   setErrors(error);
    //   console.log(error);
    //   toast.success('Some thing went wrong');
    // }
  };

  return (
    <div className="">
      <center>
        <div className="flex mb-6 w-full justify-start pt-10 px-8 items-center">
          <Link
            to="/admin/trainings"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            back
          </Link>
        </div>
        <div className="text-center  px-8  w-full">
          <h1 className="block text-3xl font-bold text-gray-800 w-5/6">Add Training</h1>
        </div>
        <Formik
          initialValues={{
            trainingTitle: '',
            trainingDescription: '',
            trainingLocation: '',
            trainingMaxAttendee: '',
            trainingStartDateTime: '',
            trainingEndDateTime: '',
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            onSubmit(values, { setSubmitting, setErrors });
          }}
        >
          <Form className="flex flex-col items-start px-8 py-10 w-full">
            <div className="flex mb-6 w-5/6 items-start">
              <label htmlFor="trainingTitle" className="text-sm font-medium leading-6 text-gray-900 w-32 mt-2 flex items-start">
                Title*
              </label>
              <div className="w-4/5">
                <Field
                  id="trainingTitle"
                  name="trainingTitle"
                  placeholder="Title"
                  className="w-full rounded-md border-2 py-1.5 border-grey-200 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring px-2 sm:text-sm sm:leading-6"
                />
                <ErrorMessage name="trainingTitle" component="div" className="text-red-500  flex items-start" />

              </div>
            </div>

            <div className="flex mb-6 w-5/6 items-start">
              <label htmlFor="trainingDescription" className="text-sm font-medium leading-6 text-gray-900 w-32 mt-2 flex items-start">
                Description*
              </label>
              <div className="w-4/5">
                <Field
                  as="textarea"
                  rows={5}
                  id="trainingDescription"
                  name="trainingDescription"
                  placeholder="Description"
                  className="w-full rounded-md border-2 py-1.5 border-grey-200 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring px-2 sm:text-sm sm:leading-6"
                />
                <ErrorMessage name="trainingDescription" component="div" className="text-red-500  flex items-start" />
              </div>
            </div>

            <div className="flex mb-6 w-5/6 items-start">
              <label htmlFor="trainingImage" className="text-sm font-medium leading-6 text-gray-900 w-32 mt-2 flex items-start">
                Image
              </label>
              <input
                id="trainingImage"
                name="trainingImage"
                placeholder="Description"
                type="file"
                accept=".jpg, .png, .jpeg"
                className="py-1.5"
                onChange={handleFileChanges}
              />
            </div>

            <div className="flex mb-6 w-5/6 items-start">
              <label htmlFor="trainingLocation" className="text-sm font-medium leading-6 text-gray-900 w-32 mt-2 flex items-start">
                Location*
              </label>
              <div className="w-4/5">
                <Field
                  id="trainingLocation"
                  name="trainingLocation"
                  placeholder="Location"
                  className="w-full rounded-md border-2 py-1.5 border-grey-200 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring px-2 sm:text-sm sm:leading-6"
                />
                <ErrorMessage name="trainingLocation" component="div" className="text-red-500  flex items-start" />

              </div>
            </div>
            <div className="flex mb-6 w-5/6 items-start">
              <label htmlFor="trainingPhase" className="text-sm font-medium leading-6 text-gray-900 w-32 mt-2 flex items-start">
                Phases
              </label>
              <div className="w-4/5">
                <Field
                  type="number"
                  id="trainingPhase"
                  name="trainingPhase"
                  placeholder="Phase"
                  className="w-full rounded-md border-2 py-1.5 border-grey-200 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring px-2 sm:text-sm sm:leading-6"
                />
                <ErrorMessage name="trainingPhase" component="div" className="text-red-500  flex items-start" />

              </div>
            </div>

            <div className="flex mb-6 w-5/6 items-start">
              <label htmlFor="trainingMaxAttendee" className="text-sm font-medium leading-6 text-gray-900 w-32 mt-2 flex items-start justify-start">
                <span className="inline-block w-full text-left">Maximum Attendance*</span>
              </label>
              <div className="w-4/5">
                <Field
                  type="number"
                  id="trainingMaxAttendee"
                  name="trainingMaxAttendee"
                  placeholder=""
                  className="w-full rounded-md border-2 py-1.5 border-grey-200 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring px-2 sm:text-sm sm:leading-6"
                />
                <ErrorMessage name="trainingMaxAttendee" component="div" className="text-red-500  flex items-start" />

              </div>
            </div>

            <div className="mb-4 flex">
              <label htmlFor="trainingStartDateTime" className="text-sm font-medium leading-6 text-gray-900 w-32 mt-2 flex items-start">
                Start Date/Time*
              </label>
              <div className="w-4/5 flex justify-start flex-col items-start">

                <Field
                  id="trainingStartDateTime"
                  name="trainingStartDateTime"
                  placeholder=""
                  type="datetime-local"
                  className="py-1.5 border-2 lg:mx-3 border-grey-200  bg-gray-100 rounded-md border-1 px-1 focus:border-blue-400 focus:outline-none focus:ring w-52"
                />
                <ErrorMessage name="trainingStartDateTime" component="div" className="text-red-500  flex items-end lg:mx-3" />

              </div>

            </div>

            <div className="mb-4 flex">
              <label htmlFor="trainingEndDateTime" className="text-sm font-medium leading-6 text-gray-900 w-32 mt-2 flex items-start">
                End Date/Time*
              </label>
              <div className="w-4/5 flex justify-start flex-col items-start">

                <Field
                  id="trainingEndDateTime"
                  name="trainingEndDateTime"
                  placeholder=""
                  type="datetime-local"
                  className="py-1.5 border-2 lg:mx-3 border-grey-200  bg-gray-100 rounded-md border-1 px-1 focus:border-blue-400 focus:outline-none focus:ring w-52"
                />
                <ErrorMessage name="trainingEndDateTime" component="div" className="text-red-500  flex items-end lg:mx-3" />

              </div>
            </div>

            <div className="flex mb-6 w-5/6 items-center justify-center">
              <button
                type="submit"
                className="bg-blue-500 flex gap-0 justify-center items-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                {isLoading ? <ButtonLoadingScreen /> : ''}
                <span>Add Training</span>
              </button>
            </div>
          </Form>
        </Formik>
      </center>
    </div>
  );
}
