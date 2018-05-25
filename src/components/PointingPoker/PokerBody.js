import React from 'react';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Player from './Player';

class PokerBody extends React.Component {
  render() {
    const { classes, user, players, playersVote, otherVotes, playersReady } = this.props;
    return (
      <Card className={classes.pokerBodyContainer}>
        <CardContent className={classes.cardContent}>
          <Player user player={user} vote={playersVote} />
          <Divider light />
          { players && players.map((p, i) =>
            <div key={i}>
              <Player player={p} vote={otherVotes[p.id]} ready={playersReady[p.id]} />
              <Divider light/>
            </div>
          ) }
        </CardContent>
      </Card>
    );
  }
}

const styles = {
  pokerBodyContainer: {
    overflowY: 'auto',
    flex: 0.6
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 0
  }
};

export default withStyles(styles)(PokerBody);
