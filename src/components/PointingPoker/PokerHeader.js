import React from 'react';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Input from 'material-ui/Input';
import Button from 'material-ui/Button';

class PokerHeader extends React.Component {
  render() {
    const {
      classes,
      showVotes,
      isShowingVotes,
      clearVotes,
      pokerTitle,
      updatePokerTitle,
    } = this.props;
    return (
      <Card className={classes.headerContainer}>
        <CardContent className={classes.cardContent}>
          <Input
            fullWidth
            value={pokerTitle || ''}
            onChange={(e) => updatePokerTitle(e.target.value)}
          />
          <div className={classes.headerControls}>
            {
              !isShowingVotes &&
                <Button onClick={() => showVotes()}>SHOW</Button>
            }
            {
              isShowingVotes &&
                <Button onClick={() => clearVotes()}>CLEAR</Button>
            }
          </div>
        </CardContent>
      </Card>
    );
  }
}

const styles = {
  headerContainer: {
    flex: 0.2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '157px'
  },
  cardContent: {
    flex: 1
  },
  headerControls: {
    display: 'flex',
    justifyContent: 'space-around'
  }
};

export default withStyles(styles)(PokerHeader);
