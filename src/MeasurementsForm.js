import React, { Fragment } from 'react';
import useInputState from './hooks/useInputState';
import { withStyles } from '@material-ui/styles';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './styles/measurementsStyles';

function MeasurementsForm(props) {
  const { classes, dispatch, estimate } = props;

  const [length, handleChangeLength, resetLength] = useInputState('');
  const [width, handleChangeWidth, resetWidth] = useInputState('');

  const handleSubmit = () => {
    dispatch({
      type: 'EDIT',
      ...estimate,
      measures: { length, width },
    });
    resetLength();
    resetWidth();
  };
  const handleDelete = (index) => {
    dispatch({ type: 'DELMEASURE', id: estimate.id, index });
  };
  let totalSqf = () => {
    let total = 0;
    estimate.measures.map((x) => total += (x.length * (x.width || 1)))
    return total;
  }
  return (
    <Fragment>
      <Paper>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography align="center" className={classes.title} variant="h6">
                Measurements
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                className={classes.textfield}
                value={length}
                onChange={handleChangeLength}
                margin="normal"
                label="Length"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                value={width}
                onChange={handleChangeWidth}
                margin="normal"
                label="Width"
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                className={classes.button}
                size="small"
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Divider />
      {estimate && (
        <List dense>
          {estimate.measures.map((measure, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar>
                  <LabelImportantIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  measure.length && measure.width
                    ? `${measure.width} x ${measure.length}`
                    : `${measure.length}`
                }
                secondary={
                  measure.length && measure.width
                    ? `${measure.width * measure.length} sqf`
                    : `${measure.length} sqf`
                }
              />
              <ListItemSecondaryAction onClick={() => handleDelete(index)}>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
      <Divider />

      <Paper><Typography align="center" variant="subtitle1">
      Total: {totalSqf()} Sqf</Typography></Paper>
    </Fragment>
  );
}

export default withStyles(styles)(MeasurementsForm);
