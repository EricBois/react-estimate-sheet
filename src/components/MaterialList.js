import React from 'react';
import useToggleState from '../hooks/useToggleState';
import EditMaterialForm from './forms/EditMaterialForm';

import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

function MaterialList(props) {
  const { material, estimate, dispatch, index } = props;
  const [isEditing, toggle] = useToggleState(false);
  const handleDelete = (index) => {
    dispatch({ type: 'DELMATERIAL', id: estimate.id, index });
  };
  return (
    <ListItem>
      {isEditing ? (
        <EditMaterialForm
          estimate={estimate}
          material={material}
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
            primary={material ? `${material.item}` : ''}
            secondary={
              material && material.price
                ? `${material.quantity} x $${material.price} ($${
                    material.quantity * material.price
                  })`
                : `Quantity: ${material.quantity}`
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

export default MaterialList;
