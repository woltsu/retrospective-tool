import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Star from 'material-ui-icons/Star';
import StarBorder from 'material-ui-icons/StarBorder';
import AccessTime from 'material-ui-icons/AccessTime';
import Checkbox from 'material-ui/Checkbox';
import moment from 'moment';
import { toggleComment } from '../../reducers/projectReducer';

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
    right: 0
  },
  checked: {
    color: 'gold'
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

  render() {
    const { content, creator, important, _id, time } = this.props.comment;
    const classes = this.props.classes;
    return (
      <div className={classes.commentContainer}>
        <Card className={classes.comment}>
          <CardContent>
            <Typography component="p">
              { content } ~{ creator || 'anonymous' }
            </Typography>
            <Typography component="p" className={classes.dateContainer}>
              <AccessTime style={{ fontSize: 15 }} />
              <span className={classes.date}>
                { moment(time).fromNow() }
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
  { toggleComment }
)(Comment);

export default withStyles(styles)(ConnectedComment);
