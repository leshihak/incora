import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comments: null,
  isLoading: false,
  error: null,
};

const { actions, reducer } = createSlice({
  name: "comment",
  initialState,
  reducers: {
    getCommentsRequest(state) {
      state.isLoading = true;
    },
    getCommentsSuccess(state) {
      state.isLoading = false;
      state.error = null;
    },
    getCommentsFailed(state) {
      state.isLoading = false;
    },
    setCommentsByUserId(state, action) {
      state.comments = action.payload;
    },
  },
});

export const {
  getCommentsRequest,
  getCommentsSuccess,
  getCommentsFailed,
  setCommentsByUserId,
} = actions;

export const getCommentsById = (id) => async (dispatch) => {
  try {
    dispatch(getCommentsRequest());
    const url = `https://jsonplaceholder.typicode.com/comments?postId=${id}`;
    const response = await fetch(url, {
      method: "GET",
    });

    if (response) {
      const data = await response.json();
      dispatch(setCommentsByUserId(data));
    }

    dispatch(getCommentsSuccess());
  } catch (error) {
    dispatch(getCommentsFailed(error));
  }
};

export default reducer;
