import React from 'react';
import { Container, List, Theme, createStyles, Button } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/styles';

import { Pizza } from '../../types';
import PageHeader from '../common/PageHeader';

import PizzaItem from './PizzaItem';
import PizzaModal from './PizzaModal';
//Import Queries
import { GET_TOPPINGS } from '../../hooks/graphql/topping/queries/get-toppings';
import { GET_PIZZAS } from '../../hooks/graphql/pizza/queries/get-pizzas';
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

  const PizzaList = data?.pizzas.map((pizza: Pizza) => (

    <PizzaItem
      data-testid={`pizza-item-${pizza.id}`}
      key={pizza.id}
      pizza={pizza}
      onClick={(pizza: Pizza): void => {
        selectPizza(pizza);
        setCreate(false);
      }}
    />

  const selectPizza = (create: boolean, pizza?: Pizza): void => {
    setSelectedPizza(pizza);
    setCreate(create);
    setOpen(true);
  };


  return (
    <Container maxWidth="md">
      <Button
        onClick={(): void => {
          selectPizza(true, undefined);
        }}
      >
        Create Pizza
      </Button>
      <PageHeader pageHeader={'Pizza'} />

      <List data-testid={'Pizza-list'}>{PizzaList}</List>

      <PizzaModal
        selectedPizza={selectedPizza}
        selectPizza={selectPizza}
        open={open}
        setOpen={setOpen}
        allToppings={toppingDat?.toppings}
        create={create}
        setCreate={setCreate}
      />
    </Container>
  );
};

export default Pizzas;
