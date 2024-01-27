import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getToken } from '@/utils/axios/token';
import { API_ENDPOINTS } from '@/config/Api_EndPoints';
import { bookmarkType } from '@/types';

export interface PaginatedResponse<data> {
  data: data;
  count: number;
  page: number;
  limit: number;
  totalPage: number;
  nextPage: number | null;
}

export const stateQueryApi: any = createApi({
  reducerPath: 'stateQuery',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_REST_API_ENDPOINT,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getBookmarks: builder.query<bookmarkType[], { id: string }>({
      query: ({ id }) => ({
        url: API_ENDPOINTS.BOOKMARK.GET_USER_BOOKMARKS.replace(':id', id),
      }),
      transformResponse: async (res: { data: bookmarkType[] }) =>
        res.data! ?? [],
    }),
  }),
});

export const { useGetBookmarksQuery } = stateQueryApi;
