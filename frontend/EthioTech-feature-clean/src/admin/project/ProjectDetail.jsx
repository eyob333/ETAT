/* eslint-disable radix */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { projectSelector } from '../../redux/store';

function ProjectDetail() {
  const { id } = useParams();
  const { projects } = useSelector(projectSelector);
  const filteredProject = projects.filter((project) => project.id === parseInt(id));
  const url = new URL(filteredProject[0].doc);
  const filename = url.pathname.split('/').pop();
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center justify-center px-3 py-10 lg:w-3/5 md:4/5">

        <div className="flex mb-6 w-full justify-between items-center">
          <Link
            to="/admin/projects"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            back
          </Link>

          <Link
            to={`/admin/updateProject/${filteredProject[0].id}`}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
          >
            Update Project
          </Link>
        </div>
        <div className="flex mb-6 w-full items-start">
          <div className="w-full">
            <h1
              className="w-full text-gray-900 sm:text-sm sm:leading-6 lg:text-2xl font-semibold"
            >
              {filteredProject[0].title}
            </h1>

          </div>
        </div>
        <div className="flex mb-6 w-full items-center justify-center">
          <img className="w-full lg rounded-sm h-72" src={filteredProject[0].picture} alt="Project" />

        </div>

        {/* {filteredProject[0].picture ?? (
          <div className="flex mb-6 w-full items-center justify-center">
            <img className="w-full lg rounded-sm h-72" src={filteredProject[0].picture} alt="Colors" />
          </div>
        )} */}

        <div className="flex mb-3 w-full items-start">
          <div className="w-full">
            <div
              className="w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6 lg:text-base"
            >
              {filteredProject[0].body}
            </div>
          </div>
        </div>

        <div className="w-full">
          <div
            className="w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6 lg:text-base"
          >
            Status:
            {' '}
            {filteredProject[0].status ? 'Ongoing' : 'Completed'}
          </div>
        </div>

        <div className="w-full">
          <div
            className="w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6 lg:text-base"
          >
            Area:
            {' '}
            {filteredProject[0].area}
          </div>
        </div>

        <div className="w-full">
          <div
            className="w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6 lg:text-base"
          >
            Start Date:
            {' '}
            {new Date(filteredProject[0].start_date).toISOString().split('T')[0]}
          </div>
        </div>

        <div className="w-full">
          <div className="w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6 lg:text-base">
            End Date:
            {' '}
            {filteredProject[0].end_date
              ? new Date(filteredProject[0].end_date).toISOString().split('T')[0]
              : 'N/A'}
          </div>
        </div>
        <div className="w-full">
          <div className="w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6 lg:text-base">
            Document:
            {' '}
            {
  filteredProject[0].doc ? (
    <Link to={filteredProject[0].doc} target="_blank" className="text-blue-600">
      {filename}
    </Link>
  ) : (
    'No document available'
  )
}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProjectDetail;
