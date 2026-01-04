import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cameraApi = createApi({
  reducerPath: "cameraApi",

  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.BACKEND_URL || "https://api-app-staging.wobot.ai/app/v1/",

    prepareHeaders: (headers, { getState }) => {
      headers.set("Authorization", `Bearer 4ApVMIn5sTxeW7GQ5VWeWiy`);

      return headers;
    },
  }),

  endpoints: (builder) => ({
    cameras: builder.query({
      query: () => ({
        url: "fetch/cameras",
        method: "GET",
      }),
    }),

    updateStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: "update/camera/status",
        method: "POST",
        body: { id, status },
      }),
    }),
  }),
});

export const { useCamerasQuery, useUpdateStatusMutation } = cameraApi;
