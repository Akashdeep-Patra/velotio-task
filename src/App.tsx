import React, { useState, useEffect } from 'react';
import { getUsers, useDebounce } from './utils';
import Card from './components/card';
import { User } from './redux/users/User.type';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Waypoint } from 'react-waypoint';
const useStyles = makeStyles((theme) => ({
  App: {
    display: 'flex',
    flexDirection: 'column',
    padding: '1%',
    alignItems: 'center',
  },
  SearchBox: {
    minWidth: '50%',
    margin: '1%',
  },
}));

function App() {
  const [name, setName] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [page, setPage] = useState(1);
  const classes = useStyles();
  const debouncedName = useDebounce(name, 500);

  const handleScroll = () => {
    if (name) {
      setPage((prev) => prev + 1);
      setIsSearching(true);
      getUsers(name, page).then((data: User[]) => {
        setIsSearching(false);
        setUsers((prevUsers: User[]) => [...prevUsers, ...data]);
      });
    }
  };
  useEffect(
    () => {
      if (debouncedName) {
        setIsSearching(true);
        getUsers(debouncedName, 1).then((data: User[]) => {
          setIsSearching(false);
          setUsers(data);
        });
      } else {
        setUsers([]);
        setIsSearching(false);
      }
    },
    [debouncedName] // Only call effect if debounced search term changes
  );

  return (
    <div className={classes.App}>
      <TextField
        value={name}
        onChange={(e) => setName(e.target.value)}
        id='outlined-basic'
        label='Outlined'
        variant='outlined'
        className={classes.SearchBox}
      ></TextField>
      <React.Fragment>
        {users &&
          users.map((user: User, index: number) => (
            <Card key={user.login} user={user} />
          ))}
        <Waypoint onEnter={handleScroll} />
      </React.Fragment>
      {isSearching && <CircularProgress />}
    </div>
  );
}

export default App;
