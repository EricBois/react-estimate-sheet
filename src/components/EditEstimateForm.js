import React from 'react';
import useInputState from '../hooks/useInputState';
import { database } from '../firebase';
import { withStyles } from '@material-ui/styles';
import styles from '../styles/createEstimateStyles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';

function EditEstimateForm(props) {
  const { classes, dispatch, estimate, toggleEditForm } = props;
  const [name, handleChangeName, resetName] = useInputState(estimate.name);
  const [address, handleChangeAddress, resetAddress] = useInputState(
    estimate.address
  );
  const [note, handleChangeNote, resetNote] = useInputState(estimate.note);

  const handleSubmitForm = () => {
    dispatch({ type: 'EDIT', id: estimate.id, name, address, note });
    resetName();
    resetAddress();
    resetNote();
    toggleEditForm();
  };

  const editDocFirestore = async () => {
    const db = await database;
    return db.collection('estimates').doc(estimate.id.toString()).update({
      name,
      address,
      note,
    });
  };

  return (
    <Paper
      elevation={3}
      style={{
        padding: '0px 15px',
        margin: 'auto',
        maxWidth: '850px',
        height: '80vh',
        backgroundColor: '#fafafa',
        textAlign: 'center',
      }}
    >
      <Typography className={classes.title} variant="h5">
        Client Info
      </Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmitForm();
          editDocFirestore();
        }}
      >
        <Grid container justify="center" spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              value={name}
              onChange={handleChangeName}
              margin="normal"
              label="Name"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              value={address}
              onChange={handleChangeAddress}
              margin="normal"
              label="Address"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextareaAutosize
              value={note}
              onChange={handleChangeNote}
              className={classes.textArea}
              aria-label="minimum height"
              rowsMin={5}
              placeholder="*OPTIONAL, Describe work / project"
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              color="secondary"
              variant="contained"
              fullWidth
              onClick={() => toggleEditForm()}
            >
              CANCEL
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
            >
              Edit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
export default withStyles(styles)(EditEstimateForm);
