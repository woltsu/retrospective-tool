import React from 'react';
import { withStyles } from 'material-ui/styles';
import CheckIcon from 'material-ui-icons/Check';

const Player = ({ classes, player, vote, user, ready, isShowingVotes }) => {
  return (
    <div className={classes.playerContainer}>
      <p className={user ? classes.user : ''}>{player.username}</p>
      {
        ready && !vote &&
        <CheckIcon className={classes.checked} />
      }
      {
        ((vote === 0 || vote === undefined || vote === null) && isShowingVotes) &&
        <div>???</div>
      }
      {
        (vote !== undefined && vote !== null && isShowingVotes) &&
        <div>{ vote }</div>
      }
      {
        (!isShowingVotes) &&
          <div className={classes.hidden}>?</div>
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
  hidden: {
    width: '40px',
    height: '20px',
    backgroundColor: 'black',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold'
  },
  user: {
    fontWeight: 'bold'
  },
  checked: {
    color: 'green'
  }
};

export default withStyles(styles)(Player);
