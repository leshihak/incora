import React from "react";

import { Card as CardItem } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

const EditableCard = ({
  className,
  classesTitle,
  titleId,
  postBody,
  postTitle,
  marginTop,
  onSetPostTitle,
  onSetPostBody,
  onClick,
}) => {
  return (
    <CardItem className={className}>
      <CardContent>
        {titleId && (
          <Typography
            className={classesTitle}
            color="textSecondary"
            gutterBottom
          >
            {titleId}
          </Typography>
        )}
        <Box className={marginTop}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={postTitle}
            onChange={(event) => onSetPostTitle(event.target.value)}
          />
        </Box>
        <Box className={marginTop}>
          <TextField
            label="Body"
            variant="outlined"
            multiline
            rows="8"
            fullWidth
            value={postBody}
            onChange={(event) => onSetPostBody(event.target.value)}
          />
        </Box>
        {onClick && (
          <Button variant="contained" color="secondary" onClick={onClick}>
            ADD
          </Button>
        )}
      </CardContent>
    </CardItem>
  );
};

export default EditableCard;
