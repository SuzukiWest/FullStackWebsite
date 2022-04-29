import {
  ListItem,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  List,
  CardActionArea,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@material-ui/core';
import { Pizza, Topping } from '../../types';
import toDollars from '../../lib/format-dollars';
import React from 'react';

export interface PizzaItemProps {
  pizza: Pizza;
  choosePizza: any;
}

const PizzaItem: React.FC<PizzaItemProps> = ({ pizza, choosePizza, ...props }: PizzaItemProps) => {
  const pizzaPrice = pizza.toppings.reduce((price, currentTopping) => price + currentTopping.priceCents, 0);

  const listToppings = pizza.toppings.map((topping: Topping) => (
    <ListItem
      data-testid={'pizza-toppingList-${pizza.id}-topping-${topping.id}'}
      key={'${pizza.id}-${topping.id}'}
      value={topping.name}
    >
      {topping.name}
    </ListItem>
  ));

  return (
    <Card data-testid={'pizzaItem-test-card-${pizza.id}'} {...props}>
      <CardActionArea data-testid={`pizza-button-${pizza.id}`} onClick={(): void => choosePizza(false, pizza)}>
        <CardHeader
          data-testid={`pizza-header-${pizza.id}`}
          title={pizza.name + ' Pizza'}
          subheader={pizza.description}
        />

        <CardMedia
          data-testid={'pizza-imgSrc-${pizza.imgSrc}'}
          component="img"
          height="194"
          image={pizza?.imgSrc}
          alt="Image missing"
        />

        <CardContent data-testid={`pizza-contentSection-${pizza.id}`}>
          <Typography data-testid={'pizza-price-${pizza.id}'}>
            Price: {pizzaPrice ? toDollars(pizzaPrice) : ''}
          </Typography>
        </CardContent>
      </CardActionArea>

      <Accordion>
        <AccordionSummary
          expandIcon={<Typography data-testid={'pizza-toppings-title-${pizza.id}'}>Toppings</Typography>}
          aria-controls="toppingList"
          id="toppings"
        ></AccordionSummary>
        <AccordionDetails>
          <List data-testid={'pizza-toppings-list-${pizza.id}'}>{listToppings}</List>
        </AccordionDetails>
      </Accordion>
    </Card>
  );
};

export default PizzaItem;
