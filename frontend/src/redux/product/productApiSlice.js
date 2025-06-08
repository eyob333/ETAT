import { apiSlice } from '../app/api/apiSlice';

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/products',
      keepUnusedDataFor: 5,
    }),
    getProductsByCategory: builder.query({
      query: (category) => `/products/category/${category}`,
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: (product) => ({
        url: '/products',
        method: 'POST',
        body: product,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: 'DELETE',
      }),
    }),
    updateProductData: builder.mutation({
      query: (data) => {
        // Extract the product ID and formData from the passed object
        const { formData, id } = data;
        
        // Log for debugging
        console.log('Updating product with ID:', id);
        
        return {
          url: `/products/${id}`,
          method: 'PATCH',
          body: formData,
          // Ensure we're not using JSON content type for FormData
          formData: true,
        };
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsByCategoryQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductDataMutation,
} = productApiSlice;

