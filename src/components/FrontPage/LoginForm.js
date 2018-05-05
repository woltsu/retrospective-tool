import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { projectLogin } from '../../reducers/projectReducer';

const styles = {
  formStyle: {
    width: '75%',
    maxWidth: '350px'
  },
  cardHeader: {
    paddingBottom: 0
  },
  formButton: {
    marginTop: '15px'
  },
  errorMessage: {
    color: 'red',
    marginTop: '18px',
    fontSize: '20px',
  },
  cardContainer: {
    overflow: 'hidden',
  }
};

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ''
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    if (!name) return;
    const password = e.target.password.value;
    const credentials = { name, password };
    this.props.projectLogin(credentials);
  }

  render() {
    const { classes, errorMessage } = this.props;
    return (
      <div className={classes.formStyle}>
        <Card className={classes.cardContainer}>
          <CardHeader title='Login to project' className={classes.cardHeader}/>
          <CardContent>
            <form onSubmit={this.onSubmit} noValidate autoComplete='off'>
              <TextField
                autoFocus
                name='name'
                label='Name'
                type='text'
                fullWidth
                onChange={(e) => this.setState({ name: e.target.value })}
              />
              <TextField
                name='password'
                margin='normal'
                label='Password'
                type='password'
                fullWidth
              />
              <Button 
                disabled={(this.state.name === '' || this.props.loginPending)}
                type='submit' className={classes.formButton}
                variant='raised'
                color='primary'>
                {!this.props.loginPending && 'Login'}
                {this.props.loginPending && 'Logging in...'}
              </Button>
            </form>
            { errorMessage && <div className={classes.errorMessage}>{ errorMessage }</div> }                    
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.project.errorMessage,
    loginPending: state.project.loginPending
  };
};

const ConnectedLoginForm = connect(
  mapStateToProps,
  { projectLogin }
)(LoginForm);

export default withStyles(styles)(ConnectedLoginForm);
