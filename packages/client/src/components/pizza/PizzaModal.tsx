import { List, Modal } from '@material-ui/core';
import * as React from 'react';

import { Box } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Formik, Field, Form, FieldArray } from 'formik';
import { TextField } from '@material-ui/core';
import { FormGroup } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { Topping } from '../../types/schema';
import usePizzaMutations from '../../hooks/pizza/use-pizza-mutations';
import { ObjectId } from 'bson';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
{

interface PizzaModalProps {
  selectedPizza?: any;
  selectPizza: React.Dispatch<React.SetStateAction<any>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  allToppings: any;
}

const PizzaModal = ({selectedPizza, selectPizza, open, setOpen, allToppings}: PizzaModalProps): JSX.Element => {
  const {onCreatePizza, onDeletePizza, onUpdatePizza} = usePizzaMutations();

  function checkPizza(toppingID: any) {
    if (toppingID in selectedPizza.toppingIds) return true;
    return false;
  };

  let toppingChecklist = allToppings.map((topping: any) => {
    <FormControlLabel control={<Checkbox />} name={'toppings'} label={topping.name} value={topping.id} key={topping.id} defaultChecked={checkPizza(topping.id)}/>
  });

  const handleSubmit = (): void => {
    selectedPizza?.id ? onUpdatePizza(selectedPizza) :onCreatePizza(selectedPizza);
    setOpen(false);
  };

  return(
    <React.Fragment>

      <Modal
        open={open}
        onClose={(): void => {setOpen(false)}}
      >
        <Box sx={style}>
          <p>Modal</p>
        </Box>
      </Modal>
    </React.Fragment>
  );

};

  {/*
          <Button onClick= {(): void => {
          onDeletePizza(selectedPizza);
          setOpen(false);}}>
          Delete Pizza
         </Button>
          {/**FINALIZE FORMIK TAG
           * initialValues={{ name: ""}}?

          <Formik initialValues={{}}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                actions.setSubmitting(false);
              }, 1000);
            }
          >
            <Form  onSubmit={handleSubmit}>
              <TextField name="name" type="string" defaultValue={selectedPizza?.name}
                onChange={(event): void => selectPizza({ ...selectedPizza, name: event.target.value })}/>
              <TextField name="description" type="string" defaultValue={selectedPizza?.description}
                onChange={(event): void => selectPizza({ ...selectedPizza, description: event.target.value })} />
              <TextField name="ImageSource" type="string" defaultValue={selectedPizza?.ImgSrc}
                onChange={(event): void => selectPizza({ ...selectedPizza, ImgSrc: event.target.value })} />

              {/**USE INSTEAD OF FIELD ARR?
               * import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

export default function ControlledCheckbox() {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };


FORM CONTROL LABEL - pass props to form
{props => (
<form>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Label" name="checkbox"   onChange={props.handleChange} />
               {props.errors.name && <div id="feedback">{props.errors.name}</div>}


UPDATE TOPPINGS BUTTON
                  <Button onClick={(): void => {this.getElementBy}}>Update Toppings</Button>

}

              <FormGroup>
                  {/*Create list of All toppings in checkbox
                    -Organize
                    -search

                    -Alter toppings based on unchecked boxes

                  {toppingChecklist}
                </FormGroup>

              {/* MAY NEED TO CHECK IF NEW PIZZA WAS ADDED
              <Button type="submit" >Update Pizza</Button>
            </Form>
          </Formik>

          <Button onClick={(): void => {setOpen(false)}}>Close Pizza Modal</Button>
        </Box>
      </Modal>
    </React.Fragment>

  );
};

export default PizzaModal;
*/}
export default PizzaModal;
