import React from 'react';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { CircularProgress } from 'material-ui/Progress';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Comment from './Comment';

const styles = {
  commentList: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  header: {
    height: '80px',
    width: '100%',
    maxWidth: '600px',
    zIndex: '2',
    padding: '10px 0 60px 0',
  },
  loader: {
    margin: '10px auto 0 auto'
  }
};

const CommentList = (props) => {
  const { classes, comments, fetching } = props;
  return (
    <div>
      <div className={classes.commentList}>
        <Paper className={classes.header} elevation={1}>
          <Typography align='center' variant="display1" component="h1">
            Latest
          </Typography>
        </Paper>
        { fetching && <CircularProgress className={classes.loader} /> }      
        { comments && comments.map((comment, i) => {
          return <Comment key={i} comment={comment} />;
        }) }
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    fetching: state.project.fetching,
  };
};

const ConnectedCommentList = connect(
  mapStateToProps
)(CommentList);

export default withStyles(styles)(ConnectedCommentList);
