import React, { useState, useEffect } from 'react';
import { getUsers, useDebounce } from './utils';
import Card from './components/card';
import { User } from './redux/users/User.type';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Waypoint } from 'react-waypoint';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Zoom from '@material-ui/core/Zoom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

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
    width: '100%',
    padding: '2%',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '6px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: '70%',
    width: '70%',
  },
  Form: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  formField: {
    width: '100%',
    borderRadius: '6px',
    height: '30px',
    border: `1px solid ${theme.palette.primary.light}`,
  },
}));

function App() {
  const [name, setName] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [page, setPage] = useState(1);
  const classes = useStyles();
  const debouncedName = useDebounce(name, 500);
  const [open, setOpen] = useState(false);
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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (data: User) => {
    setUsers((currentUsers: User[]) => [data, ...currentUsers]);
    setOpen(false);
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
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Zoom in={open}>
          <div className={classes.paper}>
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                email: '',
              }}
              validationSchema={SignupSchema}
              onSubmit={(values) => {
                // same shape as initial values
                console.log(values);
              }}
            >
              {({ errors, touched }) => (
                <Form className={classes.Form}>
                  <div>
                    <Field
                      className={classes.formField}
                      placeholder='firstname'
                      name='firstName'
                    />
                    {errors.firstName && touched.firstName ? (
                      <div>{errors.firstName}</div>
                    ) : null}
                  </div>
                  <div>
                    <Field className={classes.formField} name='lastName' />
                    {errors.lastName && touched.lastName ? (
                      <div>{errors.lastName}</div>
                    ) : null}
                  </div>
                  <div>
                    <Field
                      className={classes.formField}
                      name='email'
                      type='email'
                    />
                    {errors.email && touched.email ? (
                      <div>{errors.email}</div>
                    ) : null}
                  </div>
                  <Button variant='outlined' color='primary' type='submit'>
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </Zoom>
      </Modal>
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
