import { ImageListItem, ListItem, ListItemText } from '@material-ui/core';
import CardItem from '../common/CardItem';
import { Pizza, Topping } from '../../types';
import { List } from '@material-ui/core';
import toDollars from '../../lib/format-dollars';

export interface PizzaItemProps {
  id: any;
  key: any;
  pizza: Pizza;
  selectPizza: any;
  setCreate: any;
}

const PizzaItem: React.FC<PizzaItemProps> = ({ pizza, ...props }) => {
  const listToppings = pizza?.toppings.map((topping: Topping) => (
    <ListItem key={topping.id.toString()} value={topping.name}>
      {topping.name}
    </ListItem>
  ));

  const pizzaPrice = pizza?.toppings.reduce((price, currentTopping) => price + currentTopping.priceCents, 0);

  return (
    <CardItem
      {...props}
      onClick={(): void => {
        selectPizza(pizza);
        setCreate(false);
      }}
    >
      <List data-testid={`pizza-list`}>
        <ListItem data-testid={`pizza-name-${pizza?.name}`} key={pizza.description}>
          <ListItemText primary={pizza?.name + ' Pizza'} />
        </ListItem>

        <ListItem data-testid={`pizza-description-${pizza?.description}`} key={pizza.description}>
          <ListItemText primary={'Description:' + pizza?.description} />
        </ListItem>

        <ListItem data-testid={'pizza-price-${pizza?.description}'} key={pizza.description}>
          <h4>Price: {pizzaPrice ? toDollars(pizzaPrice) : ''}</h4>
        </ListItem>

        <ListItem data-testid={'pizza-toppings-${pizza?.id}'} key={'pizza-toppingsList-{pizza.name}'}>
          <ListItemText primary="Toppings" secondary={listToppings} />
        </ListItem>

        <ImageListItem data-testid={'pizza-imgSrc-${pizza?.imgSrc}'} key={'pizza-img-${pizza.name}'}>
          <img src={pizza?.imgSrc} alt={pizza.name} width="50%" height="25%" />
        </ImageListItem>
      </List>
    </CardItem>
  );
};

export default PizzaItem;
