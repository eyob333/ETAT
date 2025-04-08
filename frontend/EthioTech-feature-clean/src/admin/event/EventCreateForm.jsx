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
import { useCreateEventMutation } from '../../redux/event/eventApiSlice';
import { userSelector } from '../../redux/store';
import { addEvent } from '../../redux/event/eventSlice';
import ButtonLoadingScreen from '../../conditions/ButtonLoadingScreen';

const validationSchema = Yup.object().shape({
  eventTitle: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title must not exceed 20 characters')
    .required('Required'),
  eventDescription: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .max(400, 'Description must not exceed 400 characters')
    .required('Required'),
  eventLocation: Yup.string()
    .required('Required'),
  eventMaxAttendee: Yup.number().required('Required'),
  eventStartDateTime: Yup.date().required('Required').min(new Date(), 'Start date must be later than today'),
  eventEndDateTime: Yup.date().required('Required')
    .when('eventStartDateTime', (eventStartDateTime, schema) => (eventStartDateTime
      ? schema.test('is-after-start', 'Must be after start date and time', (value) => !value || (value && new Date(value) > new Date(eventStartDateTime)))
      : schema))
    .nullable(),
});

const cities = [
  { value: 'Addis Ababa', label: 'Addis Ababa' },
  { value: 'Adama', label: 'Adama' },
  { value: 'Dire Dawa', label: 'Dire Dawa' },
  { value: 'Mekelle', label: 'Mekelle' },
  { value: 'Gondar', label: 'Gondar' },
  { value: 'Hawassa', label: 'Hawassa' },
  { value: 'Jimma', label: 'Jimma' },
  { value: 'Bahir Dar', label: 'Bahir Dar' },
  { value: 'Other', label: 'Other' },
];

