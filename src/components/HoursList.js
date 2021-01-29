import React from 'react';
import useToggleState from '../hooks/useToggleState';
import EditHoursForm from './Forms/EditHoursForm';

import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

function HoursList(props) {
  const { hour, estimate, dispatch, index } = props;
  const [isEditing, toggle] = useToggleState(false);
  const handleDelete = (index) => {
    dispatch({ type: 'DELHOURS', id: estimate.id, index });
  };
  return (
    <ListItem>
      {isEditing ? (
        <EditHoursForm
          estimate={estimate}
          hour={hour}
          index={index}
          toggleEditForm={toggle}
          dispatch={(props) => dispatch(props)}
        />
      ) : (
        <>
          <ListItemAvatar>
            <Avatar>
              <LabelImportantIcon color="secondary" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={hour ? `${hour.item}` : ''}
            secondary={
              hour
                ? `${hour.hours} hrs @ $${hour.price.toFixed(2)} ($${
                    (hour.hours * hour.price).toFixed(2)
                  })`
                : ''
            }
          />
          <ListItemSecondaryAction>
            <IconButton aria-label="edit" onClick={toggle}>
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => handleDelete(index)}
              edge="end"
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </>
      )}
    </ListItem>
  );
}

export default HoursList;
