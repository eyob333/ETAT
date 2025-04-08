/* eslint-disable react/prop-types */
import React from 'react';
import { Modal } from 'react-responsive-modal';

const TeamDetail = ({ openModalId, closeModal, dataArray }) => (
  <Modal open onClose={closeModal} center>
    <div className="grid grid-cols-5 gap-4 p-5 max-w-4xl">
      <div className="lg:col-span-2 col-span-5 max-h-80 h-80 sm-hidden">
        <img
          className="object-center object-fill h-80 sm-invisible w-full opacity-1 transition duration-300 ease-in-out group-hover:opacity-50"
          src={dataArray.find((data) => data.id === openModalId)?.imageUrl}
          alt=""
        />
      </div>
      <div className="lg:px-4 lg:col-span-3 col-span-5">
        <div>
          <h1 className="text-grey font-railway-500 text-2xl font-bold pb-2">{dataArray.find((data) => data.id === openModalId)?.name}</h1>
          <h2 className="text-grey font-poppins-200 text-sm pb-8">{dataArray.find((data) => data.id === openModalId)?.role}</h2>
          <h2 className="text-mainColor font-poppins-400 font-bold text-sm pb-1">Expert Areas</h2>
          <h2 className="text-grey font-poppins-400 text-sm pb-5">{dataArray.find((data) => data.id === openModalId)?.expertise}</h2>
          <h2 className="text-mainColor font-poppins-400 font-bold text-sm pb-1">Education</h2>
          <h2 className="text-grey font-poppins-400 text-sm pb-5">{dataArray.find((data) => data.id === openModalId)?.education}</h2>
          <p className="text-grey font-poppins-500 text-sm pb-5">
            {dataArray.find((data) => data.id === openModalId)?.description}
          </p>
        </div>
      </div>
    </div>
  </Modal>
);

export default TeamDetail;
