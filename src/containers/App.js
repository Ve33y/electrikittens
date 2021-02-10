import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry'
import './App.css';

function App() {

  const [kittens, setKittens] = useState([]);
  const [searchfield, setSearchfield] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setKittens(users))
      .catch((err) => console.log(err))
  }, []);

  const onSearchChange = (event) => {
    setSearchfield(event.target.value);
  };
 
  const filteredKittens = kittens.filter((kitten) => {
    return kitten.name.toLowerCase().includes(searchfield.toLowerCase());
  });

  return (!kittens.length) ? 
    <h1>Loading...</h1>
  :
      (
        <div className='tc'>
          <h1 className='f1'>Electrikittens</h1>
          <SearchBox searchChange={onSearchChange} />
          <Scroll>
            <ErrorBoundry>
              <CardList kittens={filteredKittens} />
            </ErrorBoundry>
          </Scroll>
        </div>
      )
}

export default App;