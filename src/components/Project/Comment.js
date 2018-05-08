import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Star from 'material-ui-icons/Star';
import StarBorder from 'material-ui-icons/StarBorder';
import AccessTime from 'material-ui-icons/AccessTime';
import Checkbox from 'material-ui/Checkbox';
import moment from 'moment';
import { toggleComment, removeComment } from '../../reducers/projectReducer';


const styles = {
  commentContainer: {
    margin: '0 0 0 0',
    width: '100%',
    position: 'relative'
  },
  comment: {
    flex: 1,
    height: '100px'
  },
  star: {
    position: 'absolute',
    top: 0,
    right: '5px'
  },
  delete: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    fontWeight: 400,
    fontSize: '13px',
  },
  new: {
    position: 'absolute',
    bottom: '0',
    right: '0',
    fontSize: '13px'
  },
  checked: {
    color: '#2196f3'
  },
  dateContainer: {
    position: 'absolute',
    bottom: '10px',
    fontSize: '13px',
    color: '#696969'
  },
  date: {
    position: 'relative',
    left: '5px',
    bottom: '3px'
  }
};

class Comment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      important: false
    };
  }

  componentDidMount = () => {
    this.setState({ important: this.props.comment.important });
  }

  componentWillReceiveProps = (newProps) => {
    this.setState({ important: newProps.comment.important });
  }

  getTypeAsColor = (type) => {
    if (type === 'start') {
      return '#b2ffb2';

    } else if (type === 'continue') {
      return '#ffffb2';

    } else if (type === 'stop') {
      return '#ffcccc';

    }
    return 'white';
  }

  render() {
    const { content, creator, important, _id, time, type } = this.props.comment;
    const whenCreated = moment(moment().valueOf()).diff(moment(time));
    const fourHours = moment.duration(4*60*60*1000).valueOf();
    const isFresh = fourHours - whenCreated > 0;
    const backgroundColor = this.getTypeAsColor(type);

    const classes = this.props.classes;
    return (
      <div className={classes.commentContainer}>
        <Card className={classes.comment} style={{ backgroundColor }}>
          <CardContent>
            <Typography component="p">
              { content }
            </Typography>
            <Typography component="p" className={classes.dateContainer}>
              <AccessTime style={{ fontSize: 15 }} />
              <span className={classes.date}>
                { moment(time).fromNow() } by { creator || 'anonymous' }
              </span>
            </Typography>
            <Checkbox
              classes={{
                checked: classes.checked
              }}
              className={classes.star}
              icon={<StarBorder />}
              checkedIcon={<Star />}
              checked={this.state.important}
              onClick={() => {
                this.setState({ important: !this.state.important });                
                this.props.toggleComment(_id, !important, this.props.token);
              }}
              value="checkedH"
            />
            { isFresh &&
              <div className={classes.new}>
                <span>New!</span>
                <Button disabled color='secondary'>
                  Delete
                </Button>
              </div>
            }
            { !isFresh && 
              <Button className={classes.delete} onClick={() => this.props.removeComment(_id, this.props.token)}>
                Delete
              </Button>
            }
          </CardContent>
          <CardActions>
          </CardActions>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.project.token
  };
};

const ConnectedComment = connect(
  mapStateToProps,
  { toggleComment, removeComment }
)(Comment);

export default withStyles(styles)(ConnectedComment);
