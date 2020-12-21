import React, { useContext, Fragment } from 'react';
import useInputState from './hooks/useInputState';
import { DispatchContext } from './context/estimate.context';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function CreateEstimateForm() {
  const [name, handleChangeName, resetName] = useInputState('');
  const [address, handleChangeAddress, resetAddress] = useInputState('');

  const dispatch = useContext(DispatchContext);

  return (
    <Paper style={{ margin: '1rem 0', padding: '0 1rem' }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({type: "ADD", name: name, address: address});
          resetName();
          resetAddress();
        }}
      >
        <TextField
          value={name}
          onChange={handleChangeName}
          margin="normal"
          label="Name"
          fullWidth
        />
        <TextField
          value={address}
          onChange={handleChangeAddress}
          margin="normal"
          label="Address"
          fullWidth
        />
        <Button type="submit">Submit</Button>
      </form>
    </Paper>
  );
}

export default CreateEstimateForm;