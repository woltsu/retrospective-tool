import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

const styles = {
  notification: {
    color: 'green',
    width: '380px',
    textAlign: 'center',
    marginTop: '15px',
    borderRadius: '5px',
    backgroundColor: 'white',
    fontSize: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
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
