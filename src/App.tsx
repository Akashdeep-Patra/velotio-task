import React, { useState, useEffect } from 'react';
import './App.css';
import { getUsers, useDebounce } from './utils';
import { setUsers } from './redux/users/actions';
function App() {
  const [name, setName] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedName = useDebounce(name, 500);
  useEffect(
    () => {
      if (debouncedName) {
        setIsSearching(true);
        getUsers(debouncedName).then((results) => {
          setIsSearching(false);
          setResults(results);
        });
      } else {
        setResults([]);
        setIsSearching(false);
      }
    },
    [debouncedName] // Only call effect if debounced search term changes
  );

  return (
    <div className='App'>
      <input value={name} onChange={(e) => setName(e.target.value)}></input>
      {isSearching && <div>Searching ...</div>}
    </div>
  );
}

export default App;
