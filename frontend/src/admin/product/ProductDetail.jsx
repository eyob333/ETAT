import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { productSelector } from '../../redux/store';

function ProductDetail() {
  const { id } = useParams();
  const { products } = useSelector(productSelector);
  const filteredProduct = products.filter((product) => product.id === parseInt(id));
  
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center justify-center px-3 py-10 lg:w-3/5 md:4/5">

        <div className="flex mb-6 w-full justify-between items-center">
          <Link
            to="/admin/products"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            back
          </Link>

          <Link
            to={`/admin/updateProduct/${filteredProduct[0].id}`}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Update Product
          </Link>
        </div>
        
        <div className="flex mb-6 w-full items-start">
          <div className="w-full">
            <h1
              className="w-full text-gray-900 sm:text-sm sm:leading-6 lg:text-2xl font-semibold"
            >
              {filteredProduct[0].name}
            </h1>
          </div>
        </div>
        
        <div className="flex mb-4 w-full items-start">
          <div className="w-full">
            <p className="text-gray-600">
              <span className="font-medium">Category:</span> {filteredProduct[0].category}
            </p>
          </div>
        </div>
        
        {filteredProduct[0].price && (
          <div className="flex mb-4 w-full items-start">
            <div className="w-full">
              <p className="text-gray-600">
                <span className="font-medium">Price:</span> ${parseFloat(filteredProduct[0].price).toFixed(2)}
              </p>
            </div>
          </div>
        )}
        
        <div className="flex mb-6 w-full items-center justify-center">
          <img className="w-full lg rounded-sm h-72" src={filteredProduct[0].picture} alt="Product" />
        </div>

        <div className="flex mb-6 w-full items-start">
          <div className="w-full">
            <div
              className="w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6 lg:text-base"
            >
              {filteredProduct[0].description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;


