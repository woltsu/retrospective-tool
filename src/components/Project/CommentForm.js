import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import Checkbox from 'material-ui/Checkbox';
import { FormControlLabel } from 'material-ui/Form';
import { createComment } from '../../reducers/projectReducer';

const styles = {
  formContainer: {
    maxWidth: '339px'
  },
  checkboxContainer: {
    marginTop: '8px'
  }
};

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      anonymous: true
    };
  }

  handleClose = () => {
    this.setState({
      content: '',
      anonymous: true
    });
    this.props.toggle();
  };


  submit = async (e) => {
    e.preventDefault();
    const content = e.target.comment.value;
    const creator = e.target.name.value;
    if (content.trim().length === 0) {
      return;
    }
    this.props.createComment({ content, creator }, this.props.token);
    this.handleClose();
  }

  render() {
    const { classes, opened } = this.props;
    return (
      <div>
        <Dialog
          open={opened}
          onClose={this.handleClose}
          aria-labelledby='form-dialog-title'
          disableBackdropClick
          disableEscapeKeyDown
        >
          <DialogTitle id='form-dialog-title'>New comment</DialogTitle>
          <DialogContent className={classes.formContainer}>
            <form noValidate autoComplete='off' onSubmit={(e) => this.submit(e)}>
              <TextField
                name='comment'
                label='Comment'
                type='text'
                required
                multiline
                rows='3'
                fullWidth
                onChange={(e) => this.setState({ content: e.target.value })}
              />
              {!this.state.anonymous &&
              <TextField
                name='name'
                margin='normal'
                label='Name'
                fullWidth
              />
              }
              <FormControlLabel
                className={classes.checkboxContainer}
                control={
                  <Checkbox
                    checked={this.state.anonymous}
                    onChange={() => this.setState({ anonymous: !this.state.anonymous })}
                    color='primary'
                  />
                }
                label='Anonymous'
              />
              <DialogActions>
                <Button onClick={this.handleClose} color='primary'>
                  Cancel
                </Button>
                <Button type='submit' color='primary' disabled={this.state.content.trim().length === 0}>
                  Create
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.project.token
  };
};

const ConnectedCommentForm = connect(
  mapStateToProps,
  { createComment }
)(CommentForm);

export default withStyles(styles)(ConnectedCommentForm);
