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
    setTimeout(() => {
      socketService.getSocket().on('show votes', () => {
        this.props.setShowing(true);
        if ((!this.props.playersVote && this.props.playersVote !== 0)) {
          this.props.setPlayersVote(0);
          this.props.clearPlayersReady();
        }
        socketService.getSocket().emit('my vote', { id: socketService.getId(), vote: this.props.playersVote });
      });
      socketService.getSocket().on('my vote', (data) => {
        this.updateVotes(data);
      });
      socketService.getSocket().on('clear votes', () => {
        this.props.setShowing(false);
        this.props.setPlayersVote(null);
        this.props.clearOtherVotes();
        this.props.clearPlayersReady();
      });
      socketService.getSocket().on('voted', (data) => {
        this.props.updatePlayersReady(data);
      });
      socketService.getSocket().on('set poker title', (newTitle) => {
        this.props.updatePokerTitle(newTitle);
      });
      socketService.getSocket().on('joined', (data) => {
        const { isShowingVotes, otherVotes, playersReady, pokerTitle } = this.props;
        const currentState = { isShowingVotes, otherVotes, playersReady, pokerTitle };
        socketService.getSocket().emit('init game', { id: data.id, currentState });
      });
      socketService.getSocket().on('current game state', (currentState) => {
        Object.keys(currentState.otherVotes).forEach((key) => {
          this.props.updateOtherVotes({ id: key, vote: currentState.otherVotes[key] });
        });
        Object.keys(currentState.playersReady).forEach((key) => {
          this.props.updatePlayersReady(key);
        });
        this.props.setShowing(currentState.isShowingVotes);
        this.props.updatePokerTitle(currentState.pokerTitle);
      });
    }, 1000);
  }

  vote = (value) => {
    this.props.setPlayersVote(value);
    socketService.getSocket().emit('voted', socketService.getId());
  }

  showVotes = () => {
    socketService.emitShowVotes();
    this.props.setShowing(true);
  }

  updateVotes = (data) => {
    this.props.updateOtherVotes(data);
  }

  clearVotes = () => {
    socketService.getSocket().emit('clear votes');
    this.props.setShowing(false);
    this.props.setPlayersVote(null);
    this.props.clearOtherVotes();
    this.props.clearPlayersReady();
  }

  updatePokerTitle = (newTitle) => {
    socketService.getSocket().emit('set poker title', newTitle);
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
        />
        <PokerBody 
          user={{ username, id: socketService.getId }}
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
