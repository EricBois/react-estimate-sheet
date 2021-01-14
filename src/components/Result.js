import React, { Fragment } from 'react';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

function Result(props) {
  const { estimate } = props;

  let totalSqf = () => {
    let total = 0;
    estimate.measures.map((x) =>
      !isNaN(x.roomLength) ? (total += x.roomLength * (x.roomWidth || 1)) : null
    );
    return total;
  };
  let totalSqfPrice = () => {
    let total = 0;
    estimate.measures.map((x) =>
      !isNaN(x.roomLength)
        ? (total += x.roomLength * (x.roomWidth || 1) * x.sqfPrice)
        : null
    );
    return total;
  };
  let totalHours = () => {
    let total = 0;
    estimate.hours.map((x) => (total += x.hours * x.price));
    return total;
  };
  let totalMats = () => {
    let total = 0;
    estimate.material.map((x) => (total += x.quantity * x.price));
    return total;
  };
  const cards = [
    {
      id: 1,
      title: `Square Footage ${totalSqf() > 0 ? `(${totalSqf()} sqf)` : ''}`,
      price: `$${totalSqfPrice().toFixed(2)}`,
    },
    { id: 2, title: 'Hourly Charge', price: `$${totalHours().toFixed(2)}` },
    { id: 3, title: 'Material Charge', price: `$${totalMats().toFixed(2)}` },
  ];
  return (
    <Fragment>
      <Grid container spacing={3}>
        {cards.map((card) => (
          <Grid
            style={{ backgroundColor: '#6FA3CA' }}
            key={card.id}
            item
            xs={12}
            sm={4}
          >
            <Card style={{ backgroundColor: '#DEEEFA' }}>
              <CardActionArea>
                <CardContent>
                  <Typography align="center" variant="h6" component="h2">
                    {card.title}
                  </Typography>
                  <Typography
                    align="center"
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {card.price}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12} sm={6} style={{ margin: 'auto' }}>
          <Card style={{ backgroundColor: '#527995', color: 'white' }}>
            <CardActionArea>
              <CardContent>
                <Typography align="center" variant="h5" component="h2">
                  Grand Total
                </Typography>
                <Typography align="center" variant="subtitle2" component="h2">
                  ${(totalSqfPrice() + totalHours() + totalMats()).toFixed(2)}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default Result;
