import React, { useState } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const [ enteredFilter, setEnteredFilter ] = useState('');
  const { onSearch } = props;

  const onSerachHandler = (e) => {
    setEnteredFilter(e.target.value);
    onSearch(e.target.value);
  }

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" value={enteredFilter} onChange={onSerachHandler} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
