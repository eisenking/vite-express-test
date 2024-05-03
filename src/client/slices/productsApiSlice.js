import { PRODUCTS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ( { pageNumber, category, subCategory, cover, searchByName } ) => ({
        url: PRODUCTS_URL,
        params: { 
          pageNumber,
          category,
          subCategory,
          cover,
          searchByName,
        },
      }),
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    })
  }),
})

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
} = productsApiSlice;