import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

const styles = {
  notification: {
    color: 'green',
    border: '1px solid',
    padding: '3px 10px',
    width: '350px',
    textAlign: 'center',
    marginTop: '15px',
    borderRadius: '8px',
    backgroundColor: 'white'
  },
  error: {
    color: 'red'
  }
};

const Notification = (props) => {
  const { classes, notification } = props;
  const classNames = [classes.notification];
  if (notification.isError) {
    classNames.push(classes.error);
  }
  return (
    <Paper className={classNames.join(' ')}>
      <p>{ notification.message }</p>
    </Paper>
  );
};

Notification.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Notification);
