import React, {Fragment} from 'react';
import { useHistory } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import Divider from '@material-ui/core/Divider';

function Estimator(props) {
  const history = useHistory();

  const handleClick = (id) => {
    history.push(`/estimate/${id}`);
  };
  return (
    <Paper>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <List component="nav" aria-label="contacts">
            {props.estimates.map((estimate) => (
              <Fragment>
                <ListItem onClick={() => handleClick(estimate.id)} button>
                  <ListItemIcon>
                    <HomeWorkIcon />
                  </ListItemIcon>
                  <ListItemText primary={`${estimate.name} ${estimate.address ? '@' : ''} ${estimate.address}`}
                    secondary={`${estimate.note}`} />
                </ListItem>
                <Divider />
                </Fragment>
            ))}
          </List>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Estimator;
