import React, {useState} from 'react';

import Card from '../UI/Card';
import LoadingIndicator from '../UI/LoadingIndicator';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {
  const [enteredTitle, setEnteredTitle ] = useState('');
  const [enteredAmount, setEnteredAmount ] = useState('');

  const submitHandler = event => {
    event.preventDefault();
    props.onAddIngredient({
      title: enteredTitle,
      amount: enteredAmount
    });
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
              value={enteredTitle}
              onChange={e => setEnteredTitle(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={enteredAmount}
              onChange={e => setEnteredAmount(e.target.value) }
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
          </div>
          { props.loading && <LoadingIndicator /> }
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;


// as reference

/**
 * <div className="form-control">
    <label htmlFor="title">Name</label>
    <input
      type="text"
      id="title"
      name="title"
      value={inputState.title}
      onChange={e => {
        const newTitle = e.target.value;
        const name = e.target.name;
        setInputState(prevState => ({
            [name]: newTitle,
            amount: prevState.amount
          })
        )}
      }
    />
  </div>
 */