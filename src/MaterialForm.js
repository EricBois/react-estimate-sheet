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

function MaterialForm(props) {
  const { classes, dispatch, estimate } = props;

  const [item, handleChangeItem, resetItem] = useInputState('');
  const [quantity, handleChangeQuantity, resetQuantity] = useInputState('');
  const [price, handleChangePrice, resetPrice] = useInputState('0');

  const handleSubmitItem = () => {
    dispatch({
      type: 'ADDMATERIAL',
      id: estimate.id,
      material: { item, quantity, price },
    });
    resetItem();
    resetQuantity();
    resetPrice();
  };
  const handleDelete = (index) => {
    dispatch({ type: 'DELMATERIAL', id: estimate.id, index });
  };
  let totalMats = () => {
    let total = 0;
    estimate.material.map((x) => (total += x.quantity * x.price));
    return total;
  };
  return (
    <Fragment>
      <Paper>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmitItem();
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography align="center" variant="h6">
                Material
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
                value={quantity}
                required
                onChange={handleChangeQuantity}
                margin="normal"
                type="number"
                label="Quantity"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                value={price}
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
      {estimate && estimate.material && (
        <List dense>
          {estimate.material.map((material, index) => (
            <ListItem key={index}>
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
          Total: ${totalMats()}
        </Typography>
      </Paper>
    </Fragment>
  );
}

export default withStyles(styles)(MaterialForm);
