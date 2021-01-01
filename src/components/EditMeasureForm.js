import React from 'react';
import useInputState from '../hooks/useInputState';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

function EditMeasureForm(props) {
  const { dispatch, toggleEditForm, estimate, measure, index } = props;
  const [roomLength, handleChangeLength] = useInputState(measure.roomLength);
  const [sqfPrice, handleChangeSqfPrice] = useInputState(measure.sqfPrice);
  const [roomWidth, handleChangeWidth] = useInputState(measure.roomWidth);
  const handleEditMeasure = () => {
    return dispatch({
      type: 'EDITMEASURE',
      id: estimate.id,
      index: index,
      measures: { roomLength, roomWidth, sqfPrice },
    });
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleEditMeasure();
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <TextField
            autoFocus
            variant="outlined"
            required
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
            type="submit"
            fullWidth
            size="small"
          >
            Edit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default EditMeasureForm;
