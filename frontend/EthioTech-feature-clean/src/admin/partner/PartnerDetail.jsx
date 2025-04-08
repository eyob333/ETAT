/* eslint-disable radix */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { partnerSelector } from '../../redux/store';

function PartnerDetail() {
  const { id } = useParams();
  const { partners } = useSelector(partnerSelector);
  const filteredPartner = partners.filter((partner) => partner.id === parseInt(id));
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center justify-center px-3 py-10 lg:w-3/5 md:4/5">

        <div className="flex mb-6 w-full justify-between items-center">
          <Link
            to="/admin/partners"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            back
          </Link>

          <Link
            to={`/admin/updatePartner/${filteredPartner[0].id}`}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Update Partner
          </Link>
        </div>
        <div className="flex mb-6 w-full items-start">
          <div className="w-full">
            <h1
              className="w-full text-gray-900 sm:text-sm sm:leading-6 lg:text-2xl font-semibold"
            >
              {filteredPartner[0].name}
            </h1>

          </div>
        </div>
        <div className="flex mb-6 w-full items-center justify-center">
          <img className="w-full lg rounded-sm h-72" src={filteredPartner[0].logo} alt="Colors" />

        </div>
        <div className="w-full">
          <div
            className="w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6 lg:text-base"
          >
            {filteredPartner[0].body}
          </div>
        </div>
        <div className="w-full">
          <div
            className="w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6 lg:text-base"
          >
            The key offerings are:
            {' '}
            {filteredPartner[0].key_offerings}
          </div>
        </div>
      </div>
    </div>
  );
}
export default PartnerDetail;
