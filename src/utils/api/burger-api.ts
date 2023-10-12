import { Mutex } from 'async-mutex';
import { BaseQueryApi, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = 'https://norma.nomoreparties.space/api';

const mutex = new Mutex();
const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: Record<string, any>) => {
  await mutex.waitForUnlock();
  let result = await fetchBaseQuery({ baseUrl: API_URL })(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await fetchBaseQuery({ baseUrl: API_URL })(
          {
            url: '/auth/token', method: 'POST', headers: {
              "Content-Type": "application/json;charset=utf-8",
            }, body: JSON.stringify({
              token: localStorage.getItem('refreshToken'),
            })
          }, api, extraOptions);
        if (refreshResult.data) {
          const refeshTokenResult: any = refreshResult.data;
          localStorage.setItem('accessToken', refeshTokenResult.data.accessToken);
          localStorage.setItem('refreshToken', refeshTokenResult.data.refreshToken);
          result = await fetchBaseQuery({ baseUrl: API_URL })(args, api, extraOptions);
        } else {
          result = await fetchBaseQuery({ baseUrl: API_URL })(args, api, extraOptions);
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
    }
  }
  return result;
}


export const burgerAPI = createApi({
  reducerPath: 'burgerAPI',
  baseQuery: baseQueryWithReauth,
  endpoints: build => ({
    fetchAllData: build.query({
      query: () => ({
        url: '/ingredients'
      })
    }),
    fetchOrderInfoByOrderId: build.query({
      query: (id: string) => ({
        url: `/orders/${id}`
      })
    }),
    postOrderInfo: build.mutation({
      query: (arrOrderData) => ({
        url: '/orders',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('accessToken')
        },
        body: JSON.stringify({
          'ingredients': arrOrderData,
        })
      }) as FetchArgs,
    }),
  })
})
