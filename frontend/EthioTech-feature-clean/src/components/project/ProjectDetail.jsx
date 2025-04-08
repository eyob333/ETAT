/* eslint-disable react/prop-types */
// ModalContent.js

import React from 'react';
import { Modal } from 'react-responsive-modal';
import { Link } from 'react-router-dom';

const ProjectDetail = ({ openModalId, dataArray, closeModal }) => {
  function getYearFromDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    return year;
  }

  function formatDate(dateString) {
    const options = {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    };

    const date = new Date(dateString);
    const formattedDate = date.toLocaleString('en-US', options).replace(',', '');

    // const [month, day, time, hour12] = formattedDate.split(' ');

    return {
      formattedDate,
    };
  }

  return (
    <>
      <Modal open onClose={closeModal} center>
        <div className="max-w-5xl">
          <div className="pt-1">
            <div className="relative w-full object-cover  flex flex-col justify-start items-start">
              <p className="pt-3 text-2xl text-blue-700 font-poppins mb-2 ">
                {dataArray.find((data) => data.id === openModalId)?.title}
              </p>
              <img
                className="object-center object-cover h-52 w-full opacity-1 transition duration-300 ease-in-out group-hover:opacity-50 group-hover:scale-105"
                src={dataArray.find((data) => data.id === openModalId)?.picture}
                alt=""
              />
              <h1 className="pt-3 text-lg text-mainColor font-poppins">PERIOD:</h1>
              <h3 className="text-sm text-gray-400 font-poppins">
                {getYearFromDate(dataArray.find((data) => data.id === openModalId)?.start_date)}
                {dataArray.find((data) => data.id === openModalId)?.end_date !== null
                  ? ` - ${getYearFromDate(dataArray.find((data) => data.id === openModalId)?.end_date)}` : ''}
              </h3>
              <p className="pt-3 text-lg text-mainColor font-poppins">Thematic Area:</p>
              <h3 className="text-sm text-gray-400 font-poppins">
                {dataArray.find((data) => data.id === openModalId)?.area}
              </h3>
              <p className="pt-3 text-lg text-mainColor font-poppins">STATUS:</p>
              <h3 className="text-sm text-gray-400 font-poppins">
                {dataArray.find((data) => data.id === openModalId)?.status ? 'Ongoing' : 'Completed'}
              </h3>
              <p className="pt-3 text-lg text-mainColor font-poppins">DESCRIPTION:</p>
              <h3 className="text-sm text-gray-400 font-poppins">
                {dataArray.find((data) => data.id === openModalId)?.body}
              </h3>
              {dataArray.find((data) => data.id === openModalId)?.doc && (
              <Link to={dataArray.find((data) => data.id === openModalId)?.doc} target="_blank" className="pt-3 text-lg text-secondColor hover:opacity-40 font-poppins">View full documentation</Link>)}
              <h3 className="text-sm text-mainColor opacity-70 font-poppins mt-3">
                {dataArray.find((data) => data.id === openModalId)?.createdAt !== dataArray.find((data) => data.id === openModalId)?.updatedAt ? `Updated at: ${formatDate(dataArray.find((data) => data.id === openModalId)?.updatedAt).formattedDate}` : ''}
              </h3>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProjectDetail;
