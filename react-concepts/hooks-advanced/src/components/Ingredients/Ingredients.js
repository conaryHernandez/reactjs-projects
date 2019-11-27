import React, { useState, useEffect } from 'react';
import axios from 'axios';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';

import Search from './Search';

function Ingredients() {
  const [ ingredients, setIngredients ] = useState([]);
  const [ filteredIngredients, setFilteredIngredients ] = useState([]);
  const [ ingredientsToDisplay, setIngredientsToDisplay ] = useState(ingredients);

  useEffect(() => {

    async function fetchIngredients() {
      
      try {
        const response = await axios.get('https://food-22d6b.firebaseio.com/ingredients.json');
        const loadedIngredients = [];

        for(const key in response.data) {
          loadedIngredients.push({
            id:  key,
            title: response.data[key].title,
            amount: response.data[key].amount,
          });
        }

        setIngredients(loadedIngredients);
        
      } catch (error) {
        console.log(error);
      }  
    }
    fetchIngredients();
  }, []);

  useEffect(() => {
    if (filteredIngredients.length > 0) {
      setIngredientsToDisplay(filteredIngredients);
    } else {
      setIngredientsToDisplay(ingredients);
    }
  }, [filteredIngredients, ingredients]);

  const addIngredientHandler = async (ingredient) => {
    const response = await axios.post('https://food-22d6b.firebaseio.com/ingredients.json', ingredient);

    setIngredients(prevState => [...prevState, {
      id: response.name,
      ...ingredient
    }]);
  }

  const removeIngredientHandler = id => {
    setIngredients(prevIngredients => prevIngredients.filter(ig => ig.id !== id));
  };

  const filterIngredientsHandler = value => {
    setFilteredIngredients(ingredients.filter(ig => ig.title.includes(value)))
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />  
      <section>
        <Search onSearch={filterIngredientsHandler}/>
        <IngredientList ingredients={ingredientsToDisplay} onRemoveItem={removeIngredientHandler} />
     </section>
    </div>
  );
}

export default Ingredients;
