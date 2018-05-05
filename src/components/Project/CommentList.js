import React from 'react';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { CircularProgress } from 'material-ui/Progress';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import moment from 'moment';
import Comment from './Comment';
import travoltaGif from '../../assets/travolta.gif';

const styles = theme => ({
  commentList: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '600px',
    margin: '30px auto 0 auto',
    [theme.breakpoints.down(600)]: {
      marginTop: 0
    },
    maxHeight: '200px'
  },
  header: {
    height: '80px',
    width: '100%',
    maxWidth: '600px',
    zIndex: '2',
    padding: '10px 0 60px 0',
  },
  headerTitle: {
    fontSize: '20px',
    color: 'rgba(0, 0, 0, 0.54)'
  },
  loader: {
    margin: '10px auto 0 auto'
  },
  noResultBox: {
    height: '400px',
    display: 'flex',
    flexDirection: 'column'
  },
  noResultGif: {
    maxWidth: '100%',
    maxHeight: '100%'
  },
});

class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starsOnly: false,
      oldestFirst: false
    };
  }

  filterComments = (comments) => {
    let filteredComments = comments || [];
    if (this.state.starsOnly) {
      filteredComments = filteredComments.filter((c) => c.important);
    }

    filteredComments = filteredComments.sort((a, b) => {
      return this.state.oldestFirst ?
        moment(b.time).isBefore(moment(a.time)) : 
        moment(a.time).isBefore(moment(b.time));
    });

    return filteredComments;
  }

  render() {
    const { classes, fetching } = this.props;
    const comments = this.filterComments(this.props.comments);
    return (
      <div>
        <div className={classes.commentList}>
          <Paper className={classes.header} elevation={1}>
            <Typography align='center' component='div'>
              <div className={classes.headerTitle}>Filter</div>
              <FormControlLabel control={
                <Switch checked={this.state.starsOnly}
                  value='starsOnly'
                  onChange={() => this.setState({ starsOnly: !this.state.starsOnly })}/>
              } label='Stars only' />

              <FormControlLabel control={
                <Switch checked={this.state.oldestFirst}
                  value='oldestFirst'
                  onChange={() => this.setState({ oldestFirst: !this.state.oldestFirst })}/>
              } label='Oldest first' />
            </Typography>
          </Paper>
          { fetching && <CircularProgress className={classes.loader} /> }      
          { comments.length > 0 && comments.map((comment, i) => {
            return <Comment key={i} comment={comment} />;
          }) }
          {comments.length === 0 && !fetching &&
            <Paper className={[classes.header, classes.noResultBox].join('')} elevation={1}>
              <Typography align='center' variant='display1' component='h1'>
              No results
              </Typography>
              <img className={classes.noResultGif} src={travoltaGif} alt='travolta' />
            </Paper>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.project.fetching,
  };
};

const ConnectedCommentList = connect(
  mapStateToProps
)(CommentList);

export default withStyles(styles)(ConnectedCommentList);
