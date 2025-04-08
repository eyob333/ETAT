/* eslint-disable radix */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BiTimeFive } from 'react-icons/bi';
import { AiOutlineBook } from 'react-icons/ai';
import { GoLocation } from 'react-icons/go';
import { trainingSelector } from '../../redux/store';
import { fetchTraining } from '../../redux/training/trainingSlice';
import LoadingScreen from '../../conditions/LoadingScreen';

const duration = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const durationInMilliseconds = endDate - startDate;
  const durationInSeconds = Math.floor(durationInMilliseconds / 1000);
  const durationInMinutes = Math.floor(durationInSeconds / 60);
  const durationInHours = Math.floor(durationInMinutes / 60);
  const durationInDays = Math.floor(durationInHours / 24);
  return `${durationInDays} days, ${durationInHours % 24}:${durationInMinutes % 60}:${durationInSeconds % 60} Second`;
};

function formatDate(dateString) {
  const options = {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    hour12: true,
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleString('en-US', options).replace(',', '');

  const [month, day, time, hour12] = formattedDate.split(' ');

  return {
    month,
    day,
    time,
    hour12,
    formattedDate,
  };
}

export default function TraningList() {
  const { trainings, isLoading } = useSelector(trainingSelector);
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState('');

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    if (trainings.length === 0) {
      dispatch(fetchTraining());
    }
  }, [dispatch, trainings.length]);
  let content;
  let filteredTraining;
  if (isLoading) {
    content = <LoadingScreen />;
  } else if (!isLoading && trainings.length > 0) {
    const filteredArray = trainings.filter((training) => training.status_training === true);
    filteredTraining = filteredArray.filter((training) => training.title.toLowerCase().includes(searchInput.toLowerCase()));

    content = (
      <div className=" relative z-20 min-h-screen bg-white flex flex-col justify-center items-center px-4 pt-10 pb-20">
        <div className="absolute top-8 right-10 lg:right-36">
          <div action="" className="relative mx-auto w-max">
            <input
              type="text"
              id="topbar-search"
              className="peer cursor-pointer relative z-10 h-12 w-12 rounded-full border bg-transparent pl-12 outline-none focus:w-full focus:cursor-text focus:border-mainColor focus:pl-16 focus:pr-4"
              value={searchInput}
              onChange={handleSearchInput}
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-mainColor peer-focus:stroke-mainColor" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        <div className="flex pt-16 lg:pt-0 flex-wrap">
          <div className="w-full px-4">
            <div className="text-center mx-auto mb-12 lg:mb-14 max-w-[510px]">
              <h2
                className="
               font-bold
               text-3xl
               sm:text-4xl
               md:text-[40px]
               text-mainColor
               font-raleway
               "
                onClick={() => { console.log(trainings); }}
              >
                Trainings
              </h2>
            </div>
          </div>
        </div>
        <div className="md:px-4 container flex flex-col justify-center gap-10 items-center">

          { filteredTraining.length === 0 ? <h1 className="text-2xl font-bold text-mainColor">No Trainings Found</h1>
            : filteredTraining.map((item) => (
              <div className=" relative md:w-10/12 w-full bg-white px-6 border pt-6 pb-8 flex-col rounded-xl shadow-2xl" key={item.title}>
                <p className="absolute top-6 text-mainColor right-4">{item.createdAt != item.updatedAt ? `Updated at: ${formatDate(item.updatedAt).formattedDate}` : ''}</p>
                <h3 className="mb-3 text-xl font-bold text-mainColor">Beginner Friendly</h3>
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="relative w-full md:w-3/4">
                    <img className="w-full h-64 object-contain rounded-xl" src={item.picture} alt="Colors" />
                    {item.payment === 'free' && (
                    <p className="absolute top-0 bg-secondColor text-white font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">
                      FREE
                    </p>
                    )}
                  </div>

                  <div className="md:w-2/4 w-full">
                    <h1 className="text-gray-800 text-2xl font-bold cursor-pointer">{item.title}</h1>
                    <p className="text-gray-600 text-md">{item.body}</p>
                    <div className="my-4 flex flex-col gap-2">
                      <div className="flex space-x-1 items-center">
                        <div className="flex space-x-1 items-center">
                          <span className="text-2xl text-mainColor">
                            <BiTimeFive />
                          </span>
                          <p>{duration(item.start_date, item.end_date)}</p>
                        </div>
                      </div>
                      <div className="flex space-x-1 items-center">
                        <div className="flex space-x-1 items-center">
                          <span className="text-2xl text-mainColor">
                            <AiOutlineBook />
                          </span>
                          <p>
                            {item.phases}
                            {' '}
                            phases
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-1 pb-4 items-center">
                        <div className="flex space-x-1 pb-4 items-center">
                          <span className="text-2xl text-mainColor">
                            <GoLocation />
                          </span>
                          <p>
                            {' '}
                            {item.location}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-center items-center">
                        {item.max_enrollment === parseInt(item.enrolled_count) ? <p className="text-white md:px-28 px-24 font-medium bg-red-600 py-2 rounded-sm shadow-lg">Full</p>
                          : (
                            <Link
                              to={`/enroll/${item.id}`}
                              className="text-white md:px-28 px-24 font-medium bg-mainColor py-2 rounded-sm shadow-lg"
                            >
                              Enroll Now
                            </Link>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

        </div>
      </div>

    );
  }

  return (
    <>
      {content}
    </>
  );
}
