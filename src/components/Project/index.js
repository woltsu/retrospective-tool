import React from 'react';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Button from 'material-ui/Button';
import CreateIcon from 'material-ui-icons/Create';
import { setComments } from '../../reducers/projectReducer';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

const styles = {
  addButton: {
    position: 'fixed',
    bottom: '30px',
    right: '35px'
  },
};

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false
    };
  }

  toggleCommentForm = () => {
    this.setState((prevState) => ({
      opened: !prevState.opened
    }));
  }

  componentDidMount = async () => {
    await this.props.setComments({
      name: this.props.projectName,
      token: this.props.projectToken
    });
  }

  render() {
    const { classes, projectToken, comments } = this.props;
    if (!projectToken) {
      return <Redirect to='/' />;
    }
    return (
      <div>
        <div>
          <CommentList comments={comments} />
          <CommentForm opened={this.state.opened} toggle={this.toggleCommentForm} />
        </div>
        <Button className={classes.addButton}
          variant='fab' 
          color='secondary' 
          aria-label='add'
          onClick={() => this.setState({ opened: true })}>
          <CreateIcon />
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    projectName: state.project.name,
    projectToken: state.project.token,
    comments: state.project.comments
  };
};

const ConnectedProject = connect(
  mapStateToProps,
  { setComments }
)(Project);

export default withStyles(styles)(ConnectedProject);
