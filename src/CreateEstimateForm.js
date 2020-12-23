import React from 'react';
import { v4 as uuid } from 'uuid';
import useInputState from './hooks/useInputState';
import estimateReducer from './reducers/estimate.reducer';
import useLocalStorageReducer from './hooks/useLocalStorageReducer';

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

  const [dispatch] = useLocalStorageReducer("estimates", [], estimateReducer);
  const { classes } = props;

  const handleSubmit = async () => {
    const id = uuid()
    await dispatch({ type: 'ADD', name, address, id });
    resetName();
    resetAddress();
    console.log(id)
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
