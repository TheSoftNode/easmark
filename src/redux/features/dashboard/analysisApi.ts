import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface AnalysisType
{
  id: string;
  name: string;
  base_cost: number | string;
  description: string | null;
}

interface AnalysisByType
{
  type: string;
  count: number;
  total_cost: number;
}

interface UserAnalytics
{
  total_analyses: number;
  total_cost: number;
  analyses_by_type: AnalysisByType[];
  free_analysis_available: boolean;
}

interface GlobalAnalytics
{
  total_analyses: number;
  total_cost: number;
  analyses_by_type: {
    analysis_type__name: string;
    count: number;
    total_cost: number;
  }[];
}

interface Analysis
{
  id: string;
  analysis_type: AnalysisType;
  created_at: string;
  cost: number;
  is_free_analysis: boolean;
  final_cost: number;
}

interface PerformAnalysisResponse
{
  analysis_id: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
  final_cost: number;
  is_free: boolean;
}



export const analysisApi = createApi({
  reducerPath: 'analysisApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/dashboard',
    prepareHeaders: (headers) =>
    {
      const token = localStorage.getItem('token');
      if (token)
      {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Analytics', 'AnalyticsStats'],
  endpoints: (builder) => ({
    performAnalysis: builder.mutation<PerformAnalysisResponse, { analysis_type: string }>({
      query: (data) => ({
        url: '/analytics/perform',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Analytics', 'AnalyticsStats'],
    }),

    getUserAnalytics: builder.query<UserAnalytics, void>({
      query: () => '/analytics/user-analytics/',
      providesTags: ['AnalyticsStats'],
    }),

    getAnalysisHistory: builder.query<Analysis[], void>({
      query: () => '/analytics/history/',
      providesTags: ['Analytics'],
    }),

    getGlobalAnalytics: builder.query<GlobalAnalytics, void>({
      query: () => '/analytics/global-analytics/',
      providesTags: ['AnalyticsStats'],
    }),

    getAnalysisTypes: builder.query<AnalysisType[], void>({
      query: () => '/analytics/get-types/',
      providesTags: ['Analytics'],
    }),

    createAnalysisType: builder.mutation<AnalysisType, { name: string; base_cost: number; description?: string }>({
      query: (data) => ({
        url: '/analytics/create-type/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Analytics'],
    }),
  }),
});

export const {
  usePerformAnalysisMutation,
  useGetUserAnalyticsQuery,
  useGetAnalysisHistoryQuery,
  useGetGlobalAnalyticsQuery,
  useGetAnalysisTypesQuery,
  useCreateAnalysisTypeMutation,
} = analysisApi;