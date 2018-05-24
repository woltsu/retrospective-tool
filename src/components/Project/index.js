import React from 'react';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Button from 'material-ui/Button';
import CreateIcon from 'material-ui-icons/Create';
import CompareArrowsIcon from 'material-ui-icons/CompareArrows';
import {
  setComments,
  addComment,
  updateComment,
  onlyRemoveComment,
  addNewSocketUser,
  removeSocketUser,
} from '../../reducers/projectReducer';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import PointingPoker from '../PointingPoker';
import socketService from '../../services/socketService';

const styles = theme => ({
  container: {
    display: 'flex',
    flex: 1,
  },
  projectContainer: {
    display: 'flex',
    flex: 1,
    [theme.breakpoints.down(800)]: {
      display: 'none'
    },
    marginTop: '65px'
  },
  mobileView: {
    flex: 1,
    marginTop: '60px',
    [theme.breakpoints.up(800)]: {
      display: 'none'
    },
    display: 'flex'
  },
  changeViewButton: {
    position: 'fixed',
    right: '35px',
    bottom: '30px',
    zIndex: 999
  },
  addButton: {
    position: 'fixed',
    bottom: '30px',
    left: '40vw',
    zIndex: '100',
    [theme.breakpoints.down(800)]: {
      right: '126px',
      left: 'initial'
    },
  }
});

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
      viewIndex: 0
    };
  }

  toggleCommentForm = () => {
    this.setState((prevState) => ({
      opened: !prevState.opened
    }));
  }

  changeView = () => {
    const viewIndex = this.state.viewIndex === 0 ? 1 : 0;
    this.setState({ viewIndex });
  }

  componentDidMount = async () => {
    await this.props.setComments({
      name: this.props.projectName,
      token: this.props.projectToken
    });
    socketService.connect(
      this.props.projectName,
      this.props.socket_username,
      this.props.addComment, 
      this.props.updateComment,
      this.props.onlyRemoveComment,
      this.props.addNewSocketUser,
      this.props.removeSocketUser,
    );
  }

  componentWillUnmount = () => {
    socketService.disconnect();
  }

  render() {
    const { classes, projectToken, comments } = this.props;
    if (!projectToken) {
      return <Redirect to='/' />;
    }
    return (
      <div className={classes.container}>
        <div className={classes.mobileView}>
          {
            this.state.viewIndex === 0 &&
            <CommentList comments={comments} />
          }
          {
            this.state.viewIndex === 1 &&
            <PointingPoker />
          }
          <Button
            className={classes.changeViewButton}
            variant='fab'
            color='primary'
            aria-label='change view'
            onClick={() => this.changeView()}>
            <CompareArrowsIcon />
          </Button>
          {
            this.state.viewIndex === 0 &&
            <Button className={classes.addButton}
              variant='fab' 
              color='secondary' 
              aria-label='add'
              onClick={() => this.setState({ opened: true })}>
              <CreateIcon />
            </Button>
          }
        </div>
        <div className={classes.projectContainer}>
          <CommentList comments={comments}>
            <Button className={classes.addButton}
              variant='fab' 
              color='secondary' 
              aria-label='add'
              onClick={() => this.setState({ opened: true })}>
              <CreateIcon />
            </Button>
          </CommentList>
          <CommentForm opened={this.state.opened} toggle={this.toggleCommentForm} />
          <PointingPoker />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    projectName: state.project.name,
    projectToken: state.project.token,
    comments: state.project.comments,
    socket_username: state.project.socket_username,
    socketUsers: state.project.socketUsers
  };
};

const ConnectedProject = connect(
  mapStateToProps,
  { setComments, addComment, updateComment, onlyRemoveComment, addNewSocketUser, removeSocketUser }
)(Project);

export default withStyles(styles)(ConnectedProject);
