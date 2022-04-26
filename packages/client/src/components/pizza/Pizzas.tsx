//React visual imports
import React from 'react';
import { Container, List, Theme, createStyles, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import PageHeader from '../common/PageHeader';
import CardItemSkeleton from '../common/CardItemSkeleton';

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
  const [selectedPizza, setSelectedPizza] = React.useState<Pizza>();
  //Create or Update pizza - default false=Update
  const [create, setCreate] = React.useState<boolean>(false);

  const { loading: pizzaLoad, data: pizzaDat, error: pizzaErr } = useQuery(GET_PIZZAS);
  const { loading: toppingLoad, data: toppingDat, error: toppingErr } = useQuery(GET_TOPPINGS);

  if (pizzaErr) {
    return (
      <div className={classes.container} key="Pizza load error">
        <h1>"Error Loading pizzaDat Page"</h1>
      </div>
    );
  } else if (toppingErr) {
    return (
      <div className={classes.container} key="Pizza load error">
        <h1>"Error Loading toppingDat for Pizzas Page"</h1>
      </div>
    );
  }

  if (pizzaLoad || toppingLoad) {
    return (
      <div className={classes.container} key="Pizza loading">
        <CardItemSkeleton pizzaDat-testid={'pizza-list-loading'} />
      </div>
    );
  }

  const selectPizza = (pizza?: Pizza): void => {
    setSelectedPizza(pizza);
    setOpen(true);
  };

  const PizzaList = pizzaDat?.pizzas.map((pizza: Pizza) => (
    <PizzaItem
      id={`pizza-item-${pizza?.id}`}
      key={pizza.id}
      pizza={pizza}
      selectPizza={selectPizza}
      setCreate={setCreate}
    />
  ));

  return (
    <Container maxWidth="md">
      <Button
        onClick={(): void => {
          setCreate(true);
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
        create={create}
        setCreate={setCreate}
      />
    </Container>
  );
};

export default Pizzas;
