import React from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import useInputState from '../../hooks/useInputState';

import { withStyles } from '@material-ui/styles';
import styles from '../../styles/createEstimateStyles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';

function EstimateForm(props) {
  const { classes, mode, saveToDb, estimate, toggleEditForm } = props;
  const [name, handleChangeName, resetName] = useInputState(estimate.name);
  const [address, handleChangeAddress, resetAddress] = useInputState(estimate.address);
  const [note, handleChangeNote, resetNote] = useInputState(estimate.note);

  const history = useHistory();
  const id = uuid();

  const handleSubmit = () => {
    saveToDb(id, name, address, note);
    resetName();
    resetAddress();
    resetNote();
    
    !toggleEditForm ? history.push(`/estimate/${id}`) : toggleEditForm()
  };

  return (
    <Paper elevation={3} className={classes.paper}>
      <Typography className={classes.title} variant="h5">
        Client Info
      </Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Grid container justify="center" spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              value={name}
              onChange={handleChangeName}
              margin="normal"
              label="Client Name"
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
          {!toggleEditForm ? (
            <Button type="submit">{mode}</Button>
          ) : (
            <>
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
                  {mode}
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </form>
    </Paper>
  );
}

export default withStyles(styles)(EstimateForm);
