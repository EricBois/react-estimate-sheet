import React from 'react';
import { useHistory } from "react-router-dom";
import { v4 as uuid } from 'uuid';
import useInputState from './hooks/useInputState';


import { withStyles } from '@material-ui/styles';
import styles from './styles/createEstimateStyles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';

function CreateEstimateForm(props) {
  const [name, handleChangeName, resetName] = useInputState('');
  const [address, handleChangeAddress, resetAddress] = useInputState('');
  const [note, handleChangeNote, resetNote] = useInputState('');

  const { classes, dispatch } = props;
  const history = useHistory();
  const id = uuid()

  const handleSubmit = () => {
    dispatch({ type: 'ADD', id, name, address, note });
    resetName();
    resetAddress();
    resetNote();
    history.push(`/estimate/${id}`)
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
          handleSubmit();
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
          <Button type="submit">Create</Button>
        </Grid>
      </form>
    </Paper>
  );
}

export default withStyles(styles)(CreateEstimateForm);
