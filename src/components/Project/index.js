import React from 'react';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

const styles = {
  addButton: {
    position: 'fixed',
    bottom: '40px',
    right: '45px'
  },
};

class Project extends React.Component {
  render() {
    const { classes, project } = this.props;
    if (!project) {
      return <Redirect to='/' />;
    }
    return (
      <div>
        <h1>Project: { project.name }</h1>
        <Button className={classes.addButton} variant='fab' color='secondary' aria-label='add'>
          <AddIcon />
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    project: state.auth.project
  };
};

const ConnectedProject = connect(
  mapStateToProps
)(Project);

export default withStyles(styles)(ConnectedProject);
