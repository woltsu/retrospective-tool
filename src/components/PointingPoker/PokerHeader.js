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
            placeholder='TITLE'
            value={pokerTitle || ''}
            onChange={(e) => updatePokerTitle(e.target.value)}
          />
          <div className={classes.headerControls}>
            {
              !isShowingVotes &&
                <Button className={classes.actionButton} onClick={() => showVotes()}>SHOW VOTES</Button>
            }
            {
              isShowingVotes &&
                <div className={classes.includeResult}>
                  <span className={classes.result}>RESULT: {this.props.calculateAverage()}</span>
                  <Button className={classes.actionButton} onClick={() => clearVotes()}>CLEAR VOTES</Button>
                </div>
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
    flex: 1,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  headerControls: {
    marginTop: '10px',
    width: '100%'
  },
  result: {
    fontSize: '18px',
    marginBottom: 0
  },
  includeResult: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  actionButton: {
    float: 'right'
  }
};

export default withStyles(styles)(PokerHeader);
