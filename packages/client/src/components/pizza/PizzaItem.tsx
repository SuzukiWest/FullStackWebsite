import { IconButton, ImageListItem, ListItem, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import CardItem from '../common/CardItem';
import { Pizza, Topping } from '../../types';
import { List } from '@material-ui/core';

const useStyles = makeStyles(({ typography }: Theme) => ({
  container: {
    display: 'flex',
  },
  skeleton: {
    display: 'flex',
    justifyContent: 'center',
    verticalAlign: 'center',
  },
  header: {
    display: 'flex',
  },
  name: {
    minWidth: typography.pxToRem(500),
  },
  content: {
    display: 'flex',
    justifyContent: 'left',
  },
}));

export interface PizzaItemProps {
  pizza?: Pizza;
  handleOpen: (pizza?: Pizza) => void;
}

const PizzaItem: React.FC<PizzaItemProps> = ({ pizza, handleOpen, ...props }) => {
  const classes = useStyles();

  const listToppings = pizza?.toppings.map((topping: Topping) => (
    <ListItem key={topping.id.toString()} value={topping.id}>
      {' '}
      {topping.name}{' '}
    </ListItem>
  ));

  return (
    <CardItem {...props}>
      <List>
        <ListItem data-testid={`pizza-name-${pizza?.name}`}>
          <h3>{pizza?.name} Pizza</h3>
        </ListItem>

        <ListItem data-testid={`pizza-description-${pizza?.description}`}>
          <p>Description: {pizza?.description}</p>
        </ListItem>

        <ListItem data-testid={`pizza-toppings-${pizza?.id}`}>
          <h4>Toppings</h4>
          <List>{listToppings}</List>
        </ListItem>

        <ImageListItem data-testid={`pizza-ImgSrc-${pizza?.ImgSrc}`}>
          <img src={pizza?.ImgSrc} className={classes.container} />
        </ImageListItem>
      </List>
    </CardItem>
  );
};

export default PizzaItem;
