import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { getPost, createNewPost } from "../../store/post";
import EditableCard from "../EditableCard";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  marginTop: {
    marginTop: 20,
  },
  center: {
    maxWidth: 300,
    margin: "0 auto",
    paddingTop: 15,
  },
}));

const UserPosts = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [postsByUserID, setPostsByUserID] = useState([]);
  const [open, setOpen] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");

  const { postsByUserId } = useSelector((state) => state.post, shallowEqual);

  useEffect(() => {
    if (postsByUserId) setPostsByUserID(postsByUserId);
  }, [postsByUserId]);

  const createData = (id, userId, title, body) => {
    return { id, userId, title, body };
  };

  const rows = postsByUserID.map((post) =>
    createData(post.id, post.userId, post.title, post.body)
  );

  const handleClick = async (postId) => {
    history.push(`/users/${id}/posts/${postId}`);
    await dispatch(getPost(postId));
  };

  const createPost = async () => {
    await dispatch(createNewPost(id, postTitle, postBody));
    setOpen(false);
  };

  return (
    <TableContainer component={Paper}>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setOpen(true)}
      >
        Add new
      </Button>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>User ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Body</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell>{row.userId}</TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.body}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleClick(row.id)}
                >
                  Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2>Add new post</h2>
            <EditableCard
              className={classes.center}
              marginTop={classes.marginTop}
              postTitle={postTitle}
              onSetPostTitle={setPostTitle}
              postBody={postBody}
              onSetPostBody={setPostBody}
              onClick={createPost}
            />
          </div>
        </Fade>
      </Modal>
    </TableContainer>
  );
};

export default UserPosts;
