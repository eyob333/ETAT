
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../../assets/image/ethiotech2.png';
import { eventSelector } from '../../redux/store';
import { motion } from 'framer-motion'; // Import motion from framer-motion
// import { cn } from "@/lib/utils"

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
  };
}

const NoEventsMessage = () => {
  const [displayText, setDisplayText] = useState('');
  const text = "Stay tuned! We are actively planning our next events.";
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (index < text.length) {
        setDisplayText((prevText) => prevText + text.charAt(index));
        setIndex(index + 1);
      } else {
        clearInterval(typingInterval);
      }
    }, 50); // Adjust the typing speed here (milliseconds per character)

    return () => clearInterval(typingInterval);
  }, [index, text]);

  return (
    <motion.h1
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="text-2xl font-bold text-center whitespace-nowrap overflow-hidden border-r-2 border-gray-300 dark:border-gray-700" // Added styles for typing effect
      style={{
        animation: 'none', // Remove default animation
      }}
    >
      {displayText}
    </motion.h1>
  );
};

const AnimatedLink = ({ to, children, className, ...props }) => {
    const [revealedText, setRevealedText] = useState('');
    const [index, setIndex] = useState(0);
    const text = children;
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        let intervalId;

        const startTyping = () => {
            intervalId = setTimeout(() => {
                if (isMounted.current && index < text.length) {
                    setRevealedText((prevText) => prevText + text.charAt(index));
                    setIndex(index + 1);
                }
            }, 30); // Adjust for typing speed

            if (index >= text.length) {
                clearTimeout(intervalId);
            }
        };

      startTyping();

        return () => {
            isMounted.current = false;
            clearTimeout(intervalId);
        };
    }, [index, text]);

    const linkClassName = cn(
        "group inline-flex items-center font-semibold transition-colors duration-300",
        "relative", // Make sure the link is a positioning context
        className
    );

    return (
        <Link to={to} className={linkClassName} {...props}>
            <span className="mr-1 text-[#e5e7eb]">{revealedText}</span> {/* Changed text color here */}
            <span
                className="inline-block transition-transform duration-300 group-hover:translate-x-2"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </span>
        </Link>
    );
};

export default function Events() {
  const [day, setDay] = useState('00');
  const [hour, setHour] = useState('00');
  const [min, setMin] = useState('00');
  const [sec, setSec] = useState('00');

  let interval = useRef();
  const setTimer = (month, dayy, year) => {
    const countDownDate = new Date(`${month} ${dayy}, ${year} 00:00:00`).getTime();
    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        // stop timer
        clearInterval(interval.current);
      } else {
        // run timer
        setDay(days);
        setHour(hours);
        setMin(minutes);
        setSec(seconds);
      }
    }, 1000);
  };

  const eventTimmer = (m, d, y) => {
    useEffect(() => {
      setTimer(m, d, y);
      return () => {
        clearInterval(interval.current);
      };
    });
  };

  const { events } = useSelector(eventSelector);
  return (
    <div className="relative z-10 mx-auto h-auto pt-10 md:14 flex w-full flex-col items-center md:gap-14 gap-10 justify-center px-4 md:px-8">
      <h2
        className="
                font-bold
                text-2xl
                sm:text-2xl
                md:text-[40px]
                text-dark
                font-raleway
                "
      >
        Events
      </h2>
      <div className="mx-auto relative mb-20 flex flex-col w-full items-center gap-12 justify-center md:px-8">
        {events.filter((event) => event.status_event === true).slice(0, 1).length === 0 ? (
          <NoEventsMessage />
        ) : (
          events
            .filter((event) => event.status_event === true)
            .slice(0, 1)
            .map((item) => {
              const startDate = new Date(item.start_date);
              const year = startDate.getFullYear(); // Get the year
              const monthName = formatDate(item.start_date).month;
              const dayOfMonth = formatDate(item.start_date).day;
              return (
                <div key={item.id} className="flex flex-col w-full bg-white rounded shadow-2xl sm:w-3/4 md:w-1/2 lg:w-full">
                  <div
                    className="w-full h-64 bg-top bg-cover rounded-t"
                    style={{
                      backgroundImage: `url(${item.picture})`,
                      backgroundSize: 'contain',
                      backgroundPosition: 'contain',
                      backgroundRepeat: 'no-repeat',
                    }}
                  />
                  <div className="flex flex-col w-full md:flex-row">
                    <div className="flex flex-row justify-around p-4 font-bold leading-none text-gray-800 uppercase bg-gray-400 rounded md:flex-col md:items-center md:justify-center md:w-1/4">
                      <div className="md:text-3xl">{monthName}</div>
                      <div className="md:text-6xl">{dayOfMonth}</div>
                      <div className="md:text-xl">
                        {formatDate(item.start_date).time}
                        {' '}
                        {formatDate(item.start_date).hour12}
                      </div>
                    </div>
                    <div className="p-4 font-normal text-gray-800 md:w-3/4">
                      <h1 className="mb-4 text-4xl font-bold leading-none tracking-tight text-gray-800">{item.title}</h1>
                      <p className="leading-normal">
                        {item.body.split(' ').slice(0, 40).join(' ')}
                        ..........
                      </p>
                      <div className="flex flex-row items-center mt-4 text-gray-700">
                        <div className="w-1/2 pb-10 md:pb-0">
                            <AnimatedLink to="/events" className="md:bg-red-600 hover:bg-secondColor md:text-white font-semibold md:py-2 md:px-9 bg-transparent text-md">
                              LEARN MORE
                            </AnimatedLink>
                        </div>
                        <div className="w-1/2 flex justify-end">
                          <img src={logo} alt="" className="w-20" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-0 text-white flex gap-3 px-4 rounded-br-lg py-2 bg-red-700 z-20">
                    {eventTimmer(monthName, dayOfMonth, year)}
                    <div className="flex flex-col">
                      <div className="flex gap-2 justify-center items-center">
                        <span className="text-4xl flex items-center justify-center font-poppins font-medium">
                          {day}
                        </span>
                        <span className="text-lg">
                          :
                        </span>
                      </div>
                      <span className="text-xs">Days</span>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex gap-2 justify-center items-center">
                        <span className="text-4xl flex items-center justify-center font-poppins font-medium">
                          {hour}
                        </span>
                        <span className="text-lg">
                          :
                        </span>
                      </div>
                      <span className="text-xs">Hours</span>
                    </div>

                    <div className="flex flex-col">
                      <div className="flex gap-2 justify-center items-center">
                        <span className="text-4xl flex items-center justify-center font-poppins font-medium">
                          {min}
                        </span>
                        <span className="text-lg">
                          :
                        </span>
                      </div>
                      <span className="text-xs">Minutes</span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-4xl flex items-center justify-center font-poppins font-medium">
                        {sec}
                      </span>
                      <span className="text-xs">Seconds</span>
                    </div>
                  </div>
                </div>
              );
            })
        )}
      </div>
    </div>
  );
}


