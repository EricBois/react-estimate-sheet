import React, { Fragment } from 'react';
import useToggleState from '../hooks/useToggleState';
import EstimateForm from './forms/EstimateForm';
import { useHistory } from 'react-router-dom';
import useDb from '../store/Db';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';


export default function EstimateList(props) {
  const { estimate, dispatch } = props;
  const [isEditing, toggle] = useToggleState(false);
  const history = useHistory();
  const { deleteEstimate, editEstimate } = useDb();

  const handleClick = (id) => {
    history.push(`/estimate/${id}`);
  };
  const handleDelete = (id) => {
    dispatch({ type: 'REMOVE', id: id });
    deleteFromDb();
  };
  const deleteFromDb = () => {
    deleteEstimate(estimate.id);
  };
  const saveToDb = (id, name, address, note ) => {
    dispatch({ type: 'EDIT', id: estimate.id, name, address, note });
    editEstimate(estimate.id, {name, address, note})
    
  };
  return (
    <Fragment>
      {isEditing ? (
        <EstimateForm
        mode="Edit"
        estimate={estimate}
        saveToDb={saveToDb}
        toggleEditForm={toggle}
      />
      ) : (
        <>
          <ListItem onClick={() => handleClick(estimate.id)} button>
            <ListItemIcon>
              <HomeWorkIcon />
            </ListItemIcon>
            <ListItemText
              primary={estimate.name}
              secondary={`${estimate.address}`}
            />
            <ListItemSecondaryAction>
              <IconButton aria-label="edit" onClick={toggle}>
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => handleDelete(estimate.id)}
                edge="end"
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </>
      )}
    </Fragment>
  );
}
