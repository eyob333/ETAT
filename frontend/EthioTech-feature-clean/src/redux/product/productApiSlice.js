import { apiSlice } from '../app/api/apiSlice';

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: '/products',
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (response) => {
        return response;
      },
      providesTags: ['Product'],
    }),
    getProductsByCategory: builder.query({
      query: (category) => ({
        url: `/products/category/${category}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (response) => {
        return response;
      },
      providesTags: ['Product'],
    }),
    createProduct: builder.mutation({
      query: (product) => ({
        url: '/products',
        method: 'POST',
        body: product,
        formData: true,
      }),
      invalidatesTags: ['Product'],
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
    updateProductData: builder.mutation({
      query: (data) => {
        const { formData, id } = data;
        return {
          url: `/products/${id}`,
          method: 'PATCH',
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ['Product'],
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

