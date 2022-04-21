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

const usePizzaMutations = (): void => {
  const [createPizza] = useMutation(CREATE_PIZZA, { refetchQueries: [GET_PIZZAS, 'Pizzas'] });
  const [deletePizza] = useMutation(DELETE_PIZZA, { refetchQueries: [GET_PIZZAS, 'Pizzas'] });
  const [updatePizza] = useMutation(UPDATE_PIZZA, { refetchQueries: [GET_PIZZAS, 'Pizzas'] });

  //useCallback to check
  const onCreatePizza = useCallback(
    (selectedPizza) => {
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
    },
    [createPizza]
  );
};
