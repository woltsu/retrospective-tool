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
    const { classes, auth } = this.props;
    return (
      <div>
        { auth.project && <Redirect to={`/project/${auth.project.name}`}/> }
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
    auth: state.auth
  };
};

const ConnectedFrontPage = connect(
  mapStateToProps
)(FrontPage);

export default withStyles(styles)(ConnectedFrontPage);
