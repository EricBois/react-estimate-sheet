import React from 'react';
import Grid from '@material-ui/core/Grid';

function ValidateEmailPage() {
  return (
    <Grid container>
      <Grid item xs={8} style={{ margin: 'auto' }}>
        <h2>Please Verify Your Email!</h2>
      </Grid>
    </Grid>
  );
}

export default ValidateEmailPage;