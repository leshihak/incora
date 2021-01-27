import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: null,
  error: null,
  isLoadingUsers: false,
};

const { actions, reducer } = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUsersRequest(state) {
      state.isLoadingUsers = true;
    },
    getUsersSuccess(state) {
      state.isLoadingUsers = false;
      state.error = null;
    },
    getUsersFailed(state) {
      state.isLoadingUsers = false;
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
  },
});

export const {
  setUsers,
  getUsersRequest,
  getUsersSuccess,
  getUsersFailed,
} = actions;

export const getUsers = () => async (dispatch) => {
  try {
    dispatch(getUsersRequest());
    const url = "https://jsonplaceholder.typicode.com/users";
    const response = await fetch(url, {
      method: "GET",
    });

    if (response) {
      const data = await response.json();
      dispatch(setUsers(data));
    }

    dispatch(getUsersSuccess());
  } catch (error) {
    dispatch(getUsersFailed(error));
  }
};

export default reducer;
