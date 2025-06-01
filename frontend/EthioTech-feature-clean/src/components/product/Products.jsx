import React, { useState } from 'react';
import { useGetProductsQuery } from '../../redux/product/productApiSlice';
import ProductCard from './ProductCard';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { data: products = [], isLoading, error } = useGetProductsQuery();

  // Get unique categories
  const categories = ['all', ...new Set(products?.map(product => product.category) || [])];

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'all'
    ? products
    : products?.filter(product => product.category === selectedCategory) || [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondColor"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">Failed to load products. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold font-raleway text-dark mb-4">Our Products</h1>
        <div className="w-24 h-1 bg-secondColor mx-auto mb-6"></div>
        <p className="text-body-color text-lg max-w-2xl mx-auto">
          Discover our range of high-quality products designed to meet your needs
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`
              px-6 py-2 rounded-full text-sm font-medium transition-colors
              ${selectedCategory === category
                ? 'bg-secondColor text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
            `}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="flex flex-wrap -mx-4">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default Products; 