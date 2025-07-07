import React from 'react';
import { useSelector } from 'react-redux';
import { partnerSelector, projectSelector, serviceSelector, productSelector } from '../../redux/store';
import team from '../../assets/team.json';
import { Link } from 'react-router-dom';

export default function Information() {
  const { projects } = useSelector(projectSelector);
  const { partners } = useSelector(partnerSelector);
  const { services } = useSelector(serviceSelector);
  const { products } = useSelector(productSelector);

  return (
    <div className=" relative z-20 flex w-full justify-center md:pt-5 items-center">
      <div className="container flex flex-col bg-white">
        <div className="w-full draggable">
          <div className="container flex flex-col items-center gap-16 my-10">
            <div className="grid w-full grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-y-8">
              <div className="flex flex-col items-center text-mainColor">
                <Link to={'projects'} >       
                  <h3 className="text-5xl font-extrabold leading-tight text-center text-dark-grey-900">
                    <span id="countto1" />
                    {projects.length}
                    +
                  </h3> 
               
                  <p className="text-base font-medium leading-7 text-center text-dark-grey-600">Successful Projects</p>
                 </Link>
              </div>
              <div className="flex flex-col items-center text-mainColor">
                <Link to={'services'} >
                  <h3 className="text-5xl font-extrabold leading-tight text-center text-dark-grey-900">
                    <span id="countto2" />
                    {services.length}
                  </h3>
               
                  <p className="text-base font-medium leading-7 text-center text-dark-grey-600">Service Growth</p>
                 </Link>
              </div>
              <div className="flex flex-col items-center text-mainColor">
                <Link to={'partner'} >
                  <h3 className="text-5xl font-extrabold leading-tight text-center text-dark-grey-900">
                    <span id="countto3" />
                    {partners.length}
                    +
                  </h3>
               
                  <p className="text-base font-medium leading-7 text-center text-dark-grey-600">Global Partners</p>
                 </Link>
              </div>
              <div className="flex flex-col items-cente text-mainColor">
                <Link to={'products'} > 
                  <h3 className="text-5xl font-extrabold leading-tight text-center text-dark-grey-900">
                    <span id="countto4" />
                    {products.length}
                    +
                  </h3>
                  <p className="text-base font-medium leading-7 text-center text-dark-grey-600">Reliable Products</p>
                 </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

