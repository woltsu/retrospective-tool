import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import CreateIcon from 'material-ui-icons/Create';
import { toggleDrawer, toggleCreateForm } from '../../reducers/uiReducer';

const styles = {
};

const DrawerListItems = ({ actions }) => {
  return (
    <div>
      <ListItem button onClick={() => actions.toggleCreateForm()}>
        <ListItemIcon>
          <CreateIcon />
        </ListItemIcon>
        <ListItemText primary='New project' />
      </ListItem>
    </div>
  );
};

const AppDrawer = (props) => {
  return (
    <div>
      <Drawer open={props.opened} onClose={() => props.toggleDrawer()}>
        <List role='button'
          onClick={() => props.toggleDrawer()}
          onKeyDown={() => props.toggleDrawer()}>
          <DrawerListItems actions={props} />
        </List>
      </Drawer>
    </div>
  );
};

AppDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    opened: state.ui.drawerOpened
  };
};

const connectedAppDrawer = connect(
  mapStateToProps,
  { toggleDrawer, toggleCreateForm }
)(AppDrawer);

export default withStyles(styles)(connectedAppDrawer);
