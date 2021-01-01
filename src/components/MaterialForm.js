import React, { Fragment } from 'react';
import useInputState from '../hooks/useInputState';
import MaterialList from './MaterialList';
import { withStyles } from '@material-ui/styles';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import styles from '../styles/measurementsStyles';

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
            <Fragment key={index}>
              <MaterialList
                material={material}
                index={index}
                estimate={estimate}
                dispatch={(props) => dispatch(props)}
              />
              <Divider />
            </Fragment>
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
