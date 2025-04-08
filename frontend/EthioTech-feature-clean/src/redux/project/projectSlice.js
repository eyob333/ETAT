import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import baseURL from '../app/api/baseApi';

export const fetchProject = createAsyncThunk('projects/fetchProjects', async (thunkAPI) => {
  const url = `${baseURL}/projects`;
  try {
    const response = await axios.get(url);
    return response.data.projects;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const initialState = {
  projects: [],
  isLoading: false,
  errMsg: '',
  error: false,
};

const projectSlice = createSlice({

  name: 'project',
  initialState,
  reducers: {
    addProject: (state, action) => {
      state.projects.push(action.payload);
    },
    updateProjectState: (state, action) => {
      const updatedProject = action.payload;
      const index = state.projects.findIndex((project) => project.id === updatedProject.id);
      if (index !== -1) {
        state.projects[index] = updatedProject;
      } else {
        toast.error('something went wrong');
      }
    },
    removeProject: (state, action) => {
      state.projects = state.projects.filter((project) => project.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
    // Fetch User
      .addCase(fetchProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.errMsg = action.payload;
      });
  },

});

export const {
  addUser, removeProject, updateProjectState, addProject,
} = projectSlice.actions;
export default projectSlice.reducer;
