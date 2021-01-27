import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { getPost, deletePost, editPost } from "../../store/post";
import { getCommentsById } from "../../store/comment";
import Card from "../Card";
import EditableCard from "../EditableCard";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  center: {
    maxWidth: 300,
    margin: "0 auto",
    paddingTop: 15,
  },
  comment: {
    maxWidth: 300,
    margin: 15,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  marginTop: {
    marginTop: 20,
  },
});

const Post = () => {
  const classes = useStyles();
  const { id, postId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [selectedPost, setSelectedPost] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [commentsById, setCommentsById] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");

  const { post } = useSelector((state) => state.post, shallowEqual);
  const { comments } = useSelector((state) => state.comment, shallowEqual);

  useEffect(() => {
    if (comments) setCommentsById(comments);
  }, [comments]);

  useEffect(() => {
    if (post) setSelectedPost(post);
  }, [post]);

  useEffect(() => {
    setPostTitle(selectedPost.title);
    setPostBody(selectedPost.body);
  }, [selectedPost]);

  useEffect(() => {
    dispatch(getCommentsById(id));
    dispatch(getPost());
  }, [dispatch, id]);

  const handleDelete = async () => {
    await dispatch(deletePost(postId));
    history.push(`/users/${id}`);
  };

  const handleClick = async () => {
    await dispatch(editPost(id, postId, postTitle, postBody));
    setIsEditMode(false);
  };

  return (
    <Box display="flex" flexWrap="wrap" flexDirection="column">
      {isEditMode ? (
        <EditableCard
          className={classes.center}
          classesTitle={classes.title}
          titleId={`Post ID #${selectedPost.id}`}
          marginTop={classes.marginTop}
          postTitle={postTitle}
          onSetPostTitle={setPostTitle}
          postBody={postBody}
          onSetPostBody={setPostBody}
        />
      ) : (
        <Card
          className={classes.center}
          classesTitle={classes.title}
          classesPos={classes.pos}
          titleId={`Post ID #${selectedPost.id}`}
          title={selectedPost.title}
          body={selectedPost.body}
        />
      )}
      <Box
        display="flex"
        justifyContent="space-evently"
        className={classes.center}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsEditMode(!isEditMode)}
        >
          Edit
        </Button>
        <Button variant="contained" color="secondary" onClick={handleDelete}>
          Remove
        </Button>
        {isEditMode && (
          <Button variant="outlined" color="primary" onClick={handleClick}>
            Save
          </Button>
        )}
      </Box>
      <Box display="flex" flexWrap="wrap">
        {commentsById.map((comment) => (
          <Card
            className={classes.comment}
            classesTitle={classes.title}
            classesPos={classes.pos}
            titleId={`Comment ID #${comment.id}`}
            title={`Title: ${comment.name}`}
            body={`Body: ${comment.body}`}
            email={`Email: ${comment.email}`}
            key={comment.id}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Post;
