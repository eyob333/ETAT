/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

export default function Trainigs() {
  return (
    <div className="relative z-20 flex px-5 md:px-0 flex-col justify-center items-center bg-white w-full h-auto ">
      <div className="flex flex-wrap -mx-4">
        <div className="w-full px-4">
          <div className="text-center mx-auto mb-12 lg:mb-20 max-w-[510px]">
            <h2
              className="
                   font-bold
                   text-3xl
                   sm:text-4xl
                   md:text-[40px]
                   text-dark
                   mb-4
                   font-raleway
                   "
            >
              Trainings
            </h2>
            <p className="text-base font text-gray-400">
              There are many variations of passages of Lorem Ipsum available
              but the majority have suffered alteration in some form.
            </p>
          </div>
        </div>
      </div>
      <div className="relative z-20 flex flex-col md:flex-row full gap-4 mx-auto mb-20">
        <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm">
          <a href="#">
            <img className="rounded-t-lg" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="img" />
          </a>
          <div className="p-5">
            <a href="#">
              <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">Noteworthy technology acquisitions 2021</h5>
            </a>
            <p className="font-normal text-gray-700 mb-3">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
          </div>
        </div>

        <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm">
          <a href="#">
            <img className="rounded-t-lg" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="img" />
          </a>
          <div className="p-5">
            <a href="#">
              <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">Noteworthy technology acquisitions 2021</h5>
            </a>
            <p className="font-normal text-gray-700 mb-3">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
          </div>
        </div>

        <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm">
          <a href="#">
            <img className="rounded-t-lg" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="img" />
          </a>
          <div className="p-5">
            <a href="#">
              <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">Noteworthy technology acquisitions 2021</h5>
            </a>
            <p className="font-normal text-gray-700 mb-3">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
