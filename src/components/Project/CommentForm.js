import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Input from 'material-ui/Input';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import Checkbox from 'material-ui/Checkbox';
import { FormControlLabel, FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { createComment } from '../../reducers/projectReducer';

const styles = {
  formContainer: {
    maxWidth: '339px'
  },
  formOptions: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '20px'
  },
  typeSelection: {
    flex: 1
  }
};

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      type: 'default',
      anonymous: true
    };
  }

  handleClose = () => {
    this.setState({
      content: '',
    });
    this.props.toggle();
  };


  submit = async (e) => {
    e.preventDefault();
    const content = e.target.comment.value;
    const creator = this.state.anonymous ? null : this.props.username;
    if (content.trim().length === 0) {
      return;
    }
    this.props.createComment({ content, creator, type: this.state.type }, this.props.token);
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
              {/*               {!this.state.anonymous &&
              <TextField
                name='name'
                value={this.state.name}
                onChange={(e) => this.setState({ name: e.target.value })}
                margin='normal'
                label='Name'
                fullWidth
              />
              } */}
              <div className={classes.formOptions}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.anonymous}
                      onChange={() => this.setState({ anonymous: !this.state.anonymous })}
                      color='primary'
                    />
                  }
                  label='Anonymous'
                />

                <FormControl className={classes.typeSelection}>
                  <Select
                    fullWidth
                    native
                    value={this.state.type}
                    onChange={(event) => this.setState({ type: event.target.value})}
                    input={<Input id='type-selectr' />}
                  >
                    <option value={'default'}>Default</option>
                    <option value={'start'}>Start</option>
                    <option value={'continue'}>Continue</option>
                    <option value={'stop'}>Stop</option>
                  </Select>
                </FormControl>
              </div>
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
    token: state.project.token,
    username: state.project.socket_username
  };
};

const ConnectedCommentForm = connect(
  mapStateToProps,
  { createComment }
)(CommentForm);

export default withStyles(styles)(ConnectedCommentForm);
