import React from 'react';
import { Container, List, Theme, createStyles } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/styles';

import { Pizza } from '../../types';
import { GET_PIZZAS } from '../../hooks/graphql/topping/mutations/queries/get-pizzas';
import PageHeader from '../common/PageHeader';
import CardItemSkeleton from '../common/CardItemSkeleton';

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
      justifyContent: 'center',
    },
    name: {
      minWidth: typography.pxToRem(500),
    },
  })
);

const Pizzas: React.FC = () => {
  const classes = useStyles();

  const { loading, data, error } = useQuery(GET_PIZZAS);

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

  const PizzaList = data?.pizzas.map((pizza: Pizza) => (
    <PizzaItem data-testid={`pizza-item-${pizza?.id}`} key={pizza.id} pizza={pizza} />
  ));

  return (
    <Container maxWidth="md">
      <PageHeader pageHeader={'Pizza'} />
      <List>{PizzaList}</List>
    </Container>
  );
};

export default Pizzas;
