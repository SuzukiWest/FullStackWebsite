import { Modal } from '@material-ui/core';
import * as React from 'react';

import { Box } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Formik, Field, Form } from 'formik';

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
  allToppings: any;
  create: any;
}

const PizzaModal = ({ selectedPizza, open, setOpen, create, allToppings }: PizzaModalProps): JSX.Element => {
  const { onCreatePizza, onDeletePizza, onUpdatePizza } = usePizzaMutations();

  //Build topping checklist
  let ToppingList = allToppings?.toppings.map((topping: Topping) => (
    <label>
      <Field type="checkbox" name="toppingIds" value={topping.id} key={topping.id} />
      {topping.name}
    </label>
  ));

  return (
    <Modal open={open}>
      <Box sx={style}>
        <Formik
          initialValues={{
            id: selectedPizza?.id,
            name: selectedPizza?.name,
            description: selectedPizza?.description,
            imgSrc: selectedPizza?.imgSrc,
            toppingIds: selectedPizza?.toppings.map((topping: Topping) => topping.id),
          }}
          onSubmit={async (input): Promise<any> => {
            new Promise((r) => setTimeout(r, 500));
            alert(JSON.stringify(input, null, 2));
            if (create) onCreatePizza(input);
            else onUpdatePizza(input);
            setOpen(false);
          }}
        >
          {({ values }): any => (
            <Form>
              <Field id="name" name="name" defaultValue={values.name} placeholder="Pizza Name" />
              <Field
                id="description"
                name="description"
                defaultValue={values.description}
                placeholder="Pizza Description"
              />
              <Field id="imgSrc" name="imgSrc" defaultValue={values.imgSrc} placeholder="Pizza Image Source" />

              <div id="toppingsHeader">Toppings</div>
              <div role="group" aria-labelledby="toppingsHeader">
                {ToppingList}
              </div>

              <Button type="submit">{create ? 'Create' : 'Update'} Pizza</Button>
              <Button
                onClick={(): void => {
                  if (selectedPizza) onDeletePizza(selectedPizza);
                  setOpen(false);
                }}
              >
                Delete Pizza
              </Button>
            </Form>
          )}
        </Formik>

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