export default function EventCreateForm() {
  const { admin } = useSelector(userSelector);
  const [file, setFile] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createEvent, { isLoading }] = useCreateEventMutation();
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
    const formData = new FormData();
    formData.append('logo', file);
    formData.append('title', values.eventTitle);
    formData.append('body', values.eventDescription);
    formData.append('max_enrollment', values.eventMaxAttendee);
    formData.append('location', values.eventLocation);
    const status = isBeforeCurrentDate(values.eventEndDateTime) ? 'Completed' : 'Ongoing';
    formData.append('status', status === 'Ongoing');
    formData.append('start_date', values.eventStartDateTime);
    formData.append('end_date', values.eventEndDateTime);
    formData.append('id', admin[0].id);

    if (file === '') {
      toast.error('Please select an Image');
    } else {
      try {
        const res = await createEvent(formData).unwrap();
        console.log(res);
        dispatch(addEvent(res));
        setSubmitting(false);
        toast.success("You've successfully added a new event");
        navigate('/admin/events');
        setSubmitting(false);
      } catch (error) {
        setSubmitting(false);
        setErrors(error);
      }
    }
    // try {
    //   const res = await createEvent(formData).unwrap();
    //   console.log(res);
    //   dispatch(addEvent(res));
    //   setSubmitting(false);
    //   toast.success("You've successfully added a new event");
    //   navigate('/admin/events');
    //   setSubmitting(false);
    // } catch (error) {
    //   setSubmitting(false);
    //   setErrors(error);
    // }
  };

  return (
    <div className="">
      <center>
        <div className="flex mb-6 w-full justify-start pt-10 px-8 items-center">
          <Link
            to="/admin/events"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            back
          </Link>
        </div>
        <div className="text-center  px-8  w-full">
          <h1 className="block text-3xl font-bold text-gray-800 w-5/6">Add Event</h1>
        </div>
        <Formik
          initialValues={{
            eventTitle: '',
            eventDescription: '',
            eventMaxAttendee: '',
            eventLocation: '',
            eventStartDateTime: '',
            eventEndDateTime: '',
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            onSubmit(values, { setSubmitting, setErrors });
          }}
        >
          <Form className="flex flex-col items-start px-8 py-10 w-full">
            <div className="flex mb-6 w-5/6 items-start">
              <label htmlFor="eventTitle" className="text-sm font-medium leading-6 text-gray-900 w-32 mt-2 flex items-start">
                Title*
              </label>
              <div className="w-4/5">
                <Field
                  id="eventTitle"
                  name="eventTitle"
                  placeholder="Title"
                  className="w-full rounded-md border-2 py-1.5 border-grey-200 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring px-2 sm:text-sm sm:leading-6"
                />
                <ErrorMessage name="eventTitle" component="div" className="text-red-500  flex items-start" />

              </div>
            </div>

            <div className="flex mb-6 w-5/6 items-start">
              <label htmlFor="eventDescription" className="text-sm font-medium leading-6 text-gray-900 w-32 mt-2 flex items-start">
                Description*
              </label>
              <div className="w-4/5">
                <Field
                  as="textarea"
                  rows={5}
                  id="eventDescription"
                  name="eventDescription"
                  placeholder="Description"
                  className="w-full rounded-md border-2 py-1.5 border-grey-200 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring px-2 sm:text-sm sm:leading-6"
                />
                <ErrorMessage name="eventDescription" component="div" className="text-red-500  flex items-start" />
              </div>
            </div>

            <div className="flex mb-6 w-5/6 items-start">
              <label htmlFor="eventImage" className="text-sm font-medium leading-6 text-gray-900 w-32 mt-2 flex items-start">
                Image
              </label>
              <input
                id="eventImage"
                name="eventImage"
                placeholder="Description"
                type="file"
                accept=".jpg, .png, .jpeg"
                className="py-1.5"
                onChange={handleFileChanges}
              />
            </div>

            <div className="flex mb-6 w-5/6 items-start">
              <label htmlFor="eventLocation" className="text-sm font-medium leading-6 text-gray-900 w-32 mt-2 flex items-start">
                Location*
              </label>
              <div className="w-4/5">
                <Field
                  as="select"
                  id="eventLocation"
                  name="eventLocation"
                  className="w-full rounded-md border-2 py-1.5 border-grey-200 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring px-2 sm:text-sm sm:leading-6"
                >
                  <option value="">Select...</option>
                  {cities.map((city) => (
                    <option key={city.value} value={city.value}>
                      {city.label}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="eventLocation" component="div" className="text-red-500  flex items-start" />

              </div>
            </div>

            <div className="flex mb-6 w-5/6 items-start">
              <label htmlFor="eventMaxAttendee" className="text-sm font-medium leading-6 text-gray-900 w-32 mt-2 flex items-start justify-start">
                <span className="inline-block w-full text-left">Maximum Attendance*</span>
              </label>
              <div className="w-4/5">
                <Field
                  type="number"
                  id="eventMaxAttendee"
                  name="eventMaxAttendee"
                  placeholder=""
                  className="w-full rounded-md border-2 py-1.5 border-grey-200 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring px-2 sm:text-sm sm:leading-6"
                />
                <ErrorMessage name="eventMaxAttendee" component="div" className="text-red-500  flex items-start" />

              </div>
            </div>

            <div className="mb-4 flex">
              <label htmlFor="eventStartDateTime" className="text-sm font-medium leading-6 text-gray-900 w-32 mt-2 flex items-start">
                Start Date/Time*
              </label>
              <div className="w-4/5 flex justify-start flex-col items-start">

                <Field
                  id="eventStartDateTime"
                  name="eventStartDateTime"
                  placeholder=""
                  type="datetime-local"
                  className="py-1.5 border-2 lg:mx-3 border-grey-200  bg-gray-100 rounded-md border-1 px-1 focus:border-blue-400 focus:outline-none focus:ring w-52"
                />
                <ErrorMessage name="eventStartDateTime" component="div" className="text-red-500  flex items-end lg:mx-3" />

              </div>

            </div>

            <div className="mb-4 flex">
              <label htmlFor="eventEndDateTime" className="text-sm font-medium leading-6 text-gray-900 w-32 mt-2 flex items-start">
                End Date/Time*
              </label>
              <div className="w-4/5 flex justify-start flex-col items-start">

                <Field
                  id="eventEndDateTime"
                  name="eventEndDateTime"
                  placeholder=""
                  type="datetime-local"
                  className="py-1.5 border-2 lg:mx-3 border-grey-200  bg-gray-100 rounded-md border-1 px-1 focus:border-blue-400 focus:outline-none focus:ring w-52"
                />
                <ErrorMessage name="eventEndDateTime" component="div" className="text-red-500  flex items-end lg:mx-3" />

              </div>
            </div>

            <div className="flex mb-6 w-5/6 items-center justify-center">
              <button
                type="submit"
                className="bg-blue-500 flex gap-2 justify-center items-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                {isLoading ? <ButtonLoadingScreen /> : ''}
                <span>Add event</span>
              </button>
            </div>
          </Form>
        </Formik>
      </center>
    </div>
  );
}
