import React, {useState} from 'react';
import axios from 'axios';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';

import Search from './Search';

function Ingredients() {
  const [ ingredients, setIngredients ] = useState([]);

  const addIngredientHandler = async (ingredient) => {
    const response = await axios.post('https://food-22d6b.firebaseio.com/ingredients.json', ingredient);

    console.log(response);

    setIngredients(prevState => [...prevState, {
      id: Math.random().toString(),
      ...ingredient
    }]);
  }

  const removeIngredientHandler = id => {
    setIngredients(prevIngredients => prevIngredients.filter(ig => ig.id !== id));
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />  
      <section>
        <Search />
        <IngredientList ingredients={ingredients} onRemoveItem={removeIngredientHandler} />
     </section>
    </div>
  );
}

export default Ingredients;
