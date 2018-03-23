import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import CssBaseline from 'material-ui/CssBaseline';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ExampleComponent from './components/ExampleComponent';
import Header from './components/Header';

const styles = {
  containerStyle: {
    minHeight: '100%',
    maxHeight: '100%',
    display: 'flex',
    flexDirection: 'column'
  }
};

class App extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Router>
        <div className={classes.containerStyle}>
          <CssBaseline />          
          <Header />
          <Route exact path='/' render={() => <ExampleComponent />} />
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
