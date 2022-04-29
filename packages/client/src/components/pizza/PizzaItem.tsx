import { ImageListItem, ListItem, ListItemText } from '@material-ui/core';
import CardItem from '../common/CardItem';
import { Pizza, Topping } from '../../types';
import { List } from '@material-ui/core';
import toDollars from '../../lib/format-dollars';

interface PizzaItemProps {
  key: any;
  pizza: Pizza;
  choosePizza: any;
}

const PizzaItem: React.FC<PizzaItemProps> = ({ pizza, choosePizza, ...props }: PizzaItemProps) => {
  const pizzaPrice = pizza.toppings.reduce((price, currentTopping) => price + currentTopping.priceCents, 0);

  const listToppings = pizza.toppings.map((topping: Topping) => (
    <ListItem key={topping.id} value={topping.name}>
      {topping.name}
    </ListItem>
  ));

  return (
    <CardItem
      {...props}
      onClick={(): void => {
        choosePizza(false, pizza);
      }}
    >
      <List>
        <ListItem key={`pizza-name-${pizza?.name}`}>
          <ListItemText primary={pizza?.name + ' Pizza'} />
        </ListItem>

        <ListItem key={`pizza-description-${pizza?.description}`}>
          <ListItemText primary={'Description:' + pizza?.description} />
        </ListItem>

        <ListItem>
          <h4>Price: {pizzaPrice ? toDollars(pizzaPrice) : ''}</h4>
        </ListItem>

        <ListItem key={'pizza-toppings-${pizza?.id}'}>
          <ListItemText primary="Toppings" secondary={listToppings} />
        </ListItem>

        <ImageListItem key={'pizza-imgSrc-${pizza?.imgSrc}'}>
          <img src={pizza?.imgSrc} alt={'No Image'} width="50%" height="25%" />
        </ImageListItem>
      </List>
    </CardItem>
  );
};

export default PizzaItem;
