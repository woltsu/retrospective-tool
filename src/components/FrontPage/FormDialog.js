import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import { toggleCreateForm } from '../../reducers/uiReducer';
import projectService from '../../services/projectService';
import { createNotification } from '../../reducers/notificationReducer';

const styles = {
  errorMessage: {
    color: 'red'
  }
};

class FormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      errorMessage: '',
      submitDisabled: true,
      pending: false,
    };
  }

  handleClose = () => {
    this.props.toggleCreateForm();
    this.setState({ error: false, errorMessage: '', submitDisabled: true });
  };

  validate = (value) => {
    const isNameLengthZero = value.trim().length === 0;
    this.setState({ error: isNameLengthZero, errorMessage: '', submitDisabled: isNameLengthZero });
  }

  submit = async (e) => {
    this.setState({ pending: true });
    e.preventDefault();
    const name = e.target.name.value;
    const password = e.target.password.value;
    if (name.trim().length === 0) {
      return;
    }
    const newProject = { name };
    if (password.length > 0) {
      newProject['password'] = password;
    }

    const response = await projectService.create(newProject);
    if (response.error) {
      this.setState({ error: true, errorMessage: response.error, submitDisabled: false, pending: false });
      return;
    }

    this.props.createNotification(`Project ${name} was created successfully!`); 
    this.setState({ pending: false });
    this.handleClose();
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Dialog
          open={this.props.opened}
          onClose={this.handleClose}
          aria-labelledby='form-dialog-title'
          disableBackdropClick
          disableEscapeKeyDown
        >
          <DialogTitle id='form-dialog-title'>New room</DialogTitle>
          <DialogContent>
            <form noValidate autoComplete='off' onSubmit={(e) => this.submit(e)}>
              <TextField
                name='name'
                label='Name'
                type='text'
                fullWidth
                required
                error={this.state.error}
                onChange={(e) => this.validate(e.target.value)}
              />
              <TextField
                name='password'
                margin='normal'
                label='Password'
                type='password'
                fullWidth
              />
              { this.state.errorMessage && <p className={classes.errorMessage}>{ this.state.errorMessage }</p> }
              <DialogActions>
                <Button disabled={this.state.pending} onClick={this.handleClose} color='primary'>
                  Cancel
                </Button>
                <Button type='submit' color='primary' disabled={this.state.submitDisabled || this.state.pending}>
                  {!this.state.pending && 'Create'}
                  {this.state.pending && 'Creating...'}
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

FormDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    opened: state.ui.createFormOpened
  };
};

const connectedFormDialog = connect(
  mapStateToProps,
  { toggleCreateForm, createNotification }
)(FormDialog);

export default withStyles(styles)(connectedFormDialog);
