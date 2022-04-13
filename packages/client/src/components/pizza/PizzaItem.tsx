import { ImageListItem, ListItem, ListItemText } from '@material-ui/core';
import CardItem from '../common/CardItem';
import { Pizza, Topping } from '../../types';
import { List } from '@material-ui/core';
import toDollars from '../../lib/format-dollars';

export interface PizzaItemProps {
  pizza?: Pizza;
}

const PizzaItem: React.FC<PizzaItemProps> = ({ pizza, ...props }) => {
  const listToppings = pizza?.toppings.map((topping: Topping) => (
    <ListItem key={topping.id.toString()} value={topping.name}>
      {topping.name}
    </ListItem>
  ));

  return (
    <nav aria-label="pizzas">
      <CardItem {...props}>
        <List>
          <ListItem key={`pizza-name-${pizza?.name}`}>
            <ListItemText primary={pizza?.name + ' Pizza'} />
          </ListItem>

          <ListItem key={`pizza-description-${pizza?.description}`}>
            <ListItemText primary={'Description:' + pizza?.description} />
          </ListItem>

          <ListItem>
            <h4>Price: {pizza?.priceCents ? toDollars(pizza.priceCents) : ''}</h4>
          </ListItem>

          <ListItem key={'pizza-toppings-${pizza?.id}'}>
            <ListItemText primary="Toppings" secondary={listToppings} />
          </ListItem>

          <ImageListItem key={'pizza-ImgSrc-${pizza?.ImgSrc}'}>
            <img src={pizza?.ImgSrc} alt={'No Image'} width="50%" height="25%" />
          </ImageListItem>
        </List>
      </CardItem>
    </nav>
  );
};

export default PizzaItem;
