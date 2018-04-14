import React from 'react';
import { connect } from 'react-redux';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import ExitToApp from 'material-ui-icons/ExitToApp';
import { projectLogout } from '../../reducers/projectReducer';

const ProjectListItems = (props) => {
  return (
    <div>
      <ListItem button onClick={() => props.projectLogout()}>
        <ListItemIcon>
          <ExitToApp />
        </ListItemIcon>
        <ListItemText primary='Exit' />
      </ListItem>
    </div>
  );
};

const ConnectedProjectListItems = connect(
  null,
  { projectLogout }
)(ProjectListItems);

export default ConnectedProjectListItems;
