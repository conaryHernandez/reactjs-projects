import React, {useState} from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {
  const inputState = useState({
    title: '',
    amount: ''
  });

  const submitHandler = event => {
    event.preventDefault();
    // ...
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              id="title"
              name="title"
              value={inputState[0].title}
              onChange={e => {
                const newTitle = e.target.value;
                const name = e.target.name;
                inputState[1](prevState => ({
                    [name]: newTitle,
                    amount: prevState.amount
                  })
                )}
              }
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={inputState[0].amount}
              onChange={e =>  {
                const newAmount = e.target.value;
                const name = e.target.name;
                  
                inputState[1](prevState => ({
                    [name]: newAmount,
                    title: inputState[0].title
                  })
                )}
              }
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
