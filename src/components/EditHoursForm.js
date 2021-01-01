import React from 'react';
import useInputState from '../hooks/useInputState';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

function EditHoursForm(props) {
  const { hour, toggleEditForm, index, dispatch, estimate } = props;

  const [item, handleChangeItem] = useInputState(hour.item);
  const [hours, handleChangeHours] = useInputState(hour.hours);
  const [price, handleChangePrice] = useInputState(hour.price);

  const handleEditHours = () => {
    return dispatch({
      type: 'EDITHOURS',
      id: estimate.id,
      index: index,
      hours: { item, hours, price },
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleEditHours();
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <TextField
            autoFocus
            variant="outlined"
            required
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
          <Button color="primary" variant="contained" type="submit" fullWidth>
            EDIT
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
export default EditHoursForm;
