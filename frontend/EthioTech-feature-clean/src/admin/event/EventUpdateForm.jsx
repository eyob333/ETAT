/* eslint-disable no-useless-concat */
/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
/* eslint-disable radix */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import {
  Formik, Form, Field, ErrorMessage, useFormik,
} from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateEventDataMutation } from '../../redux/event/eventApiSlice';
import { eventSelector, userSelector } from '../../redux/store';
import { fetchEvent, updateEventState } from '../../redux/event/eventSlice';
import LoadingScreen from '../../conditions/LoadingScreen';
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
    .min(10, 'Location must be at least 10 characters')
    .max(50, 'Location must not exceed 20 characters')
    .required('Required'),
  eventMaxAttendee: Yup.number().required('Required'),
  eventStartDateTime: Yup.date().required('Required'),
  eventEndDateTime: Yup.date().required('Required')
    .when('eventStartDateTime', (eventStartDateTime, schema) => (eventStartDateTime
      ? schema.test('is-after-start', 'Must be after start date and time', (value) => !value || (value && new Date(value) > new Date(eventStartDateTime)))
      : schema))
    .nullable(),
});

export default function EventUpdateForm() {
  const navigate = useNavigate();
  const [updateEvent, { isLoading: loading }] = useUpdateEventDataMutation();
  const dispatch = useDispatch();
  const [file, setFile] = useState('');
  const { id } = useParams();
  const { events, isLoading } = useSelector(eventSelector);
  let filteredEvent;

  const handleFileChanges = (e) => {
    setFile(e.target.files[0]);
    console.log(file);
  };

  useEffect(() => {
    if (events.length === 0) {
      dispatch(fetchEvent());
    }
  }, [dispatch, events.length]);

  const isBeforeCurrentDate = (dateTime) => {
    const currentDateTime = new Date();
    const providedDateTime = new Date(dateTime);

    return providedDateTime < currentDateTime;
  };

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };

  // let startDate = new Date(filteredEvent[0].start_date);
  // let formattedStartDateTime = startDate.toISOString().slice(0, 19);
  // let endDate = new Date(filteredEvent[0].end_date);
  // let formattedEndDateTime = endDate.toISOString().slice(0, 19);
  // console.log(formattedEndDateTime + filteredEvent[0].end_date);
  let startDate;
  let formattedStartDateTime;
  let endDate;
  let formattedEndDateTime;

  // Adjust the date to local time
  // const adjustedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    console.log(new Date(filteredEvent[0].start_date).toISOString());
    // const formattedStartDate = (values.eventStartDate).toLocaleString('en-US', options).replace(',', '');
    // const formattedEndDate = (values.eventEndDate) ? (values.eventEndDate).toLocaleString('en-US', options).replace(',', '') : '';
    // console.log(`${formattedStartDate}dd`);
    const formData = new FormData();
    formData.append('logo', file);
    formData.append('title', values.eventTitle);
    formData.append('body', values.eventDescription);
    formData.append('location', values.eventLocation);
    formData.append('max_enrollment', values.eventMaxAttendee);
    const status = values.eventStatus === filteredEvent[0].status;
    formData.append('status', status);
    formData.append('start_date', values.eventStartDateTime);
    formData.append('end_date', values.eventEndDateTime);
    formData.append('id', filteredEvent[0].id);

    try {
      const res = await updateEvent(formData).unwrap();
      console.log(res);
      dispatch(updateEventState(res.events));
      setSubmitting(false);
      toast.success('Event Updated Successfully');
      navigate('/admin/events');
    } catch (error) {
      setSubmitting(false);
      setErrors(error);
      toast.error('Something went wrong');
    }
  };
  let content;

  if (isLoading) {
    content = <LoadingScreen />;
  } else if (!isLoading && events.length > 0) {
    filteredEvent = events.filter((event) => event.id === parseInt(id));
    startDate = new Date(filteredEvent[0].start_date);
    formattedStartDateTime = startDate.toISOString().slice(0, 19);
    endDate = new Date(filteredEvent[0].end_date);
    formattedEndDateTime = endDate.toISOString().slice(0, 19);
    content = (
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
            <h1 className="block text-3xl font-bold text-gray-800 w-5/6">Update Event</h1>
          </div>
          <Formik
            initialValues={{
              eventTitle: filteredEvent[0].title,
              eventDescription: filteredEvent[0].body,
              eventLocation: filteredEvent[0].location,
              eventMaxAttendee: filteredEvent[0].max_enrollment,
              eventStartDateTime: (filteredEvent[0].start_date) ? formattedStartDateTime : '',
              eventEndDateTime: (filteredEvent[0].end_date) ? formattedEndDateTime : '',
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
                    id="eventLocation"
                    name="eventLocation"
                    placeholder="location"
                    className="w-full rounded-md border-2 py-1.5 border-grey-200 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring px-2 sm:text-sm sm:leading-6"
                  />
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
                  {loading ? <ButtonLoadingScreen /> : ''}
                  <span>Update event</span>
                </button>
              </div>
            </Form>
          </Formik>
        </center>
      </div>
    );
  }

  return (
    <>
      {content}
    </>
  );
}
