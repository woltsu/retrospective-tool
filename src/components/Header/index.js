import React from 'react';
import { connect } from 'react-redux';
import { toggleDrawer } from '../../reducers/uiReducer';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MenuIcon from 'material-ui-icons/Menu';
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
} from 'material-ui';

const styles = {
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const Header = (props) => {
  const { classes } = props;
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <IconButton onClick={() => props.toggleDrawer()} className={classes.menuButton} color="inherit" aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="title" color="inherit" className={classes.flex}>
            Retrospective tool
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

const connectedHeader = connect(
  null,
  { toggleDrawer }
)(Header);

export default withStyles(styles)(connectedHeader);