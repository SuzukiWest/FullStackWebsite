//React imports
import React from 'react';
import { Container, Theme, createStyles, Button, Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import PageHeader from '../common/PageHeader';

//Pizza UI imports
import PizzaItem from './PizzaItem';
import PizzaModal from './PizzaModal';
import { Pizza } from '../../types';

//Import Queries
import { useQuery } from '@apollo/client';
import { GET_TOPPINGS } from '../../hooks/graphql/topping/queries/get-toppings';
import { GET_PIZZA_PAGE } from '../../hooks/graphql/pizza/queries/get-pizza-page';

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

  //Pagination
  const [page, setPage] = React.useState(1);
  const incPage = () => {
    // Update state with incremented value
    if (pizzaDat.page.hasNextPage) setPage(page + 1);
    else setPage(1);
  };
  //Number of pizzas per page
  const limit = 3;

  const {
    loading: pizzaLoad,
    data: pizzaDat,
    error: pizzaErr,
    refetch,
  } = useQuery(GET_PIZZA_PAGE, { variables: { limit } });
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

  const PizzaList = pizzaDat?.page.results.map((pizza: Pizza) => (
    <Grid item xs={4} data-testid={'pizza-griditem-${pizza.id}'} key={pizza.id}>
      <PizzaItem data-testid={`pizza-item-${pizza.id}`} pizza={pizza} choosePizza={choosePizza} />
    </Grid>
  ));

  return (
    <Container maxWidth="md">
      <Button
        data-testid={'pizza-createButton'}
        onClick={(): void => {
          choosePizza(true, undefined);
        }}
      >
        Create Pizza
      </Button>
      <PageHeader pageHeader={'Pizza'} />

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {PizzaList}
        </Grid>
      </Box>

      <Button
        data-testid={'pizza-getPage'}
        onClick={(): void => {
          incPage();
          refetch();
        }}
      >
        {pizzaDat?.page.hasNextPage ? 'More Pizzas' : 'Reset Pizzas'} Page: {page}
      </Button>

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
