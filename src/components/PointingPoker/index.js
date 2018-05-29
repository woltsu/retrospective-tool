import React from 'react';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import PokerHeader from './PokerHeader';
import PokerBody from './PokerBody';
import PokerControls from './PokerControls';
import socketService from '../../services/socketService';
import {
  setShowing,
  setPlayersVote,
  updateOtherVotes,
  clearOtherVotes,
  updatePlayersReady,
  clearPlayersReady,
  updatePokerTitle,
} from '../../reducers/pokerReducer';

class PointingPoker extends React.Component {
  componentDidMount = () => {
    socketService.addListener('clear votes', () => this.resetState());
    socketService.addListener('my vote', (data) => this.props.updateOtherVotes(data));
    socketService.addListener('voted', (data) => this.props.updatePlayersReady(data));
    socketService.addListener('set poker title', (newTitle) => this.props.updatePokerTitle(newTitle));
    socketService.addListener('show votes', () => {
      this.props.setShowing(true);
      socketService.emit('my vote', { id: socketService.getId(), vote: this.props.playersVote });
      this.props.clearPlayersReady();
    });
    socketService.addListener('joined', (data) => {
      const { isShowingVotes, otherVotes, pokerTitle } = this.props;
      let playersReady = this.props.playersReady;
      if (isShowingVotes && this.props.playersVote) {
        otherVotes[socketService.getId()] = this.props.playersVote;
      } else if (this.props.playersVote) {
        playersReady[socketService.getId()] = true;
      }
      const currentState = { isShowingVotes, otherVotes, playersReady, pokerTitle };
      socketService.emit('init game', { id: data.id, currentState });
    });
    socketService.addListener('current game state', (currentState) => {
      Object.keys(currentState.otherVotes).forEach((key) => {
        this.props.updateOtherVotes({ id: key, vote: currentState.otherVotes[key] });
      });
      Object.keys(currentState.playersReady).forEach((key) => {
        this.props.updatePlayersReady(key);
      });
      this.props.setShowing(currentState.isShowingVotes);
      this.props.updatePokerTitle(currentState.pokerTitle);
    });
  }

  calculateAverage = () => {
    const { playersVote, otherVotes } = this.props;
    let sum = playersVote ? parseFloat(playersVote) : 0;
    let n = 0;
    if (sum > 0) {
      n++;
    }
    Object.keys(otherVotes).forEach((key) => {
      const vote = parseFloat(otherVotes[key]);
      if (vote) {
        n++;
        sum += vote;
      }
    });
    const roundedAvg = (Math.round((sum / n) * 2) / 2).toFixed(1);
    return isNaN(roundedAvg) ? '???' : roundedAvg;
  }

  resetState = () => {
    this.props.setShowing(false);
    this.props.setPlayersVote(null);
    this.props.clearOtherVotes();
    this.props.clearPlayersReady();
  }

  vote = (value) => {
    this.props.setPlayersVote(value);
    socketService.emit('voted', socketService.getId());
  }

  showVotes = () => {
    socketService.emitShowVotes();
    this.props.setShowing(true);
  }

  clearVotes = () => {
    socketService.emit('clear votes');
    this.resetState();
  }

  updatePokerTitle = (newTitle) => {
    socketService.emit('set poker title', newTitle);
    this.props.updatePokerTitle(newTitle);
  }

  render() {
    const { classes, username, players } = this.props;
    return (
      <div className={classes.container}>
        <PokerHeader
          showVotes={this.showVotes}
          isShowingVotes={this.props.isShowingVotes}
          clearVotes={this.clearVotes}
          pokerTitle={this.props.pokerTitle}
          updatePokerTitle={this.updatePokerTitle}
          calculateAverage={this.calculateAverage}
        />
        <PokerBody 
          user={{ username, id: socketService.getId() }}
          players={players}
          playersVote={this.props.playersVote}
          otherVotes={this.props.otherVotes}
          playersReady={this.props.playersReady}
          isShowingVotes={this.props.isShowingVotes}
        />
        <PokerControls vote={this.vote} isShowingVotes={this.props.isShowingVotes} />
      </div>
    );
  }
}

const styles = (theme) => ({
  container: {
    flex: 0.5,
    [theme.breakpoints.down(800)]: {
      flex: 1,
    },
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto'
  }
});

const mapStateToProps = (state) => {
  return {
    username: state.project.socket_username,
    players: state.project.socketUsers,
    isShowingVotes: state.poker.showing,
    playersVote: state.poker.playersVote,
    otherVotes: state.poker.otherVotes,
    playersReady: state.poker.playersReady,
    pokerTitle: state.poker.pokerTitle
  };
};

const ConnectedPointingPoker = connect(
  mapStateToProps,
  { setShowing,
    setPlayersVote,
    updateOtherVotes,
    clearOtherVotes,
    updatePlayersReady,
    clearPlayersReady,
    updatePokerTitle
  }
)(PointingPoker);

export default withStyles(styles)(ConnectedPointingPoker);
