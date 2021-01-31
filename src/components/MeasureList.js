import React from 'react';
import useToggleState from './hooks/useToggleState';
import EditMeasureForm from './Forms/EditMeasureForm';

import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

function MeasureList(props) {
  const { measure, estimate, dispatch, index } = props;
  const [isEditing, toggle] = useToggleState(false);
  return (
    <ListItem>
      {isEditing ? (
        <EditMeasureForm
          estimate={estimate}
          measure={measure}
          index={index}
          toggleEditForm={toggle}
          dispatch={(props) => dispatch(props)}
        />
      ) : (
        <>
          <ListItemAvatar>
            <Avatar>
              {!isNaN(measure.roomLength) ? (
                <AspectRatioIcon color="primary" />
              ) : (
                <ViewModuleIcon color="secondary" />
              )}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              !isNaN(measure.roomLength) && measure.roomWidth
                ? `${measure.roomLength} X ${measure.roomWidth}`
                : `${measure.roomLength}`
            }
            secondary={
              !isNaN(measure.roomLength) && measure.roomWidth
                ? `${(measure.roomLength * measure.roomWidth).toFixed(2)} sqf @ $${
                    measure.sqfPrice
                  }`
                : !isNaN(measure.roomLength)
                ? `${measure.roomLength} sqf @ $${measure.sqfPrice}`
                : `${measure.roomLength} sqf`
            }
          />
          <ListItemSecondaryAction>
            <IconButton aria-label="edit" onClick={toggle}>
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() =>
                dispatch({ type: 'DELMEASURE', id: estimate.id, index })
              }
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

export default MeasureList;
