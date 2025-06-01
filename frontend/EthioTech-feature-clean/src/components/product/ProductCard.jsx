import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
      <div className="
        p-4
        pt-9
        h-full
        md:px-7
        xl:px-10
        bg-white
        shadow-md
        border
        border-secondColor
        hover:shadow-lg
        hover:bg-customDark
        hover:text-white
        transition duration-300 ease-in-out
        flex
        flex-col
        justify-start
        relative
        group
        overflow-hidden
      ">
        <div className="relative z-10">
          <h4 className="font-semibold font-raleway text-2xl text-dark mb-3 group-hover:text-white">
            {product.name}
          </h4>
          <div className="w-1/3 h-1.5 bg-secondColor mb-4" />
          <p className="text-body-color text-sm font-poppins mb-4 group-hover:text-white">
            {product.description}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-secondColor group-hover:text-white">
              ${product.price}
            </span>
            <span className="text-sm text-gray-600 group-hover:text-white">
              {product.category}
            </span>
          </div>
        </div>
        <img
          className="absolute z-0 top-0 left-0 invisible object-center object-cover group-hover:visible h-full w-full bg-black transition duration-200 ease-in-out group-hover:brightness-50 group-hover:opacity-80 group-hover:scale-110"
          src={product.picture}
          alt={product.name}
        />
      </div>
    </div>
  );
};

export default ProductCard; 