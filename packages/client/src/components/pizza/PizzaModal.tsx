import { Modal } from '@material-ui/core';
import * as React from 'react';

import { Box } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

import { Topping } from '../../types/schema';
import usePizzaMutations from '../../hooks/pizza/use-pizza-mutations';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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
  name: Yup.string().min(1, 'Too Short!').max(50, 'Too Long!').required('Pizza Name Required'),
  description: Yup.string().min(1, 'Too Short!').max(100, 'Too Long!').required('Pizza Description Required'),
  imgSrc: Yup.string().url().required('Pizza Image URL Required'),
  toppingIds: Yup.array().min(1, 'Choose At Least One Topping'),
});

const PizzaModal = ({ selectedPizza, open, setOpen, create, allToppings, setPizza }: PizzaModalProps): JSX.Element => {
  const { onCreatePizza, onDeletePizza, onUpdatePizza } = usePizzaMutations();

  //Build topping checklist of all topping options
  const ToppingList = allToppings?.map((topping: Topping) => (
    <label>
      <Field type="checkbox" name="toppingIds" value={topping.id} key={topping.id} />
      {topping.name}
    </label>
  ));

  return (
    <Modal open={open}>
      <Box sx={style}>
        <h1>Build Your Pizza</h1>

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
            alert(JSON.stringify(pizza, null, 2));
            if (create) onCreatePizza(pizza);
            else onUpdatePizza(pizza);
            setOpen(false);
          }}
        >
          {({ values, errors, touched }): any => (
            <Form>
              <Field fullWidth id="name" name="name" placeholder="Pizza Name" />
              {errors.name && touched.name ? <div>{errors.name}</div> : null}

              <Field fullWidth id="description" name="description" placeholder="Pizza Description" />
              {errors.description && touched.description ? <div>{errors.description}</div> : null}

              <Field fullWidth id="imgSrc" name="imgSrc" placeholder="Pizza Image URL" />
              {errors.imgSrc && touched.imgSrc ? <div>{errors.imgSrc}</div> : null}

              <h4 id="toppingsHeader">Toppings</h4>
              <div role="group" aria-labelledby="toppingsHeader">
                {ToppingList}
              </div>
              {errors.toppingIds && touched.toppingIds ? <div>{errors.toppingIds}</div> : null}

              <Button type="submit">{create ? 'Create' : 'Update'} Pizza</Button>
            </Form>
          )}
        </Formik>

        <Button
          onClick={(): void => {
            if (selectedPizza) onDeletePizza(selectedPizza);
            setOpen(false);
          }}
        >
          Delete Pizza
        </Button>
        <Button
          onClick={(): void => {
            setOpen(false);
          }}
        >
          Close Pizza Modal
        </Button>
      </Box>
    </Modal>
  );
};

export default PizzaModal;
