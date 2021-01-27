import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { getUsers } from "../../store/user";
import { getPostsByUserId } from "../../store/post";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Users = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const { users } = useSelector((state) => state.user, shallowEqual);

  const createData = (id, name, username, email, phone, website) => {
    return { id, name, username, email, phone, website };
  };

  const rows = data.map((user) =>
    createData(
      user.id,
      user.name,
      user.username,
      user.email,
      user.phone,
      user.website
    )
  );

  useEffect(() => {
    if (users) setData(users);
  }, [users]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleClick = async (userId) => {
    history.push(`/users/${userId}`);
    await dispatch(getPostsByUserId(userId));
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Website</TableCell>
            <TableCell>Posts</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.username}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell>{row.website}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleClick(row.id)}
                >
                  Posts
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Users;
