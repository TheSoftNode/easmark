import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Usage, Payment, Balance, Transaction, CreditUsageResponse } from '@/types/credits';

export const creditsApi = createApi({
    reducerPath: 'creditsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/dashboard',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Credits', 'Transactions'],
    endpoints: (builder) => ({
        getCreditUsage: builder.query<CreditUsageResponse, void>({
            query: () => '/credits/usage/get-usage',
            providesTags: ['Credits'],
        }),

        recordUsage: builder.mutation<{ usage: Usage; new_balance: Balance }, { credit_usage: number }>({
            query: (data) => ({
                url: '/credits/usage',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Credits', 'Transactions'],
        }),

        recordPayment: builder.mutation<{ payment: Payment; new_balance: Balance }, { payment_amount: number }>({
            query: (data) => ({
                url: '/credits/payment',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Credits', 'Transactions'],
        }),

        getBalance: builder.query<{ credit_balance: number }, void>({
            query: () => '/credits/balance',
            providesTags: ['Credits'],
        }),

        getTransactionHistory: builder.query<Transaction[], {
            start_date?: string;
            end_date?: string;
        }>({
            query: (params) => ({
                url: '/credits/history',
                params,
            }),
            providesTags: ['Transactions'],
        }),
    }),
});

export const {
    useGetCreditUsageQuery,
    useRecordUsageMutation,
    useRecordPaymentMutation,
    useGetBalanceQuery,
    useGetTransactionHistoryQuery,
} = creditsApi;
