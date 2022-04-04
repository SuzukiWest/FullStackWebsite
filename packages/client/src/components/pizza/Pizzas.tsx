import React from 'react';
import { Container, List, ListItem, Theme, createStyles } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/styles';

import { Pizza } from '../../types';
import { GET_PIZZAS } from '../../hooks/graphql/topping/queries/get-pizzas';
import PageHeader from '../common/PageHeader';
import CardItemSkeleton from '../common/CardItemSkeleton';
import CardItem from '../common/CardItem';

import PizzaModal from './PizzaModal';
import PizzaItem from './PizzaItem';

const useStyles = makeStyles(({ typography }: Theme) =>
  createStyles({
    container: {
      minWidth: typography.pxToRem(650),
    },
    skeleton: {
      display: 'flex',
      justifyContent: 'center',
      verticalAlign: 'center',
    },
    header: {
      display: 'flex',
    },
    name: {
      minWidth: typography.pxToRem(500),
    },
    right: {
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between',
    },
  })
);

const Pizzas: React.FC = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [selectedPizza, setSelectedPizza] = React.useState<Partial<Pizza>>();

  const { loading, data } = useQuery(GET_PIZZAS);

  const handleOpen = (pizza?: Pizza): void => {
    setSelectedPizza(pizza);
    setOpen(true);
  };

  if (loading) {
    return <div className={classes.skeleton}>Loading...</div>;
  }

  const PizzaList = data?.pizzas.map((pizza: Pizza) => (
    <PizzaItem data-testid={`pizza-item-${pizza?.id}`} key={pizza.id} handleOpen={handleOpen} pizza={pizza} />
  ));

  return (
    <Container maxWidth="md">
      <PageHeader pageHeader={'Pizza'} />
      <List className={classes.container}>
        <ListItem className={classes.header}>
          <h2 className={classes.name}>Pizza</h2>
          <div className={classes.right}>
            <h2>Price</h2>
            <h2>Modify</h2>
          </div>
        </ListItem>
        <PizzaItem key="add-topping" handleOpen={handleOpen} />
        {PizzaList}
      </List>

      <PizzaModal selectedPizza={selectedPizza} setSelectedPizza={setSelectedPizza} open={open} setOpen={setOpen} />
    </Container>
  );
};

export default Pizzas;
