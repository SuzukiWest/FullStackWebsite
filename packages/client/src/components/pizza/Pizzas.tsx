import React from 'react';
import { Container, List, Theme, createStyles, Button } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/styles';

import { Pizza } from '../../types';
import { GET_PIZZAS } from '../../hooks/graphql/pizza/queries/get-pizzas';
import PageHeader from '../common/PageHeader';
import CardItemSkeleton from '../common/CardItemSkeleton';

import PizzaItem from './PizzaItem';
<<<<<<< HEAD
=======
import PizzaModal from './PizzaModal';
//Import Queries
import { GET_TOPPINGS } from '../../hooks/graphql/topping/queries/get-toppings';
import { GET_PIZZAS } from '../../hooks/graphql/topping/queries/get-pizzas';
import { ObjectId } from 'bson';
>>>>>>> Apr 20

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

<<<<<<< HEAD
  const { loading, data, error } = useQuery(GET_PIZZAS);
=======
  //Open/close Modals
  const [open, setOpen] = React.useState(false);
  //Select Pizza Item to open/close
  const [selectedPizza, setSelectedPizza] = React.useState<Pizza>();
>>>>>>> Apr 20

  if (error) {
    <div className={classes.container} key="Pizza load error">
      <h1>"Error Loading Pizzas Page"</h1>
    </div>;
  }
  if (loading) {
    return (
      <div className={classes.container} key="Pizza loading">
        <CardItemSkeleton data-testid={'pizza-list-loading'} />
      </div>
    );
  }

<<<<<<< HEAD
  const PizzaList = data?.pizzas.map((pizza: Pizza) => (
    <PizzaItem data-testid={`pizza-item-${pizza?.id}`} key={pizza.id} pizza={pizza} />
=======
  const PizzaList = pizzaDat?.pizzas.map((pizza: Pizza) => (
    <PizzaItem
      pizzaDat-testid={`pizza-item-${pizza?.id}`}
      key={pizza.id}
      pizza={pizza}
      selectPizza={selectPizza}
      onClick={(): void => selectPizza(pizza)}
    />
>>>>>>> Apr 20
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
<<<<<<< HEAD
=======

      <PizzaModal
        selectedPizza={selectedPizza}
        selectPizza={selectPizza}
        open={open}
        setOpen={setOpen}
        allToppings={toppingDat.toppings}
      />
>>>>>>> Apr 20
    </Container>
  );
};

export default Pizzas;
