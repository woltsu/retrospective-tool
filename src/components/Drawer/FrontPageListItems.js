import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import AddIcon from 'material-ui-icons/Add';

const FrontPageListItems = ({ actions }) => {
  return (
    <div>
      <ListItem button onClick={() => actions.toggleCreateForm()}>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary='New room' />
      </ListItem>
    </div>
  );
};

export default FrontPageListItems;
