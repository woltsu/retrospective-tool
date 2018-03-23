import React from 'react';
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

const ButtonAppBar = (props) => {
  const { classes } = props;
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="title" color="inherit" className={classes.flex}>
            Retrospective tool
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);