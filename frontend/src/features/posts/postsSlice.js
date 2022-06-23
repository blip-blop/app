import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  jobTitle: "",
  jobLocation: "",
  jobDescription: "",
  jobDate: "",
};

export const postOffer = createAsyncThunk(
  "/addjob",
  async (jobData, thunkAPI) => {
    try {
      console.log(jobData);
      axios
        .post("http://localhost:5000/api/jobs/addjob", {
          employerId: jobData.employerId,
          jobTitle: jobData.jobTitle,
          jobDescription: jobData.jobDescription,
          jobLocation: jobData.jobLocation,
          jobDate: jobData.jobDate,
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    } catch (error) {
      const message =
        (error.response && error.response.data && error.respone.data.message) ||
        error.message ||
        error.toString();
      console.log(thunkAPI.rejectWithValue(message));
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {
    post: (state, action) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOffer.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(postOffer.fulfilled, (state, action) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(postOffer.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { post } = postSlice.actions;
export const postSelector = (state) => state.post;
export default postSlice.reducer;
