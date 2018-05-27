import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import CheckIcon from 'material-ui-icons/Check';
import Avatar from 'material-ui/Avatar';
import { setAvatarId } from '../../reducers/pokerReducer';
import { setOtherPlayerAvatarId } from '../../reducers/projectReducer';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('../../assets/avatars', false, /\.(svg)$/));

const getRandomImageId = () => {
  return Math.round(Math.random() * Object.keys(images).length + 1);
}

const Player = ({ classes, player, vote, user, ready, isShowingVotes, avatarId, setAvatarId, setOtherPlayerAvatarId }) => {
  if (!avatarId) {
    const newId = getRandomImageId();
    setAvatarId(newId);
  }
  if (!user && !player.avatarId) {
    setOtherPlayerAvatarId(getRandomImageId(), player.id);
  }
  return (
    <div className={classes.playerContainer}>
      <div className={classes.userInfo}>
        <Avatar src={images[`${user ? avatarId : player.avatarId}.svg`]} />
        <p className={[user ? classes.user : '', classes.username].join(' ')}>{player.username}</p>
      </div>
      {
        ready &&
        <CheckIcon className={classes.checked} />
      }
      {
        ((vote === 0 || vote === undefined || vote === null) && isShowingVotes) &&
        <div>???</div>
      }
      {
        (vote !== undefined && vote !== null) &&
        <div>{ vote }</div>
      }
      {
        (!isShowingVotes && (vote === undefined || vote === null)) &&
          <div className={classes.hidden}>?</div>
      }
    </div>
  );
};

const styles = {
  playerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px',
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
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center'
  },
  username: {
    fontSize: '18px',
    marginLeft: '15px'
  }
};

const mapStateToProps = (state) => {
  return {
    avatarId: state.poker.avatarId
  }
}

const ConnectedPlayer = connect(
  mapStateToProps,
  { setAvatarId, setOtherPlayerAvatarId }
)(Player);

export default withStyles(styles)(ConnectedPlayer);
