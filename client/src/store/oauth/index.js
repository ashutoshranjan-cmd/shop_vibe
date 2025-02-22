import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/oauth/check-auth"; // Update with your backend URL

// ✅ Thunk: Check authentication
export const checkAuth = createAsyncThunk("auth/checkAuth", async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${API_URL}/check-auth`, { withCredentials: true });
    return response.data.user; // Return user object
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "Unauthorized");
  }
});

// ✅ Slice for auth state
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    isLoading: true,
    user: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user =  null
      });
  },
});

export default authSlice.reducer;
