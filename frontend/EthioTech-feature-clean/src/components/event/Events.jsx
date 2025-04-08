/* eslint-disable radix */
/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { eventSelector } from '../../redux/store';
import { fetchEvent } from '../../redux/event/eventSlice';
import LoadingScreen from '../../conditions/LoadingScreen';

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
  };
}

function filterEventsByMonth(events, month) {
  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.start_date);
    const eventMonth = eventDate.getMonth();
    return eventMonth === month;
  });

  return filteredEvents;
}

function calculateDaysLeft(targetDate) {
  // const currentDate = new Date();
  // const targetDateTime = new Date(targetDate);

  // // Set both dates to midnight to compare only the date portion
  // currentDate.setHours(0, 0, 0, 0);
  // targetDateTime.setHours(0, 0, 0, 0);

  // const timeDiff = targetDateTime.getTime() - currentDate.getTime();
  // const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

  // return daysLeft;
  const currentDate = new Date();
  const targetDateTime = new Date(targetDate);

  // Set both dates to midnight to compare only the date portion
  currentDate.setHours(0, 0, 0, 0);
  targetDateTime.setHours(0, 0, 0, 0);

  const timeDiff = targetDateTime.getTime() - currentDate.getTime();

  if (timeDiff < 0) {
    return 'Strated';
  }

  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return `${daysLeft} days left`;
}

export default function Events() {
  const { events, isLoading } = useSelector(eventSelector);
  const [filteredEvents, setFilteredEvents] = useState(events.filter((event) => event.status_event === true));
  const [nextMonthName, setNextMonthName] = useState('');
  const [active, setActive] = useState('all');
  const dispatch = useDispatch();

  const handleAllClick = () => {
    setFilteredEvents(events.filter((event) => event.status_event === true));
    setActive('all');
  };

  const handleThisMonthClick = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const filteredEvents = filterEventsByMonth(events.filter((event) => event.status_event === true), currentMonth);
    setFilteredEvents(filteredEvents);
    setActive('current');
  };

  const handleMonthClick = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const nextMonth = (currentMonth + 1) % 12; // Calculate the next month using modulus operator
    const filteredEvents = filterEventsByMonth(events.filter((event) => event.status_event === true), nextMonth);
    setFilteredEvents(filteredEvents);
    setActive('next');
  };

  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const nextMonth = (currentMonth + 1) % 12;

    const options = { month: 'long' };
    const nextMonthName = new Date(currentDate.getFullYear(), nextMonth).toLocaleString('en-US', options);

    setNextMonthName(nextMonthName);
  }, []);

  useEffect(() => {
    if (events.length === 0) {
      dispatch(fetchEvent());
    }
  }, [dispatch, events.length]);

  useEffect(() => {
    if (!isLoading) {
      setFilteredEvents(events.filter((event) => event.status_event === true));
    }
  }, [isLoading, events]);
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <div
        className="bg-cover bg-center bg-no-repeat h-44 flex items-center font-poppins"
        style={{
          backgroundImage:
            'url(https://synaxtech.com/wp-content/uploads/2021/08/header-bg-aboutus.png)',
        }}
      >
        <div className="container mx-auto py-12 px-7 sm:px-6 lg:px-8 flex items-center justify-center">
          <h1 className="text-4xl sm:text-5xl md:text-5xl bg-raleway-700-6xl text-white text-center font-railway font-semibold">
            Events
          </h1>
        </div>
      </div>
      <div className="md:px-4 my-10 flex flex-col justify-center gap-10 items-center">
        <div className="flex w-full flex-col px-14">
          <h1
            className="   font-bold
               text-3xl
               sm:text-4xl
               md:text-[33px]
               text-mainColor
               font-raleway"
            onClick={() => { console.log(filteredEvents); }}
          >
            Upcoming events:
            {' '}
            {active === 'current' ? 'This month' : active === 'next' ? nextMonthName : 'all' }

          </h1>
          <div className="flex items-center gap-4">
            <button type="button" className={` ${active === 'all' ? 'bg-red-600' : 'bg-mainColor'} text-white font-semibold py-1 px-4 text-sm mt-6 inline-flex items-center group`} onClick={handleAllClick}>
              <p> All </p>
            </button>
            <button type="button" className={`${active == 'current' ? 'bg-red-600' : 'bg-mainColor'} text-white font-semibold py-1 px-4 text-sm mt-6 inline-flex items-center group`} onClick={handleThisMonthClick}>
              <p> This Month </p>
            </button>
            <button type="button" className={`${active === 'next' ? 'bg-red-600' : 'bg-mainColor'} text-white font-semibold py-1 px-4 text-sm mt-6 inline-flex items-center group`} onClick={handleMonthClick}>
              <p>
                {' '}
                {nextMonthName}
                {' '}
              </p>
            </button>

          </div>
        </div>

        {filteredEvents.length === 0 ? "There's no events"

          : filteredEvents.map((item) => (
            <div className="md:w-11/12 w-full bg-white px-6 pb-6 border pt-6 flex-col rounded-xl shadow-2xl" key={item.id}>
              <div className="flex flex-col md:flex-row gap-5">
                <div className="relative w-full md:w-1/3">
                  <img className="w-full h-56 lg:h-60 object-contain rounded-xl" src={item.picture} alt="Colors" />

                  <p className="absolute top-0 bg-secondColor text-white font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">
                    {calculateDaysLeft(item.start_date)}
                  </p>
                </div>

                <div className="md:w-full w-full">
                  <div className="flex justify-between">
                    <h1 onClick={() => { console.log(item); }} className="text-gray-800 text-2xl font-bold cursor-pointer">{item.title}</h1>
                    {item.max_enrollment === parseInt(item.enrolled_count) ? <p className="text-red-600 text-lg font-semibold">Full</p> : <Link to={`/attendEvent/${item.id}`} className="text-mainColor hover:opacity-75 text-lg underline cursor-pointer">Attend</Link> }
                  </div>
                  <p className="text-gray-600 text-md">{item.body}</p>
                  <p className="text-mainColor text-sm font-medium right-4">{item.createdAt != item.updatedAt ? `Updated at: ${formatDate(item.updatedAt).month} ${formatDate(item.updatedAt).day}, ${formatDate(item.updatedAt).year}` : ''}</p>
                  <div className="my-4">
                    <div className=" flex">
                      <div className="flex space-x-1 items-center py-1 px-2 border border-red-600">
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-red-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </span>
                        <p>{`${formatDate(item.start_date).day}th ${formatDate(item.start_date).month} ${formatDate(item.start_date).year} ${formatDate(item.start_date).at} ${formatDate(item.start_date).hour}: 00 ${formatDate(item.start_date).hour12} to ${formatDate(item.end_date).day}th ${formatDate(item.end_date).month} ${formatDate(item.end_date).year}` }</p>
                      </div>
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
