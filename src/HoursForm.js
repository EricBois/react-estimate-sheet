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

function HoursForm(props) {
  const { classes, dispatch, estimate } = props;

  const [item, handleChangeItem, resetItem] = useInputState('');
  const [hours, handleChangeHours, resetHours] = useInputState('');
  const [price, handleChangePrice, resetPrice] = useInputState('');

  const handleSubmitHours = () => {
    dispatch({
      type: 'ADDHOURS',
      id: estimate.id,
      hours: { item, hours, price },
    });
    resetItem();
    resetHours();
    resetPrice();
  };
  const handleDelete = (index) => {
    dispatch({ type: 'DELHOURS', id: estimate.id, index });
  };
  let totalHours = () => {
    let total = 0;
    estimate.hours.map((x) => (total += x.hours * x.price));
    return total;
  };
  return (
    <Fragment>
      <Paper>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmitHours();
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography align="center" variant="h6">
                Hours
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                autoFocus
                variant="outlined"
                required
                className={classes.textfield}
                value={item}
                onChange={handleChangeItem}
                margin="normal"
                label="Item Name"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                value={hours}
                required
                onChange={handleChangeHours}
                margin="normal"
                type="number"
                label="Hours"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                value={price}
                required
                onChange={handleChangePrice}
                margin="normal"
                type="number"
                label="Price"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                size="small"
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Divider />
      {estimate && estimate.hours && (
        <List dense>
          {estimate.hours.map((hour, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar>
                  <LabelImportantIcon color="secondary" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={hour ? `${hour.item}` : ''}
                secondary={
                  hour
                    ? `${hour.hours} Hour(s) @ $${hour.price} / hour ($${
                        hour.hours * hour.price
                      })`
                    : ''
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
          Total: ${totalHours()}
        </Typography>
      </Paper>
    </Fragment>
  );
}

export default withStyles(styles)(HoursForm);
