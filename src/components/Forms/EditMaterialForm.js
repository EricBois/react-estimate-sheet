import React from 'react';
import useInputState from '../../hooks/useInputState';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

function EditMaterialForm(props) {
  const { material, index, dispatch, estimate, toggleEditForm } = props;

  const [item, handleChangeItem] = useInputState(material.item);
  const [quantity, handleChangeQuantity] = useInputState(material.quantity);
  const [price, handleChangePrice] = useInputState(material.price);
  const handleEditMaterial = () => {
    return dispatch({
      type: 'EDITMATERIAL',
      id: estimate.id,
      index: index,
      material: { item, quantity, price },
    });
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleEditMaterial();
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
            size="small"
          >
            EDIT
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default EditMaterialForm;
