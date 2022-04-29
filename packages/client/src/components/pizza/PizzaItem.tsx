import { Button, ImageListItem, ListItem, ListItemText } from '@material-ui/core';
import CardItem from '../common/CardItem';
import { Pizza, Topping } from '../../types';
import { List } from '@material-ui/core';
import toDollars from '../../lib/format-dollars';

export interface PizzaItemProps {
  pizza: Pizza;
  choosePizza: any;
}

const PizzaItem: React.FC<PizzaItemProps> = ({ pizza, choosePizza, ...props }: PizzaItemProps) => {
  const pizzaPrice = pizza.toppings.reduce((price, currentTopping) => price + currentTopping.priceCents, 0);

  const listToppings = pizza.toppings.map((topping: Topping) => (
    <ListItem
      data-testid={'pizza-toppingList-${pizza?.id}-topping-${topping.id}'}
      key={topping.id}
      value={topping.name}
    >
      {topping.name}
    </ListItem>
  ));

  return (
    <Button
      onClick={(): void => {
        choosePizza(false, pizza);
      }}
    >
      <CardItem {...props}>
        <List>
          <ListItemText
            primary={pizza?.name + ' Pizza'}
            key={`pizza-name-${pizza?.name}`}
            data-testid={`pizza-name-${pizza?.id}`}
          />

          <ListItemText
            primary={'Description:' + pizza?.description}
            key={`pizza-description-${pizza?.description}`}
            data-testid={`pizza-description-${pizza?.id}`}
          />

          <ListItemText key={`pizza-price-${pizza?.id}`}>
            <h4 data-testid={`pizza-price-${pizza?.id}`}>Price: {pizzaPrice ? toDollars(pizzaPrice) : ''}</h4>
          </ListItemText>

          <ListItemText
            primary="Toppings"
            data-testid={'pizza-toppingList-Title-${pizza?.id}'}
            key={'pizza-toppingList-Title-${pizza?.id}'}
          />
          {listToppings}

          <ImageListItem data-testid={'pizza-imgSrc-${pizza?.imgSrc}'} key={'pizza-imgSrc-${pizza?.imgSrc}'}>
            <img src={pizza?.imgSrc} alt={pizza?.name} width="50%" height="25%" />
          </ImageListItem>
        </List>
      </CardItem>
    </Button>
  );
};

export default PizzaItem;
