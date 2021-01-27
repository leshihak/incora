import React from "react";

import { Card as CardItem } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const Card = ({
  className,
  classesTitle,
  classesPos,
  titleId,
  title,
  body,
  email,
}) => {
  return (
    <CardItem className={className}>
      <CardContent>
        <Typography className={classesTitle} color="textSecondary" gutterBottom>
          {titleId}
        </Typography>
        <Typography className={classesPos} color="textSecondary">
          {title}
        </Typography>
        <Typography variant="body2" component="p">
          {body}
        </Typography>
        {email && (
          <Typography className={classesTitle} color="textSecondary">
            {email}
          </Typography>
        )}
      </CardContent>
    </CardItem>
  );
};

export default Card;
