
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { fetchProducts, removeProduct } from '../../redux/product/productSlice';
import { productSelector } from '../../redux/store';
import { useDeleteProductMutation } from '../../redux/product/productApiSlice';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { MdReadMore } from 'react-icons/md';
import LoadingScreen from '../../conditions/LoadingScreen';
import ButtonLoadingScreen from '../../conditions/ButtonLoadingScreen';

export default function Products() {
  const dispatch = useDispatch();
  const [deleteProduct, { isLoading: loading }] = useDeleteProductMutation();
  const { products, isLoading } = useSelector(productSelector);
  const [searchInput, setSearchInput] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const [open, setOpen] = useState(null);

  const handleOpenModal = (id) => {
    setOpen(id);
  };

  const handleCloseModal = () => {
    setOpen(null);
  };

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const handleDelete = async (id) => {
    try {
      console.log(id);
      const res = await deleteProduct(id).unwrap();
      setOpen(null);
      if (res.message === 'Product deleted successfully') {
        dispatch(removeProduct(id));
        toast.success('You have successfully deleted a product');
      }
    } catch (error) {
      if (error.status === 400) {
        toast.error('Product cannot be deleted');
      } else {
        toast.error('Something went wrong');
      }
      console.log(error);
    }
  };

  let content;
  let filteredProducts;
  if (isLoading) {
    content = <LoadingScreen />;
  } else if (!isLoading && products.length > 0) {
    // Filter by search input and category
    filteredProducts = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchInput.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });

    content = (
      <section className="lg:pt-[30px] pt-6 pb-12 lg:pb-[0px]">
        <div className="container">
          <div className="flex flex-wrap px-6 pb-6 gap-6 md:gap-0 -mx-2">
            {filteredProducts.length === 0 ? <h1 className="text-2xl text-center">No products found</h1>
              : filteredProducts.map((item) => (
                <div className="w-full md:w-1/2 md:mt-4 lg:w-1/3 h-96 px-4" key={item.name}>
                  <div
                    className="
    p-4
    h-full
    md:px-7
    xl:px-10
    bg-white
    shadow-md
    border
    hover:shadow-lg
    transition duration-300 ease-in-out
    flex
    flex-col
    justify-center
    relative
  "
                  >
                    <div className="absolute top-2 right-2 text-lg" type="button">
                      <div className="flex gap-2">
                        <Link className="text-green-300 text-xl" to={`/admin/productDetail/${item.id}`} title="View Details">
                          <MdReadMore />
                        </Link>
                        <Link className="text-blue-300" to={`/admin/updateProduct/${item.id}`} title="Edit Product">
                          <AiFillEdit />
                        </Link>
                        <button className="text-red-600" type="button" onClick={() => handleOpenModal(item.id)} title="Delete Product">
                          <AiFillDelete />
                        </button>
                        <Modal open={open === item.id} onClose={handleCloseModal} center>
                          <div className="flex flex-col gap-1 pt-7">
                            <h2>Are you sure you want to delete</h2>
                            <p>
                              Product:
                              {' '}
                              {item.name}
                            </p>
                            <div className="flex gap-2 mt-2 justify-start items-center">
                              <button className="bg-red-500 flex gap-2 justify-center items-center text-white px-4 py-1 rounded-md" onClick={() => handleDelete(item.id)} type="button">
                                {loading ? <ButtonLoadingScreen /> : ''}
                                <span>delete</span>
                              </button>
                              <button className="bg-mainColor text-white px-4 py-1 rounded-md" onClick={handleCloseModal} type="button">cancel</button>
                            </div>
                          </div>
                        </Modal>
                      </div>
                    </div>
                    <h4 className="font-semibold font-raleway text-2xl text-dark mb-2 break-words">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-500 mb-2">
                      Category: {item.category}
                    </p>
                    {item.price && (
                      <p className="text-sm text-gray-700 mb-2">
                        Price: ${parseFloat(item.price).toFixed(2)}
                      </p>
                    )}
                    <div className="w-1/3 h-1.5 bg-secondColor mb-4 " />
                    <p className="text-body-color text-sm font-poppins break-words line-clamp-6 leading-6">
                      {item.description}
                    </p>
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
        <div className="flex items-center space-x-4">
          <div className="mt-1 relative lg:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-mainColor" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input 
              type="text" 
              name="search" 
              id="topbar-search" 
              className="bg-gray-50 border border-mainColor text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full pl-10 px-2.5 py-2" 
              placeholder="Search" 
              value={searchInput} 
              onChange={handleSearchInput} 
            />
          </div>
          <div className="mt-1">
            <select
              value={categoryFilter}
              onChange={handleCategoryChange}
              className="bg-gray-50 border border-mainColor text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full px-2.5 py-2"
            >
              <option value="all">All Categories</option>
              <option value="Laptop computers">Laptop computers</option>
              <option value="Printing devices">Printing devices</option>
              <option value="Software licenses">Software licenses</option>
            </select>
          </div>
        </div>
        <Link to="/admin/addProduct" className="px-12 pb-2 pt-1 rounded-md bg-mainColor text-white">Add new product</Link>
      </div>
      <div>
        {content}
      </div>
    </div>
  );
}


