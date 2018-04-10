import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import CreateIcon from 'material-ui-icons/Create';

const FrontPageListItems = ({ actions }) => {
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

export default FrontPageListItems;
