import React, {useContext, useEffect} from 'react'
import useInputState from '../hooks/useInputState';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';

function Profile(props) {
  // const { database, currentUser, profile } = props;
  // const { getUserFromDB } = useAuth();
  
  // const [email, setEmail] = useInputState('');
  // const [name, setName] = useInputState('');

  // return (
  //   <Paper style={{maxWidth: '800px', margin: 'auto'}}>
  //     <Grid container spacing={2}>
  //       <Grid item xs={12}>
  //         <Paper><Typography align="center" variant="h3" component="h2">Your Profile</Typography></Paper>
          
  //       </Grid>
  //       <Divider />
  //       <Grid style={{ margin: 'auto' }} item xs={6}>
  //           <TextField
  //             fullWidth
  //             value={name}
  //             onChange={setName}
  //             label="Name"
  //             name="name"
  //             size="small"
  //             variant="outlined"
  //           />
  //         </Grid>
  //         <Grid style={{ margin: 'auto' }} item xs={6}>
  //           <TextField
  //             fullWidth
  //             value={email}
  //             onChange={setEmail}
  //             label="Email"
  //             name="email"
  //             size="small"
  //             variant="outlined"
  //           />
  //         </Grid>
  //     </Grid>
  //   </Paper>
  // )
}

export default Profile;