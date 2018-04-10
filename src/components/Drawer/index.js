import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List';
import { toggleDrawer, toggleCreateForm } from '../../reducers/uiReducer';
import FrontPageListItems from './FrontPageListItems';
import ProjectListItems from './ProjectListItems';

const styles = {
};

const AppDrawer = (props) => {
  return (
    <div>
      <Drawer open={props.opened} onClose={() => props.toggleDrawer()}>
        <List role='button'
          onClick={() => props.toggleDrawer()}
          onKeyDown={() => props.toggleDrawer()}>
          {!props.hasProject && <FrontPageListItems actions={props} />}
          {props.hasProject && <ProjectListItems actions={props} />}
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
    opened: state.ui.drawerOpened,
    hasProject: state.auth.project !== null
  };
};

const connectedAppDrawer = connect(
  mapStateToProps,
  { toggleDrawer, toggleCreateForm }
)(AppDrawer);

export default withStyles(styles)(connectedAppDrawer);
