/* eslint-disable radix */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { trainingSelector } from '../../redux/store';

function convertTimeToAMPM(dateTimeString) {
  const [dateString, timeString] = dateTimeString.split('T');

  const [hours, minutes] = timeString.split(':');
  // eslint-disable-next-line radix
  let formattedHours = parseInt(hours);
  const ampm = formattedHours >= 12 ? 'PM' : 'AM';

  if (formattedHours === 0) {
    formattedHours = 12;
  } else if (formattedHours > 12) {
    formattedHours -= 12;
  }

  const formattedTime = `${formattedHours}:${minutes} ${ampm}`;

  return formattedTime;
}

function formatDate(dateString) {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr',
    'May', 'Jun', 'Jul', 'Aug',
    'Sep', 'Oct', 'Nov', 'Dec',
  ];

  const [year, month, day] = dateString.split('-');
  // eslint-disable-next-line radix
  const formattedMonth = months[parseInt(month) - 1];
  const formattedDate = `${formattedMonth} ${day}, ${year}`;
  return formattedDate;
}

function convertDateTimeToAMPM(dateTimeString) {
  const [dateString] = dateTimeString.split('T');
  const formattedDate = formatDate(dateString);
  const formattedTime = convertTimeToAMPM(dateTimeString);

  return `${formattedDate} ${formattedTime}`;
}

function TrainingDetail() {
  const { id } = useParams();
  const { trainings } = useSelector(trainingSelector);
  const filteredTraining = trainings.filter((training) => training.id === parseInt(id));
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center justify-center px-3 py-10 lg:w-3/5 md:4/5">

        <div className="flex mb-6 w-full justify-between items-center">
          <Link
            to="/admin/trainings"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            back
          </Link>

          <Link
            to={`/admin/updateTraining/${filteredTraining[0].id}`}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
          >
            Update Training
          </Link>
        </div>
        <div className="flex mb-6 w-full items-start">
          <div className="w-full flex justify-between items-center">
            <h1
              className="w-full text-gray-900 sm:text-sm sm:leading-6 lg:text-2xl font-semibold"
            >
              {filteredTraining[0].title}
            </h1>
            <div className="w-full flex flex-col justify-end items-end">
              <span className="text-md font-medium">
                Total Attendees:
                {' '}
                {filteredTraining[0].trainees_count}
                {' '}
              </span>
              <Link className="text-blue-500 hover:text-blue-400" to={`/admin/trainee/${filteredTraining[0].id}`}>see attendees</Link>
            </div>

          </div>
        </div>
        <div className="flex mb-6 w-full items-center justify-center">
          <img className="w-full lg rounded-sm h-72" src={filteredTraining[0].picture} alt="Training" />

        </div>

        {/* {filteredTraining[0].picture ?? (
          <div className="flex mb-6 w-full items-center justify-center">
            <img className="w-full lg rounded-sm h-72" src={filteredTraining[0].picture} alt="Colors" />
          </div>
        )} */}

        <div className="flex mb-3 w-full items-start">
          <div className="w-full">
            <div
              className="w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6 lg:text-base"
            >
              {filteredTraining[0].body}
            </div>
          </div>
        </div>

        <div className="w-full">
          <div
            className="w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6 lg:text-base"
          >
            Status:
            {' '}
            {filteredTraining[0].status_training ? 'Ongoing' : 'Completed'}
          </div>
        </div>
        <div className="w-full">
          <div
            className="w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6 lg:text-base"
          >
            Location:
            {' '}
            {filteredTraining[0].location}
          </div>
        </div>

        <div className="w-full">
          <div className="w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6 lg:text-base">
            Phases:
            {' '}
            {filteredTraining[0].phases ? filteredTraining[0].phases : 'N/A'}
          </div>
        </div>

        <div className="w-full">
          <div className="w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6 lg:text-base">
            Maximum Attendance:
            {' '}
            {filteredTraining[0].max_enrollment}
          </div>
        </div>

        <div className="w-full">
          <div className="w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6 lg:text-base">
            Enrolled Trainees:
            {' '}
            {filteredTraining[0].enrolled_count}
          </div>
        </div>

        <div className="w-full">
          <div
            className="w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6 lg:text-base"
          >
            Start Date and Time:
            {' '}

            {convertDateTimeToAMPM(filteredTraining[0].start_date)}
          </div>
        </div>

        <div className="w-full">
          <div className="w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6 lg:text-base">
            End Date and Time:
            {' '}
            {' '}
            {convertDateTimeToAMPM(filteredTraining[0].end_date)}
          </div>
        </div>
      </div>
    </div>
  );
}
export default TrainingDetail;
