import React, { Fragment, useContext } from 'react';
import useToggleState from './hooks/useToggleState';
import EstimateForm from './Forms/EstimateForm';
import { useHistory } from 'react-router-dom';
import FirebaseContext from "../firebase/context";

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Paper from '@material-ui/core/Paper';


export default function EstimateList(props) {
  const { estimate, dispatch } = props;
  const [isEditing, toggle] = useToggleState(false);
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const handleClick = (id) => {
    history.push(`/estimate/${id}`);
  };
  const handleDelete = (id) => {
    dispatch({ type: 'REMOVE', id: id });
    deleteFromDb();
  };
  const deleteFromDb = () => {
    firebase.delete(estimate.id);
  };
  const saveToDb = (id, name, address, note ) => {
    dispatch({ type: 'EDIT', id: estimate.id, name, address, note });
    firebase.edit(estimate.id, {name, address, note})
    
  };
  return (
    <Fragment>
      <Paper variant="outlined" elevation={23} style={{maxWidth: '580px', backgroundColor: '#ecf2f9', margin: '8px auto'}}>
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
      </Paper>
    </Fragment>
  );
}
