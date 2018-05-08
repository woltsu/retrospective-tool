import React from 'react';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { CircularProgress } from 'material-ui/Progress';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import Checkbox from 'material-ui/Checkbox';
import moment from 'moment';
import Comment from './Comment';
import travoltaGif from '../../assets/travolta.gif';

const styles = theme => ({
  commentList: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '600px',
    margin: '65px auto 0 auto',
    [theme.breakpoints.down(600)]: {
      marginTop: '60px'
    },
    maxHeight: '100%',
  },
  header: {
    width: '100%',
    maxWidth: '600px',
    zIndex: '2',
    padding: '10px 0 30px 0',
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
  filterControlContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    [theme.breakpoints.down(393)]: {
      flexDirection: 'column',
      alignItems: 'center'
    },
  },
  filterCheckboxes: {
    display: 'flex',
    justifyContent: 'space-around',
    [theme.breakpoints.down(393)]: {
      paddingLeft: '50px' 
    }
  },
  filterCheckbox: {
    [theme.breakpoints.down(393)]: {
      width: '40%'
    },
  }
});

class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starsOnly: false,
      orderByType: false,
      newOnly: false,
      types: ['default', 'start', 'continue', 'stop']
    };
  }

  filterComments = (comments) => {
    let filteredComments = comments || [];
    if (this.state.starsOnly) {
      filteredComments = filteredComments.filter((c) => c.important);
    }

    filteredComments = filteredComments.sort((a, b) => {
      return moment(b.time).valueOf() - moment(a.time).valueOf();
    });

    if (this.state.orderByType) {
      filteredComments = filteredComments.sort((a, b) => {
        const mapTypeToValue = {
          default: 4,
          stop: 1,
          continue: 2,
          start: 3
        };

        const typeDiff = mapTypeToValue[a.type] - mapTypeToValue[b.type];
        if (typeDiff === 0) {
          return moment(b.time).valueOf() - moment(a.time).valueOf();
        }
        return typeDiff;
      });
    }

    if (this.state.newOnly) {
      filteredComments = filteredComments.filter((c) => {
        const whenCreated = moment(moment().valueOf()).diff(moment(c.time));
        const fourHours = moment.duration(4*60*60*1000).valueOf();
        return fourHours - whenCreated > 0;
      });
    }

    filteredComments = filteredComments.filter((c) => {
      return this.state.types.includes(c.type);
    });

    return filteredComments;
  }

  handleTypesChange = (type) => {
    let types = this.state.types;
    if (types.includes(type)) {
      types = types.filter((t) => t !== type);
    } else {
      types = types.concat(type);
    }
    this.setState({ types });
  }

  render() {
    const { classes, fetching } = this.props;
    let comments = [];
    if (!fetching) {
      comments = this.filterComments(this.props.comments);
    }
    return (
      <div>
        <div className={classes.commentList}>
          <Paper className={classes.header} elevation={1}>
            <Typography align='center' component='div'>
              <div className={classes.headerTitle}>Filter</div>
              <div className={classes.filterControlContainer}>
                <FormControlLabel control={
                  <Switch checked={this.state.starsOnly}
                    value='starsOnly'
                    onChange={() => this.setState({ starsOnly: !this.state.starsOnly })}/>
                } label='Stars only' />

                <FormControlLabel control={
                  <Switch checked={this.state.orderByType}
                    value='orderByType'
                    onChange={() => this.setState({ orderByType: !this.state.orderByType })}/>
                } label='Order by type' />

                <FormControlLabel control={
                  <Switch checked={this.state.newOnly}
                    value='newOnly'
                    onChange={() => this.setState({ newOnly: !this.state.newOnly })}/>
                } label='New only' />
              </div>

              <FormGroup className={classes.filterCheckboxes} onChange={(e) => this.handleTypesChange(e.target.value)} row>
                <FormControlLabel
                  className={classes.filterCheckbox}                
                  control={
                    <Checkbox
                      checked={this.state.types.includes('default')}
                      color='primary'
                      value='default'
                    />
                  }
                  label='Default'
                />
                <FormControlLabel
                  className={classes.filterCheckbox}
                  control={
                    <Checkbox
                      checked={this.state.types.includes('start')}
                      color='primary'
                      value='start'
                    />
                  }
                  label='Start'
                />
                <FormControlLabel
                  className={classes.filterCheckbox}                
                  control={
                    <Checkbox
                      checked={this.state.types.includes('continue')}
                      color='primary'
                      value='continue'
                    />
                  }
                  label='Continue' />
                <FormControlLabel
                  className={classes.filterCheckbox}                
                  control={
                    <Checkbox
                      checked={this.state.types.includes('stop')}
                      color='primary'
                      value='stop'
                    />
                  }
                  label='Stop' />
              </FormGroup>
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
