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
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './styles/measurementsStyles';

function MeasurementsForm(props) {
  const { classes, dispatch, estimate } = props;

  const [roomLength, handleChangeLength, resetLength] = useInputState('');
  const [sqfPrice, handleChangeSqfPrice, resetSqfPrice] = useInputState('0');
  const [roomWidth, handleChangeWidth, resetWidth] = useInputState('');

  const handleSubmitMeasure = () => {
    return dispatch({
      type: 'ADDMEASURE',
      id: estimate.id,
      measures: { roomLength, roomWidth, sqfPrice },
    });
  };
  const handleDelete = (index) => {
    dispatch({ type: 'DELMEASURE', id: estimate.id, index });
  };
  let totalSqf = () => {
    let total = 0;
    estimate.measures.map((x) =>
      !isNaN(x.roomLength) ? (total += x.roomLength * (x.roomWidth || 1)) : null
    );
    return total;
  };
  let totalSqfPrice = () => {
    let total = 0;
    estimate.measures.map((x) =>
      !isNaN(x.roomLength) ? (total += x.roomLength * (x.roomWidth || 1)* x.sqfPrice) : null
    );
    return total;
  };
  return (
    <Fragment>
      <Paper>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmitMeasure();
            resetLength();
            resetWidth();
            resetSqfPrice();
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography align="center" variant="h6">
                Measurements
              </Typography>
              <Typography
                align="center"
                className={classes.title}
                variant="subtitle2"
              >
                *Length can be used for Length, Name or Sqf.
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                autoFocus
                variant="outlined"
                required
                className={classes.textfield}
                value={roomLength}
                onChange={handleChangeLength}
                margin="normal"
                label="Length"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                value={roomWidth}
                onChange={handleChangeWidth}
                margin="normal"
                type="number"
                label="Width"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                value={sqfPrice}
                onChange={handleChangeSqfPrice}
                margin="normal"
                type="number"
                label="Sqf Price"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                fullWidth
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
                    ? `${measure.roomWidth} x ${measure.roomLength}`
                    : `${measure.roomLength}`
                }
                secondary={
                  !isNaN(measure.roomLength) && measure.roomWidth
                    ? `${measure.roomWidth * measure.roomLength} sqf @ $${measure.sqfPrice}`
                    : !isNaN(measure.roomLength) ? `${measure.roomLength} sqf @ $${measure.sqfPrice}` : `${measure.roomLength} sqf`
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

      <Paper>
        <Typography align="center" variant="subtitle1">
          Total: {totalSqf()} Sqf (${totalSqfPrice().toFixed(2)})
        </Typography>
      </Paper>
    </Fragment>
  );
}

export default withStyles(styles)(MeasurementsForm);
