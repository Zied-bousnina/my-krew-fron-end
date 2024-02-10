import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import axios from "axios";
import { SetAuthToken } from "@/utils/SetAuthToken";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/navigation";

// save users in local storage


function parseJwt(token) {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}

export const handleFetchConsultants = createAsyncThunk(
    "consultants/handleFetchConsultants",
    async (payload, { rejectWithValue }) => {
        const token = localStorage.getItem('jwtToken');
        try {
        const res = await axios.get("https://my-krew-t2j4.onrender.com/api/users/consultants/getAllConsultant",
        {

                headers: {Authorization: `${token}`},


        }
        );
        return res.data;
        } catch (err) {
        return rejectWithValue(err.response.data);
        }
    }
    );










export const consultantSlice = createSlice({
  name: "consultants",
  initialState: {
    consultants:[],
  isLoading: false,
  },
  reducers: {



  },
  extraReducers : {

    [handleFetchConsultants.fulfilled]: (state, { payload }) => {
        state.consultants = payload;
        state.isLoading = false;
    },
    [handleFetchConsultants.rejected]: (state, { payload }) => {
        console.log(payload);
        state.isLoading = false;
    },
    [handleFetchConsultants.pending]: (state, { payload }) => {
        console.log(payload);
        state.isLoading = true;

    }






  },


});

export const {  } = consultantSlice.actions;
export default consultantSlice.reducer;


