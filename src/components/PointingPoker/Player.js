import React from 'react';
import { withStyles } from 'material-ui/styles';
import CheckIcon from 'material-ui-icons/Check';

const Player = ({ classes, player, vote, user, ready }) => {
  return (
    <div className={classes.playerContainer}>
      <p className={user ? classes.user : ''}>{player.username}</p>
      {
        ready &&
        <CheckIcon className={classes.checked} />
      }
      {
        (vote || vote === 0) &&
        <div>{ vote }</div>
      }
      {
        (!vote && vote !== 0) &&
      <div className={classes.result}></div>
      }
    </div>
  );
};

const styles = {
  playerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  result: {
    width: '40px',
    height: '20px',
    backgroundColor: 'black',
  },
  user: {
    fontWeight: 'bold'
  },
  checked: {
    color: 'green'
  }
};

export default withStyles(styles)(Player);
