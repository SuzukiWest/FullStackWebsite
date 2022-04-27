import { ImageListItem, ListItem, ListItemText, Button } from '@material-ui/core';
import CardItem from '../common/CardItem';
import { Pizza, Topping } from '../../types';
import { List } from '@material-ui/core';
import toDollars from '../../lib/format-dollars';

export interface PizzaItemProps {
  pizza: Pizza;
  selectPizza: any;
}

const PizzaItem: React.FC<PizzaItemProps> = ({ pizza, selectPizza, ...props }: PizzaItemProps) => {
  const pizzaPrice = pizza?.toppings.reduce((price, currentTopping) => price + currentTopping.priceCents, 0);

  const listToppings = pizza?.toppings.map((topping: Topping) => (
    <ListItem
      data-testid={'pizza-toppingList-${pizza?.id}-topping-${topping.id}'}
      key={'pizza-toppingList-${pizza?.id}-topping-${topping.id}'}
    >
      {topping.name}{' '}
    </ListItem>
  ));

  const pizzaPrice = pizza?.toppings.reduce((price, currentTopping) => price + currentTopping.priceCents, 0);

  return (
    <CardItem data-testid={'pizzaItem-test'} {...props}>
      <List>
        <Button onClick={(): void => selectPizza(false, pizza)}>
          <ListItemText primary={pizza?.name + ' Pizza'} data-testid={`pizza-name-${pizza?.id}`} />

          <ListItemText primary={'Description:' + pizza?.description} data-testid={`pizza-description-${pizza?.id}`} />

          <ListItemText>
            <h4 data-testid={'pizza-price-${pizza.id}'}>Price: {pizzaPrice ? toDollars(pizzaPrice) : ''}</h4>
          </ListItemText>

          <ListItemText primary="Toppings" />
          <ListItemText primary="Toppings" data-testid={'pizza-toppingList-Title-${pizza?.id}'} />
          {listToppings}

          <ImageListItem data-testid={'pizza-imgSrc-${pizza?.imgSrc}'} key={'pizza-imgSrc-${pizza?.imgSrc}'}>
            <img src={pizza?.imgSrc} alt={pizza?.name} width="50%" height="25%" />
          </ImageListItem>
        </Button>
      </List>
    </CardItem>
  );
};

export default PizzaItem;
