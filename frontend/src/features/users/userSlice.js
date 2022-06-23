import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import userService from "./userService";
const auth = JSON.parse(localStorage.getItem("user"));

const initialState = {
  data: auth
    ? {
        _id: "",
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        zip: "",
        selectedCity: "",
        role: "",
        errorMessage: "",
        token: "",
      }
    : null,
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

// Register user
export const signupUser = createAsyncThunk(
  "/register",
  async (userData, thunkAPI) => {
    try {
      console.log(userData);
      axios
        .post("http://localhost:5000/api/users/register", {
          firstName: userData.firstName,
          lastName: userData.lastName,
          phone: userData.phone,
          email: userData.email,
          password: userData.password,
          selectedCity: userData.selectedCity,
          zip: userData.zip,
          role: userData.role,
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

//login
export const loginUser = createAsyncThunk(
  "api/users",
  async (userData, thunkAPI) => {
    try {
      return await userService.loginUser(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//logout
export const logout = createAsyncThunk("", async (userData, thunkAPI) => {
  try {
    return await userService.logout(userData);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.errorMessage = "";

      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(signupUser.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.data = null;
      });
  },
});

export const userSelector = (state) => state.user;
export const { clearState } = userSlice.actions;
export default userSlice.reducer;
