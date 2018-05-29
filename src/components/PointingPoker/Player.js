import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import anime from 'animejs';
import { setAvatarId } from '../../reducers/pokerReducer';
import { setOtherPlayerAvatarId } from '../../reducers/projectReducer';
import card from '../../assets/card.svg';

function importAll(r) {
  let images = {};
  r.keys().map((item) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('../../assets/avatars', false, /\.(svg)$/));

const getRandomImageId = () => {
  return Math.floor(Math.random() * Object.keys(images).length + 1);
};

class Player extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      moveAnimation: null,
      revealAnimation: null,
      cardFrontsideAnimation: null,
      prevVote: null,
    };
  }

  componentDidMount = () => {
    if (!this.props.avatarId) {
      const newId = getRandomImageId();
      this.props.setAvatarId(newId);
    }
    if (!this.props.user && !this.props.player.avatarId) {
      this.props.setOtherPlayerAvatarId(getRandomImageId(), this.props.player.id);
    }

    const animationId = this.props.user ? 1 : this.props.player.id;
    const moveAnimation = anime({
      targets: `#animation-${animationId}`,
      left: {
        value: '90%',
        elasticity: 0,
        duration: 600,
        easing: 'easeInOutQuad'
      },
      rotate: {
        value: 720,
        duration: 600,
        elasticity: 0,
        easing: 'easeInOutQuad'
      },
      duration: 600,
      autoplay: false,
    });
    const offset = 1500 * Math.random();
    const revealAnimation = anime({
      targets: `#animation-card-${animationId}`,
      rotateY: {
        value: 180,
        duration: 300,
        elasticity: 100,
        easing: 'linear'
      },
      opacity: {
        opacity: 0,
        duration: 150,
        elasticity: 0,
        easing: 'linear'
      },
      duration: 300,
      autoplay: false,
      offset,
    });
    
    const cardFrontsideAnimation = anime({
      targets: `#animation-${animationId}`,
      rotateY: {
        value: 180,
        duration: 150,
        elasticity: 100,
        easing: 'linear'
      },
      duration: 150,
      autoplay: false,
      offset,
    });

    if (this.props.isShowingVotes && this.props.vote) {
      const timeline = anime.timeline({
        autoplay: true,
      });

      timeline
        .add({
          targets: `#animation-${animationId}`,
          left: {
            value: '90%',
            elasticity: 0,
          },
          rotate: {
            value: 360,
            elasticity: 0
          },
        })
        .add({
          targets: `#animation-card-${animationId}`,
          rotateY: {
            value: 180,
            elasticity: 100,
          },
          opacity: {
            opacity: 0,
            elasticity: 0,
            easing: 'linear',
          },
        })
        .add({
          targets: `#animation-${animationId}`,
          rotateY: {
            value: 180,
            duration: 500,
            elasticity: 100,
          },
          offset: '-=980'
        });

    } else if (this.props.vote || this.props.ready) {
      moveAnimation.restart();
    }
    this.setState({ moveAnimation, revealAnimation, cardFrontsideAnimation });
  }

  UNSAFE_componentWillReceiveProps = (props) => {
    if (this.props.user && !this.props.vote && props.vote) {
      this.state.moveAnimation.restart();

    } else if (this.props.vote && !props.vote) {
      this.setState({ prevVote: this.props.vote });
      this.state.revealAnimation.reverse();
      this.state.revealAnimation.play();
      this.state.moveAnimation.reverse();
      this.state.moveAnimation.play();

    } else if (!this.props.ready && props.ready) {
      this.state.moveAnimation.restart();
    
    } else if (!this.props.isShowingVotes && props.isShowingVotes && (this.props.vote || this.props.ready)) {
      this.state.revealAnimation.restart();
      this.state.cardFrontsideAnimation.restart();

    }
  }

  render() {
    const { classes, player, vote, user, isShowingVotes, avatarId } = this.props;
    return (
      <div className={classes.playerContainer}>
        <div className={classes.userInfo}>
          <Avatar src={images[`${ user ? avatarId : player.avatarId }.svg`]} alt='avatar' />
          <p className={[user ? classes.user : '', classes.username].join(' ')}>{player.username}</p>
        </div>
        { true &&
          <div className={classes.cardPath}>
            <div id={`animation-${user ? 1 : player.id}`} className={classes.card}>
              <span className={[classes.result, isShowingVotes ? classes.showing : ''].join(' ')}>{ vote || this.state.prevVote }</span>
              <img id={`animation-card-${user ? 1 : player.id}`} src={card} height='40px' width='auto' />
            </div>
          </div>
        }
      </div>
    );
  }
}

const styles = {
  playerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px',
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
  },
  cardPath: {
    position: 'relative',
    width: '100%',
    left: '5px'
  },
  card: {
    position: 'absolute',
    left: '1px',
    top: '-20px',
    zIndex: 2,
    height: '40px',
    backgroundColor: '#f1f1f1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  result: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    border: '1px solid black',
  },
  showing: {
    transform: 'rotateY(-180deg)',
  }
};

const mapStateToProps = (state) => {
  return {
    avatarId: state.poker.avatarId
  };
};

const ConnectedPlayer = connect(
  mapStateToProps,
  { setAvatarId, setOtherPlayerAvatarId }
)(Player);

export default withStyles(styles)(ConnectedPlayer);
