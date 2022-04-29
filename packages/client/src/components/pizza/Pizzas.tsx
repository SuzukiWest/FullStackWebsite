//React visual imports
import React from 'react';
import { Container, List, Theme, createStyles, Button } from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';
import PageHeader from '../common/PageHeader';

//Pizza UI imports
import PizzaItem from './PizzaItem';
import PizzaModal from './PizzaModal';
import { Pizza } from '../../types';

//Import Queries
import { useQuery } from '@apollo/client';
import { GET_TOPPINGS } from '../../hooks/graphql/topping/queries/get-toppings';
import { GET_PIZZAS } from '../../hooks/graphql/pizza/queries/get-pizzas';

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
  const [selectedPizza, setSelectedPizza] = React.useState<Pizza | undefined>();
  //Create or Update pizza - default false=Update
  const [create, setCreate] = React.useState<boolean>(false);

  const { loading: pizzaLoad, data: pizzaDat, error: pizzaErr } = useQuery(GET_PIZZAS);
  const { loading: toppingLoad, data: toppingDat, error: toppingErr } = useQuery(GET_TOPPINGS);

  if (pizzaErr) {
    return (
      <div className={classes.container} key="Pizza load error">
        <h1>Error Loading pizza Data</h1>
      </div>
    );
  } else if (toppingErr) {
    return (
      <div className={classes.container} key="Pizza load error">
        <h1>Error Loading toppings for Pizza Page</h1>
      </div>
    );
  }

  if (pizzaLoad || toppingLoad) {
    <div className={classes.container} key="Pizza loading message">
      <h1 data-testid={'pizza-loading'}>Loading Pizzas...</h1>
    </div>;
  }

  const choosePizza = (create: boolean, pizza?: Pizza): void => {
    setCreate(create);
    setSelectedPizza(pizza);
    setOpen(true);
  };

  const PizzaList = pizzaDat?.pizzas.map((pizza: Pizza) => (
    <PizzaItem data-testid={`pizza-item-${pizza.id}`} key={pizza.id} pizza={pizza} choosePizza={choosePizza} />
  ));

  return (
    <Container maxWidth="md">
      <Button
        onClick={(): void => {
          choosePizza(true, undefined);
        }}
      >
        Create Pizza
      </Button>
      <PageHeader pageHeader={'Pizza'} />
      <List data-testid={'pizza-list'}>{PizzaList}</List>

      <PizzaModal
        selectedPizza={selectedPizza}
        open={open}
        setOpen={setOpen}
        allToppings={toppingDat}
        create={create}
      />
    </Container>
  );
};

export default Pizzas;
