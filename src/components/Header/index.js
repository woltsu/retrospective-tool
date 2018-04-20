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
    <AppBar position='sticky' color='primary'>
      <Toolbar>
        <IconButton onClick={() => props.toggleDrawer()} className={classes.menuButton} color="inherit" aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <Typography variant='title' color='inherit' className={classes.flex}>
          { (props.projectName && `Project ${props.projectName}`) || 'Retrospective tool' }
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    projectName: state.project.name
  };
};

const connectedHeader = connect(
  mapStateToProps,
  { toggleDrawer }
)(Header);

export default withStyles(styles)(connectedHeader);