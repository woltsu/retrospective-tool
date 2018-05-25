import React from 'react';
import { connect } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, DialogActions } from 'material-ui';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { setProjectSocketUsername } from '../../reducers/projectReducer';

class UsernameDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ''
    };
  }
  handleClose = () => {
    this.props.setProjectSocketUsername(this.state.username);
  }

  render() {
    return (
      <Dialog open={this.props.open}>
        <DialogTitle id='form-dialog-title'>Username</DialogTitle>
        <DialogContent>
          <TextField
            autoComplete='off'
            name='username'
            label='Username'
            type='text'
            margin='dense'
            fullWidth
            autoFocus
            onChange = {(e) => this.setState({ username: e.target.value })}
          />
          <DialogActions>
            <Button
              disabled={this.state.username.length === 0 || this.state.username.length >= 20}
              variant='raised' onClick={() => this.handleClose()}
              color='primary'
            >
                    OK
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    );
  }
}

const ConnectedUsernameDialog = connect(
  null,
  { setProjectSocketUsername }
)(UsernameDialog);

export default ConnectedUsernameDialog;
