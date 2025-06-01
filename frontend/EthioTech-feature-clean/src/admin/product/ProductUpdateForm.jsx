import React, { useEffect, useState } from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { productSelector } from '../../redux/store';
import { useUpdateProductDataMutation, useGetProductsQuery } from '../../redux/product/productApiSlice';
import { updateProduct } from '../../redux/product/productSlice';
import LoadingScreen from '../../conditions/LoadingScreen';
import ButtonLoadingScreen from '../../conditions/ButtonLoadingScreen';

const validationSchema = Yup.object().shape({
  productName: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must not exceed 50 characters')
    .required('Name is required'),
  productDescription: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must not exceed 500 characters')
    .required('Description is required'),
  productCategory: Yup.string()
    .required('Category is required')
    .oneOf(['Laptop computers', 'Printing devices', 'Software licenses'], 'Invalid category'),
  productPrice: Yup.number()
    .typeError('Price must be a number')
    .min(0, 'Price cannot be negative')
    .nullable()
});

function ProductUpdateForm() {
  const navigate = useNavigate();
  const [updateProductMutation, { isLoading: loading }] = useUpdateProductDataMutation();
  const { data: products = [], isLoading } = useGetProductsQuery();
  const dispatch = useDispatch();
  const [file, setFile] = useState('');
  const { id } = useParams();

  const handleFileChanges = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      // Create form data
      const formData = new FormData();
      
      // Only append file if a new one was selected
      if (file) {
        formData.append('image', file);
      }
      
      // Append other form fields
      formData.append('name', values.productName);
      formData.append('description', values.productDescription);
      formData.append('category', values.productCategory);
      
      // Only append price if it has a value
      if (values.productPrice !== undefined && values.productPrice !== '') {
        formData.append('price', values.productPrice);
      }
      
      // Send the update request with the ID from URL params
      const res = await updateProductMutation({ formData, id }).unwrap();
      
      // Update the Redux store
      dispatch(updateProduct(res));
      
      // Show success message and navigate
      setSubmitting(false);
      toast.success('Product Updated Successfully');
      navigate('/admin/products');
    } catch (error) {
      console.error('Error updating product:', error);
      setSubmitting(false);
      setErrors(error);
      toast.error('Something went wrong');
    }
  };

  let content;
  if (isLoading) {
    content = <LoadingScreen />;
  } else if (!isLoading && products.length > 0) {
    const filteredProduct = products.find(product => product.id === parseInt(id));
    
    if (!filteredProduct) {
      content = (
        <div className="text-center py-12">
          <p className="text-red-500 text-lg">Product not found</p>
          <Link
            to="/admin/products"
            className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Back to Products
          </Link>
        </div>
      );
    } else {
      content = (
        <div className="">
          <center>
            <div className="flex mb-6 w-full justify-start pt-10 px-8 items-center">
              <Link
                to="/admin/products"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                back
              </Link>
            </div>
            <div className="text-center px-8 w-full">
              <h1 className="block text-3xl font-bold text-gray-800 w-5/6">Update Product</h1>
            </div>
            <Formik
              initialValues={{
                productName: filteredProduct.name,
                productDescription: filteredProduct.description,
                productCategory: filteredProduct.category,
                productPrice: filteredProduct.price || '',
              }}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              <Form className="flex flex-col items-start px-8 py-10 w-full">
                <div className="flex mb-6 w-5/6 items-start">
                  <label htmlFor="productName" className="text-sm font-medium leading-6 text-gray-900 w-24 mt-2 flex items-start">
                    Name*
                  </label>
                  <div className="w-4/5">
                    <Field
                      id="productName"
                      name="productName"
                      placeholder="Product Name"
                      className="w-full rounded-md border-2 py-1.5 border-grey-200 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring px-2 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage name="productName" component="div" className="text-red-500 flex items-start" />
                  </div>
                </div>

                <div className="flex mb-6 w-5/6 items-start">
                  <label htmlFor="productCategory" className="text-sm font-medium leading-6 text-gray-900 w-24 mt-2 flex items-start">
                    Category*
                  </label>
                  <div className="w-4/5">
                    <Field
                      as="select"
                      id="productCategory"
                      name="productCategory"
                      className="w-full rounded-md border-2 py-1.5 border-grey-200 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring px-2 sm:text-sm sm:leading-6"
                    >
                      <option value="">Select a category</option>
                      <option value="Laptop computers">Laptop computers</option>
                      <option value="Printing devices">Printing devices</option>
                      <option value="Software licenses">Software licenses</option>
                    </Field>
                    <ErrorMessage name="productCategory" component="div" className="text-red-500 flex items-start" />
                  </div>
                </div>

                <div className="flex mb-6 w-5/6 items-start">
                  <label htmlFor="productPrice" className="text-sm font-medium leading-6 text-gray-900 w-24 mt-2 flex items-start">
                    Price
                  </label>
                  <div className="w-4/5">
                    <Field
                      id="productPrice"
                      name="productPrice"
                      placeholder="Price (optional)"
                      type="number"
                      step="0.01"
                      min="0"
                      className="w-full rounded-md border-2 py-1.5 border-grey-200 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring px-2 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage name="productPrice" component="div" className="text-red-500 flex items-start" />
                  </div>
                </div>

                <div className="flex mb-6 w-5/6 items-start">
                  <label htmlFor="productDescription" className="text-sm font-medium leading-6 text-gray-900 w-24 mt-2 flex items-start">
                    Description*
                  </label>
                  <div className="w-4/5">
                    <Field
                      as="textarea"
                      rows={5}
                      id="productDescription"
                      name="productDescription"
                      placeholder="Description"
                      className="w-full rounded-md border-2 py-1.5 border-grey-200 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring px-2 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage name="productDescription" component="div" className="text-red-500 flex items-start" />
                  </div>
                </div>

                <div className="flex mb-6 w-5/6 items-start">
                  <label htmlFor="productImage" className="text-sm font-medium leading-6 text-gray-900 w-24 mt-2 flex items-start">
                    Image
                  </label>
                  <input
                    id="productImage"
                    name="productImage"
                    placeholder="Product Image"
                    type="file"
                    accept=".jpg, .png, .jpeg"
                    className="py-1.5"
                    onChange={handleFileChanges}
                  />
                </div>

                <div className="flex mb-6 w-5/6 items-center justify-center">
                  <button
                    type="submit"
                    className="bg-blue-500 flex gap-2 justify-center items-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    {loading ? <ButtonLoadingScreen /> : ''}
                    <span>Update Product</span>
                  </button>
                </div>
              </Form>
            </Formik>
          </center>
        </div>
      );
    }
  }
  return (
    <>
      {content}
    </>
  );
}

export default ProductUpdateForm;


