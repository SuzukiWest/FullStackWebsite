import React from 'react';
import { Container, List, Theme, createStyles, Button } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/styles';

import { Pizza } from '../../types';
import { GET_PIZZAS } from '../../hooks/graphql/pizza/queries/get-pizzas';
import PageHeader from '../common/PageHeader';

import PizzaItem from './PizzaItem';
import PizzaModal from './PizzaModal';
//Import Queries
import { GET_TOPPINGS } from '../../hooks/graphql/topping/queries/get-toppings';
import { GET_PIZZAS } from '../../hooks/graphql/topping/queries/get-pizzas';
import { ObjectId } from 'bson';

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

  if (error) {
    <div className={classes.container} key="Pizza load error">
      <h1>"Error Loading Pizzas Page"</h1>
    </div>;
  }

  if (pizzaLoad || toppingLoad) {
    <div className={classes.container} key="Pizza loading message">
      <h1 data-testid={'pizza-loading'}>Loading Pizzas...</h1>
    </div>;
  }

<<<<<<< HEAD
  const PizzaList = data?.pizzas.map((pizza: Pizza) => (
    <PizzaItem data-testid={`pizza-item-${pizza?.id}`} key={pizza.id} pizza={pizza} />
=======
  const PizzaList = pizzaDat?.pizzas.map((pizza: Pizza) => (
<<<<<<< HEAD
<<<<<<< HEAD
    <PizzaItem
      pizzaDat-testid={`pizza-item-${pizza?.id}`}
      key={pizza.id}
      pizza={pizza}
      selectPizza={selectPizza}
      onClick={(): void => selectPizza(pizza)}
    />
>>>>>>> Apr 20
=======
    <PizzaItem id={pizza.id} key={pizza.name} pizza={pizza} selectPizza={selectPizza} setCreate={setCreate} />
>>>>>>> test suite bult - not fully functional
=======
    <PizzaItem
      data-testid={`pizza-item-${pizza.id}`}
      key={pizza.id}
      pizza={pizza}
      onClick={(pizza: Pizza): void => {
        selectPizza(pizza);
        setCreate(false);
      }}
    />
>>>>>>> Change expected to html format or other way around
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
<<<<<<< HEAD
      <List>{PizzaList}</List>
<<<<<<< HEAD
=======
=======
      <List data-testid={'Pizza-list'}>{PizzaList}</List>
>>>>>>> Change expected to html format or other way around

      <PizzaModal
        selectedPizza={selectedPizza}
        selectPizza={selectPizza}
        open={open}
        setOpen={setOpen}
<<<<<<< HEAD
        allToppings={toppingDat.toppings}
=======
        allToppings={toppingDat?.toppings}
        create={create}
        setCreate={setCreate}
>>>>>>> Change expected to html format or other way around
      />
>>>>>>> Apr 20
    </Container>
  );
};

export default Pizzas;
