import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Notification from './Notification';

const styles = {
  notifications: {
    position: 'fixed',
    top: '15px',
    left: '50%',
    transform: 'translate(-50%)',
    zIndex: '1100'
  }
};

class Notifications extends React.Component {
  render() {
    const { classes, notifications } = this.props;
    return (
      <div className={ classes.notifications }>
        { notifications.map((notification, i) => {
          return <Notification key={i} notification={notification} />;
        }) }
      </div>
    );
  }
}

Notifications.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    notifications: state.notification.notifications
  };
};

const connectedNotifications = connect(
  mapStateToProps
)(Notifications);

export default withStyles(styles)(connectedNotifications);
