import React from 'react';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';

class PokerControls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4]
    };
  }

  render() {
    const { classes, vote, isShowingVotes } = this.props;
    return (
      <Card className={classes.pokerControlsContainer}>
        <CardContent className={classes.cardContent}>
          { this.state.values.map((value, i) =>
            <Button disabled={isShowingVotes} key={i} onClick={() => vote(value)}>{ value }</Button>
          ) }
        </CardContent>
      </Card>
    );
  }
}

const styles = {
  pokerControlsContainer: {
    flex: 0.3
  },
  cardContent: {
    display: 'grid',
    gridAutoFlow: 'row',
    gridTemplateColumns: 'repeat(2, 1fr)'
  }
};

export default withStyles(styles)(PokerControls);
