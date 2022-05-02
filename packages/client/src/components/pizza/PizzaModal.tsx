import * as React from 'react';

import { Box } from '@material-ui/core';
import { Modal, Button, Backdrop, createStyles, makeStyles, Theme } from '@material-ui/core';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { Topping } from '../../types/schema';
import usePizzaMutations from '../../hooks/pizza/use-pizza-mutations';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    box: {
      justifyContent: 'center',
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 600,
      border: '5px solid #000',
      p: 4,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      alignItems: 'center',
    },
    title: {
      textAlign: 'center',
    },
    fields: {
      width: '100%',
    },
    toppingContainer: {
      padding: '2px',
      width: '100%',
      height: '20%',
      marginTop: '25px',
    },
    toppingList: {
      column: '3 auto',
      border: '2px solid #000',
      display: 'flex',
      width: 'auto',
      flexWrap: 'wrap',
      position: 'relative',
      justifyContent: 'start',
    },
    toppingItem: {
      flex: '1 0 33.33%',
      listStyleType: 'none',
    },
    button: {
      width: '100%',
      column: '2 auto',
      display: 'flex',
    },
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  })
);

interface PizzaModalProps {
  selectedPizza?: any;
  open: boolean;
  setOpen: any;
  allToppings?: Topping[];
  create: any;
  setPizza: any;
}

//Form submission input
interface PizzaFormInp {
  id?: string;
  name: string;
  description: string;
  imgSrc: string;
  toppingIds: string[];
}

const PizzaValidationSchema = Yup.object().shape({
  name: Yup.string().min(1, 'Name Too Short!').max(50, 'Name Too Long!').required('Pizza Name Required'),
  description: Yup.string()
    .min(1, 'Description Too Short!')
    .max(100, 'Description Too Long!')
    .required('Pizza Description Required'),
  imgSrc: Yup.string().url().required('Pizza Image URL Required'),
  toppingIds: Yup.array().min(1, 'Choose At Least One Topping'),
});

const PizzaModal = ({ selectedPizza, open, setOpen, create, allToppings }: PizzaModalProps): JSX.Element => {
  const classes = useStyles();

  const { onCreatePizza, onDeletePizza, onUpdatePizza } = usePizzaMutations();

  //Build topping checklist of all topping options
  const ToppingList = allToppings?.map((topping: Topping) => (
    <li className={classes.toppingItem}>
      <label>
        <Field type="checkbox" name="toppingIds" value={topping.id} key={topping.id} />
        {topping.name}
      </label>
    </li>
  ));

  return (
    <Modal open={open} className={classes.modal} BackdropComponent={Backdrop}>
      <Box className={classes.box}>
        <h1 className={classes.title}>Build Your Pizza</h1>
        <Formik
          initialValues={{
            id: selectedPizza?.id,
            name: selectedPizza?.name,
            description: selectedPizza?.description,
            imgSrc: selectedPizza?.imgSrc,
            toppingIds: selectedPizza?.toppings.map((topping: Topping) => topping.id),
          }}
          validationSchema={PizzaValidationSchema}
          onSubmit={async (pizza: PizzaFormInp) => {
            new Promise((r) => setTimeout(r, 500));
            //JSON message for checking submission results
            //alert(JSON.stringify(pizza, null, 2));
            if (create) onCreatePizza(pizza);
            else onUpdatePizza(pizza);
            setOpen(false);
          }}
          render={({}): any => (
            <Form>
              <div>
                Pizza Name
                <Field className={classes.fields} label="Pizza Name" id="name" name="name" placeholder="Pizza Name" />
                <ErrorMessage name="name" />
              </div>

              <div>
                Description
                <Field className={classes.fields} id="description" name="description" placeholder="Pizza Description" />
                <ErrorMessage name="description" />
              </div>

              <div>
                Image
                <Field className={classes.fields} id="imgSrc" name="imgSrc" placeholder="Pizza Image URL" />
                <ErrorMessage name="imgSrc" />
              </div>

              <div className={classes.toppingContainer} role="group" aria-labelledby="toppingsHeader">
                Toppings
                <ul className={classes.toppingList}>{ToppingList}</ul>
              </div>
              <ErrorMessage name="toppingIds" />

              <Button fullWidth type="submit">
                {create ? 'Create' : 'Update'} Pizza
              </Button>
            </Form>
          )}
        />

        <div className={classes.button}>
          <Button
            fullWidth
            onClick={(): void => {
              if (selectedPizza) onDeletePizza(selectedPizza);
              setOpen(false);
            }}
          >
            Delete Pizza
          </Button>
          <Button
            fullWidth
            onClick={(): void => {
              setOpen(false);
            }}
          >
            Close Pizza Modal
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default PizzaModal;
