import React, { useState, useEffect } from 'react';
import { getUsers, useDebounce } from './utils';
import Card from './components/card';
import { User } from './redux/users/User.type';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useInView } from 'react-intersection-observer';
import Form from './components/form';

const useStyles = makeStyles((theme) => ({
  App: {
    display: 'flex',
    flexDirection: 'column',
    padding: '1%',
    alignItems: 'center',
  },
  SearchBox: {
    minWidth: '50%',
  },
  navWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '95%',
    padding: '2%',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomDiv: {
    height: '1%',
  },
}));

const App: React.FC = () => {
  const [name, setName] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [page, setPage] = useState(1);
  const classes = useStyles();
  const debouncedName = useDebounce(name, 500);
  const [open, setOpen] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.5,
  });

  const handleScroll = async (): Promise<void> => {
    if (debouncedName) {
      setPage(page + 1);
      setIsSearching(true);
      try {
        const data: User[] = await getUsers(debouncedName, page);
        data.forEach((user: User) => {
          if (!users.find((obj: User) => obj.login === user.login)) {
            users.push(user);
          }
          setUsers([...users]);
          setIsSearching(false);
        });
      } catch (error) {
        setIsSearching(false);
      }
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(
    () => {
      if (debouncedName) {
        setIsSearching(true);
        const fetchUsers = async () => {
          try {
            const data: User[] = await getUsers(debouncedName, 1);
            setIsSearching(false);
            setUsers(data);
          } catch (error) {
            setIsSearching(false);
            setUsers([]);
          }
        };
        fetchUsers();
      } else {
        setUsers([]);
        setIsSearching(false);
      }
    },
    [debouncedName] // Only call effect if debounced search term changes
  );
  useEffect(() => {
    if (inView) {
      handleScroll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);
  const renderUsers = (users: User[]) =>
    users.map((user) => <Card key={user.login} user={user} />);

  return (
    <div className={classes.App}>
      <div className={classes.navWrapper}>
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          id='outlined-basic'
          label='Type name'
          variant='outlined'
          className={classes.SearchBox}
        ></TextField>
        <Button variant='outlined' onClick={handleOpen} color='primary'>
          Add User
        </Button>
      </div>

      <Form open={open} handleClose={handleClose} setOpen={setOpen} />

      <React.Fragment>
        {users && renderUsers(users)}
        <div className={classes.bottomDiv} ref={ref} />
      </React.Fragment>
      {isSearching && <CircularProgress />}
    </div>
  );
};

export default App;
