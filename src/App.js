import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import CssBaseline from 'material-ui/CssBaseline';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import FrontPage from './components/FrontPage';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Notifications from './components/Notifications';
import Project from './components/Project';

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
          <Drawer />
          <Notifications />
          <Route exact path='/' render={() => <FrontPage />} />
          <Route exact path='/project/:name' render={() => <Project />} />
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
