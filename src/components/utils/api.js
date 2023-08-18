export const API_URL = 'https://norma.nomoreparties.space/api';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const dataAPI = createApi({
  reducerPath: 'dataAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL
  }),
  endpoints: build => ({
    fetchAllData: build.query({
      query: () => ({
        url: '/ingredients'
      })
    }),
    postOrderInfo: build.mutation({
      query: (arrOrderData) => ({
        url: '/orders',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'ingredients': arrOrderData,
        })
      }),
      
    }),
  })
})

// invalidatesTags: ['OrderInfo'],

// export async function postOrder(data) {
//   const response = await fetch(
//       `${API_URL}/orders`,
//       {
//         method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json',
        // },
        // body: JSON.stringify({
        //   'ingredients': data,
        // })
//       });

//   if (response.ok) {
//     let res;
//     try {
//       res = response.json();
//     } catch {
//       res = false;
//     }
//     return res;
//   }
// }
