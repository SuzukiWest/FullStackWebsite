import {
<<<<<<< HEAD
  ListItem,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  List,
  CardActionArea,
} from '@material-ui/core';
=======
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  ImageListItem,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import CardItem from '../common/CardItem';
>>>>>>> PizzaItem to Card
import { Pizza, Topping } from '../../types';
import toDollars from '../../lib/format-dollars';
import { separateOperations } from 'graphql';

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
    <Card data-testid={'pizzaItem-test-card'} {...props}>
      <CardActionArea data-testid={`pizza-button-${pizza?.id}`} onClick={(): void => selectPizza(false, pizza)}>
        <CardHeader
          data-testid={`pizza-header-${pizza?.id}`}
          title={pizza?.name + ' Pizza'}
          subheader={pizza?.description}
        />

        <CardMedia
          data-testid={'pizza-imgSrc-${pizza?.imgSrc}'}
          component="img"
          height="194"
          image={pizza?.imgSrc}
          alt="Image missing"
        />

        <CardContent data-testid={`pizza-contentSection-${pizza?.id}`}>
          <Typography data-testid={'pizza-price-${pizza.id}'}>
            Price: {pizzaPrice ? toDollars(pizzaPrice) : ''}
          </Typography>

          <Typography data-testid={'pizza-toppings-title-${pizza?.id}'}>Toppings</Typography>
          <List data-testid={'pizza-toppings-list-${pizza?.id}'}>{listToppings}</List>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PizzaItem;
