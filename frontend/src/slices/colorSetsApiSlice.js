import { apiSlice } from './apiSlice';
import { COLOURSETS_URL } from '../constants';

export const colorSetsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getColorSets: builder.query({
      query: () => COLOURSETS_URL,
      transformResponse: (response) => {
        console.log('Get Color Sets Response:', response);
        return response;
      },
      onError: (error) => {
        console.error('Get Color Sets Error:', error);
      },
    }),
    getColorSet: builder.query({
      query: (id) => `${COLOURSETS_URL}/${id}`,
      transformResponse: (response) => {
        console.log('Get Color Set Response:', response);
        return response;
      },
      onError: (error) => {
        console.error('Get Color Set Error:', error);
      },
    }),
    createColorSet: builder.mutation({
      query: (newColorSet) => ({
        url: `${COLOURSETS_URL}/`,
        method: 'POST',
        body: newColorSet,
      }),
      onQueryStarted: (newColorSet, { dispatch, queryFulfilled }) => {
        console.log('Create Color Set Started:', newColorSet);
        queryFulfilled.then((response) => {
          console.log('Create Color Set Response:', response);
        }).catch((error) => {
          console.error('Create Color Set Error:', error);
        });
      },
      invalidates: ['getColorSets'],
    }),
    updateColorSet: builder.mutation({
      query: ({ id, ...updatedColorSet }) => ({
        url: `${COLOURSETS_URL}/${id}`,
        method: 'PUT',
        body: updatedColorSet,
      }),
      onQueryStarted: (updatedColorSet, { dispatch, queryFulfilled }) => {
        console.log('Update Color Set Started:', updatedColorSet);
        queryFulfilled.then((response) => {
          console.log('Update Color Set Response:', response);
        }).catch((error) => {
          console.error('Update Color Set Error:', error);
        });
      },
      invalidates: ['getColorSets'],
    }),
    deleteColorSet: builder.mutation({
      query: (id) => ({
        url: `${COLOURSETS_URL}/${id}`,
        method: 'DELETE',
      }),
      onQueryStarted: (id, { dispatch, queryFulfilled }) => {
        console.log('Delete Color Set Started:', id);
        queryFulfilled.then((response) => {
          console.log('Delete Color Set Response:', response);
        }).catch((error) => {
          console.error('Delete Color Set Error:', error);
        });
      },
      invalidates: ['getColorSets'],
    }),
  }),
});

export const {
  useGetColorSetsQuery,
  useGetColorSetQuery,
  useCreateColorSetMutation,
  useUpdateColorSetMutation,
  useDeleteColorSetMutation,
} = colorSetsApiSlice;
