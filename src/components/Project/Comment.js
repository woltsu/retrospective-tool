import React from 'react';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

const styles = {
  commentContainer: {
    margin: '0 0 0 0',
    width: '100%',
  },
  comment: {
    flex: 1
  }
};

export const Comment = (props) => {
  const { content, creator } = props.comment;
  const classes = props.classes;
  return (
    <div className={classes.commentContainer}>
      <Card className={classes.comment}>
        <CardContent>
          <Typography component="p">
            { content } ~{ creator || 'anonymous' }
          </Typography>
        </CardContent>
        <CardActions>
        </CardActions>
      </Card>
    </div>
  );
};

export default withStyles(styles)(Comment);
