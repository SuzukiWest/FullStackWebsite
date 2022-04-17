//imports
import { useCallback } from 'react';
import { useMutation } from '@apollo/client';

//imports
import { CREATE_PIZZA, DELETE_PIZZA, UPDATE_PIZZA } from '../graphql/topping/mutations';
import { GET_PIZZAS } from '../graphql/topping/queries/get-pizzas';

interface UsePizzaMutationsOutput {
  onCreatePizza: (selectedPizza: any) => void;
  onUpdatePizza: (selectedPizza: any) => void;
  onDeletePizza: (selectedPizza: any) => Promise<void>;
}

const usePizzaMutations = (): UsePizzaMutationsOutput => {
  const [createPizza] = useMutation(CREATE_PIZZA, { refetchQueries: [GET_PIZZAS, 'Pizzas'] });
  const [deletePizza] = useMutation(DELETE_PIZZA, { refetchQueries: [GET_PIZZAS, 'Pizzas'] });
  const [updatePizza] = useMutation(UPDATE_PIZZA);

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
            },
          },
        });
      } catch (error) {
        throw new Error('Create-Pizza input(client) not working');
      }
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
              ImgSrc: selectedPizza?.ImgSrc,
              toppingIds: selectedPizza?.toppingIds,
            },
          },
        });
      } catch (error) {
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
};

export default usePizzaMutations;
