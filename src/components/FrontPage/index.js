import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { withStyles } from 'material-ui/styles';
import FormDialog from './FormDialog';
import LoginForm from './LoginForm';

const styles = {
  loginForm: {
    display: 'flex',
    marginTop: '80px'
  },
  empty: {
    flex: 0.5
  }
};

class FrontPage extends React.Component {
  render() {
    const { classes, project } = this.props;
    return (
      <div>
        { !project.usernamePending && project.name && <Redirect to={`/project/${project.name}`}/> }
        <FormDialog />
        <div className={ classes.loginForm } >
          <div className={ classes.empty }></div>
          <LoginForm />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    project: state.project
  };
};

const ConnectedFrontPage = connect(
  mapStateToProps
)(FrontPage);

export default withStyles(styles)(ConnectedFrontPage);
