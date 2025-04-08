/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { fetchEvent, removeEvent } from '../../redux/event/eventSlice';
import { eventSelector } from '../../redux/store';
import { useDeleteEventMutation } from '../../redux/event/eventApiSlice';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { MdReadMore } from 'react-icons/md';
import LoadingScreen from '../../conditions/LoadingScreen';
import ButtonLoadingScreen from '../../conditions/ButtonLoadingScreen';

export default function Events() {
  const dispatch = useDispatch();
  const [deleteEvent, { isLoading: loading }] = useDeleteEventMutation();
  const { events, isLoading } = useSelector(eventSelector);
  const [searchInput, setSearchInput] = useState('');

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const [open, setOpen] = useState(null);

  const handleOpenModal = (id) => {
    setOpen(id);
  };

  const handleCloseModal = () => {
    setOpen(null);
  };

  useEffect(() => {
    if (events.length === 0) {
      dispatch(fetchEvent());
    }
  }, [dispatch, events.length]);

  const handleDelete = async (id) => {
    try {
      console.log(id);
      const res = await deleteEvent(id).unwrap();
      setOpen(null);
      if (res.message === 'Event deleted successfully') {
        dispatch(removeEvent(id));
        toast.success('you have successfully deleted a Event');
      }
    } catch (error) {
      if (error.status === 400) {
        toast.error('User cannot be deleted');
      } else {
        toast.error('something went wrong');
      }
      console.log(error);
    }
  };

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

  let content;
  let filteredEvent;
  if (isLoading) {
    content = <LoadingScreen />;
  } else if (!isLoading && events.length > 0) {
    filteredEvent = events.filter((event) => event.title.toLowerCase().includes(searchInput.toLowerCase()));
    content = (
      <section className="lg:pt-[30px]  pt-6 pb-12 lg:pb-[0px]">
        <div className="container">
          <div className="flex flex-wrap px-6 pb-6 gap-x-6 gap-y-10 md:gap-0 -mx-2">
            {filteredEvent.length === 0 ? <h1 className="text-2xl font-semibold text-center w-full">No Event Found</h1>
              : filteredEvent.map((item) => (
                <div className="w-full md:w-1/2 md:mt-4 lg:w-1/3  px-4" key={item.id}>
                  <div
                    className="
    p-4
    h-72
    md:px-7
    xl:px-10
    bg-white
    border
    transition duration-300 ease-in-out
    flex
    flex-col
    justify-center
    relative
    hover:drop-shadow-xl rounded-lg shadow-lg overflow-hidden
  "
                  >
                    <div className="absolute top-2 right-2 text-lg" type="button">
                      <div className="flex gap-2">
                        <Link className="text-green-300 text-xl" to={`/admin/eventDetail/${item.id}`} title="View Details">
                          <MdReadMore />
                        </Link>
                        <Link className="text-blue-300" to={`/admin/updateEvent/${item.id}`} title="Edit Event">
                          <AiFillEdit />
                        </Link>
                        <button className="text-red-600" type="button" onClick={() => handleOpenModal(item.id)} title="Delete Event">
                          <AiFillDelete />
                        </button>
                        <Modal open={open === item.id} onClose={handleCloseModal} center>
                          <div className="flex flex-col gap-1 pt-7">
                            <h2>Are you sure you whan to delete</h2>
                            <p>
                              Event:
                              {' '}
                              {item.title}
                            </p>
                            <div className="flex gap-2 mt-2 justify-start items-center">
                              <button className="bg-red-500 flex gap-2 justify-center items-center text-white px-4 py-1 rounded-md" onClick={() => handleDelete(open)} type="button">
                                {loading ? <ButtonLoadingScreen /> : ''}
                                <span>delete</span>
                              </button>
                              <button className="bg-mainColor text-white px-4 py-1 rounded-md" onClick={handleCloseModal} type="button">cancle</button>
                            </div>
                          </div>
                        </Modal>
                      </div>
                    </div>
                    <h4 className="font-semibold font-raleway text-2xl text-dark mb-3 break-words  my-2 line-clamp-2">
                      {item.title.length > 12 ? `${item.title.substring(0, 16)}....` : item.title}
                    </h4>
                    {/* <div className="w-1/3 h-1.5 bg-secondColor mb-4" /> */}
                    <p className="text-body-color text-base font-poppins break-words text-body-color line-clamp-3 leading-6 ">
                      {item.body}
                    </p>
                    <p className="text-body-color text-sm font-poppins break-words text-body-color line-clamp-5 leading-6 mt-2">
                      Location:
                      {' '}
                      {item.location}
                    </p>

                    <div className="flex space-x-1 items-center py-1 px-2 border border-red-600 mt-2">
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
                      <p>
                        {/* Starts On: */}
                        {/* {' '} */}
                        {convertDateTimeToAMPM(item.start_date)}
                        {' to '}
                        {convertDateTimeToAMPM(item.end_date)}
                      </p>
                    </div>
                  </div>
                </div>

              ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="flex flex-col h-auto overflow-x-hidden py-10">
      <div className="flex justify-between items-center px-8">
        <div>
          <div className="mt-1 relative lg:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-mainColor" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input type="text" name="email" id="topbar-search" className="bg-gray-50 border border-mainColor text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full pl-10 px-2.5 py-2" placeholder="Search" value={searchInput} onChange={handleSearchInput} />
          </div>
        </div>
        <Link to="/admin/addEvent" className="px-12 pb-2 pt-1 rounded-md bg-mainColor text-white lg:w-56 w-52 ml-3 mb-2">Add New Event</Link>
      </div>
      <div>
        {content}
      </div>
    </div>
  );
}
