//imports
import { useCallback } from 'react';
import { useMutation } from '@apollo/client';

//imports
import { CREATE_PIZZA } from '../graphql/topping/mutations';
import { GET_PIZZAS } from '../graphql/topping/queries/get-pizzas';

interface UsePizzaMutationsOutput {
  onCreatePizza: (selectedPizza: any) => void;
  //onUpdatePizza: (selectedPizza: any) => void;
  //onDeletePizza: (selectedPizza: any) => Promise<void>;
}

<<<<<<< HEAD
const usePizzaMutations = (): void => {
  const [createPizza] = useMutation(CREATE_PIZZA, { refetchQueries: [GET_PIZZAS, 'Pizzas'] });
  const [deletePizza] = useMutation(DELETE_PIZZA, { refetchQueries: [GET_PIZZAS, 'Pizzas'] });
  const [updatePizza] = useMutation(UPDATE_PIZZA);

  //useCallback to check
  const onCreatePizza = useCallback(
    (selectedPizza) => {
      createPizza({
        variables: {
          createPizzaInput: {
            name: selectedPizza.name,
            description: selectedPizza.description,
            imgSrc: selectedPizza.imgSrc,
            toppingIds: selectedPizza.toppingIds,
          },
        },
      });
    },
    [createPizza]
  );

  const onUpdatePizza = useCallback(
    (selectedPizza) => {
      try {
        updatePizza({
          variables: {
            updatePizzaInput: {
              id: selectedPizza.id,
              name: selectedPizza?.name,
              description: selectedPizza?.description,
              imgSrc: selectedPizza?.imgSrc,
              toppingIds: selectedPizza?.toppingIds,
=======
const usePizzaMutations = (): UsePizzaMutationsOutput => {
  const [createPizza] = useMutation(CREATE_PIZZA, { refetchQueries: [GET_PIZZAS, 'Pizzas'] });

  const onCreatePizza = useCallback(
    (selectedPizza) => {
      try {
        createPizza({
          variables: {
            createPizzaInput: {
              name: selectedPizza.name,
              description: selectedPizza.description,
              ImgSrc: selectedPizza.ImgSrc,
              toppingIds: selectedPizza.toppingIds,
>>>>>>> 3.7.2
            },
          },
        });
      } catch (error) {
<<<<<<< HEAD
        throw new Error('Update-Pizza input(client) not working');
      }
    },
    [updatePizza]
  );

  const onDeletePizza = useCallback(
    async (selectedPizza) => {
      try {
        await deletePizza({
          variables: {
            deletePizzaInput: {
              id: selectedPizza.id,
            },
          },
        });
      } catch (error) {
        throw new Error('Delete-Pizza input(client) not working');
      }
    },
    [deletePizza]
  );
  return { onCreatePizza, onDeletePizza, onUpdatePizza };
=======
        throw new Error('Create-Pizza (client) not working');
      }
    },
    [createPizza]
  );
>>>>>>> 3.7.2
};
