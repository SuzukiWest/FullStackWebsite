import React from 'react';
import { Container, List, Theme, createStyles, Button } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/styles';

import { Pizza } from '../../types';
import { GET_PIZZAS } from '../../hooks/graphql/pizza/queries/get-pizzas';
import PageHeader from '../common/PageHeader';
import CardItemSkeleton from '../common/CardItemSkeleton';

import PizzaItem from './PizzaItem';
import PizzaModal from './PizzaModal';
//Import Queries
import { GET_TOPPINGS } from '../../hooks/graphql/topping/queries/get-toppings';

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
      justifyContent: 'center',
    },
    name: {
      minWidth: typography.pxToRem(500),
    },
  })
);

const Pizzas: React.FC = () => {
  const classes = useStyles();

  //Open/close Modals
  const [open, setOpen] = React.useState(false);
  //Select Pizza Item to open/close
  const [selectedPizza, setSelectedPizza] = React.useState<Pizza>();

  const { loading, data: pizzaDat, error: pizzaErr } = useQuery(GET_PIZZAS);
  const { data: toppingDat, error: toppingErr } = useQuery(GET_TOPPINGS);

  const selectPizza = (pizza?: Pizza): void => {
    setSelectedPizza(pizza);
    setOpen(true);
  };

  if (pizzaErr) {
    <div className={classes.container} key="Pizza load error">
      <h1>"Error Loading pizzaDat Page"</h1>
    </div>;
  } else if (toppingErr) {
    <div className={classes.container} key="Pizza load error">
      <h1>"Error Loading toppingDat for Pizzas Page"</h1>
    </div>;
  }

  if (loading) {
    return (
      <div className={classes.container} key="Pizza loading">
        <CardItemSkeleton pizzaDat-testid={'pizza-list-loading'} />
      </div>
    );
  }

  const PizzaList = pizzaDat?.pizzas.map((pizza: Pizza) => (
    <PizzaItem
      pizzaDat-testid={`pizza-item-${pizza?.id}`}
      key={pizza.id}
      pizza={pizza}
      selectPizza={setSelectedPizza}
      onClick={(): void => selectPizza(pizza)}
    />
  ));

  return (
    <Container maxWidth="md">
      <Button
        onClick={(): void => {
          selectPizza(undefined);
        }}
      >
        Create Pizza
      </Button>
      <PageHeader pageHeader={'Pizza'} />
      <List>{PizzaList}</List>

      <PizzaModal
        selectedPizza={selectedPizza}
        selectPizza={setSelectedPizza}
        open={open}
        setOpen={setOpen}
        allToppings={toppingDat.toppings}
      />
    </Container>
  );
};

export default Pizzas;
