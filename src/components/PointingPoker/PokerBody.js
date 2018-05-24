import React from 'react';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Player from './Player';

class PokerBody extends React.Component {
  calculateAverage = () => {
    const { playersVote, otherVotes } = this.props;
    let sum = playersVote ? parseFloat(playersVote) : 0;
    let n = 0;
    Object.keys(otherVotes).forEach((key) => {
      const vote = parseFloat(otherVotes[key]);
      n++;
      sum += vote;
    });
    const avg = sum / (1 + n);
    return (Math.round(avg * 2) / 2).toFixed(1);
  }

  render() {
    const { classes, user, players, playersVote, otherVotes, playersReady, isShowingVotes } = this.props;
    return (
      <Card className={classes.pokerBodyContainer}>
        <CardContent className={classes.cardContent}>
          <Player user player={user} vote={playersVote} />
          <Divider light />
          { players.map((p, i) =>
            <div key={i}>
              <Player player={p} vote={otherVotes[p.id]} ready={playersReady[p.id]} />
              <Divider light/>
            </div>
          ) }
          {
            isShowingVotes &&
            <p>AVERAGE: { this.calculateAverage() }</p>
          }
        </CardContent>
      </Card>
    );
  }
}

const styles = {
  pokerBodyContainer: {
    flex: 0.6
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column'
  }
};

export default withStyles(styles)(PokerBody);
