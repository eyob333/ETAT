import { apiSlice } from '../app/api/apiSlice';

export const projectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProject: builder.query({
      query: () => '/projects',
      keepUnusedDataFor: 5,
    }),
    createProject: builder.mutation({
      query: (project) => ({
        url: '/projects',
        method: 'POST',
        body: project,
      }),
    }),
    deleteProject: builder.mutation({
      query: (projectId) => ({
        url: `/projects/${projectId}`,
        method: 'DELETE',
      }),
    }),
    updateProjectData: builder.mutation({
      query: (data) => {
        const projectId = (data.get('id'));
        return {
          url: `/projects/${projectId}`,
          method: 'PATCH',
          body: data,
        };
      },
    }),
  }),
});

export const {
  useGetProjectQuery,
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useUpdateProjectDataMutation,
} = projectApiSlice;
