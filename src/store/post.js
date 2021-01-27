import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postsByUserId: null,
  posts: null,
  isLoading: false,
  error: null,
  post: null,
};

const { actions, reducer } = createSlice({
  name: "post",
  initialState,
  reducers: {
    getPostRequest(state) {
      state.isLoading = true;
    },
    getPostSuccess(state) {
      state.isLoading = false;
      state.error = null;
    },
    getPostFailed(state) {
      state.isLoading = false;
    },
    getPostsByUserIdRequest(state) {
      state.isLoading = true;
    },
    getPostsByUserIdSuccess(state) {
      state.isLoading = false;
      state.error = null;
    },
    getPostsByUserIdFailed(state) {
      state.isLoading = false;
    },
    editPostRequest(state) {
      state.isLoading = true;
    },
    editPostSuccess(state) {
      state.isLoading = false;
      state.error = null;
    },
    editPostFailed(state) {
      state.isLoading = false;
    },
    deletePostRequest(state) {
      state.isLoading = true;
    },
    deletePostSuccess(state) {
      state.isLoading = false;
      state.error = null;
    },
    deletePostFailed(state) {
      state.isLoading = false;
    },
    createNewPostRequest(state) {
      state.isLoading = true;
    },
    createNewPostSuccess(state) {
      state.isLoading = false;
      state.error = null;
    },
    createNewPostFailed(state) {
      state.isLoading = false;
    },
    getPostsRequest(state) {
      state.isLoading = true;
    },
    getPostsSuccess(state) {
      state.isLoading = false;
      state.error = null;
    },
    getPostsFailed(state) {
      state.isLoading = false;
    },
    setPostsByUserId(state, action) {
      state.postsByUserId = action.payload;
    },
    setPosts(state, action) {
      state.posts = action.payload;
    },
    setPost(state, action) {
      state.post = action.payload;
    },
  },
});

export const {
  getPostsByUserIdRequest,
  getPostsByUserIdSuccess,
  getPostsByUserIdFailed,
  deletePostRequest,
  deletePostSuccess,
  deletePostFailed,
  editPostRequest,
  editPostSuccess,
  editPostFailed,
  createNewPostRequest,
  getPostsRequest,
  createNewPostSuccess,
  createNewPostFailed,
  setPosts,
  getPostsFailed,
  getPostsSuccess,
  setPostsByUserId,
  getPostRequest,
  getPostSuccess,
  getPostFailed,
  setPost,
} = actions;

export const getPosts = () => async (dispatch) => {
  try {
    dispatch(getPostsRequest());
    const url = "https://jsonplaceholder.typicode.com/posts";
    const response = await fetch(url, {
      method: "GET",
    });

    if (response) {
      const data = await response.json();
      dispatch(setPosts(data));
    }

    dispatch(getPostsSuccess());
  } catch (error) {
    dispatch(getPostsFailed(error));
  }
};

export const getPostsByUserId = (userId) => async (dispatch) => {
  try {
    dispatch(getPostsByUserIdRequest());
    const url = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
    const response = await fetch(url, {
      method: "GET",
    });

    if (response) {
      const data = await response.json();
      dispatch(setPostsByUserId(data));
    }

    dispatch(getPostsByUserIdSuccess());
  } catch (error) {
    dispatch(getPostsByUserIdFailed(error));
  }
};

export const createNewPost = (id, title, body) => async (dispatch) => {
  try {
    dispatch(createNewPostRequest());
    const url = "https://jsonplaceholder.typicode.com/posts";
    await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        title: title,
        body: body,
        userId: id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    dispatch(createNewPostSuccess());
  } catch (error) {
    dispatch(createNewPostFailed(error));
  }
};

export const editPost = (id, postId, title, body) => async (dispatch) => {
  try {
    dispatch(editPostRequest());
    const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;
    await fetch(url, {
      method: "PUT",
      body: JSON.stringify({
        id: postId,
        title: title,
        body: body,
        userId: id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    dispatch(editPostSuccess());
  } catch (error) {
    dispatch(editPostFailed(error));
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    dispatch(deletePostRequest());
    const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;
    await fetch(url, {
      method: "DELETE",
    });

    dispatch(deletePostSuccess());
  } catch (error) {
    dispatch(deletePostFailed(error));
  }
};

export const getPost = (id) => async (dispatch, getState) => {
  await dispatch(getPosts());
  const post = getState().post.posts.find((post) => post.id === id);
  dispatch(setPost(post));
};

export default reducer;
