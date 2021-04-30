import React, { useState, useEffect } from 'react';
import { getUsers, useDebounce } from './utils';
import Card from './components/card';
import { User } from './redux/users/User.type';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Zoom from '@material-ui/core/Zoom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useInView } from 'react-intersection-observer';
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
interface MyFormValues {
  firstName: string;
  lastName: string;
  email: string;
}
const initialFormValues: MyFormValues = {
  firstName: '',
  lastName: '',
  email: '',
};
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

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: SignupSchema,
    onSubmit: (values, { resetForm }) => {
      setOpen(false);
      resetForm();
      alert(JSON.stringify(values, null, 2));
    },
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
  // const handleSubmit = (data: User) => {
  //   setUsers((currentUsers: User[]) => [data, ...currentUsers]);
  //   setOpen(false);
  // };
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
  const renderUsers = (user: User) => <Card key={user.login} user={user} />;

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
            <form className={classes.Form} onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                className={classes.SearchBox}
                variant='outlined'
                id='firstName'
                name='firstName'
                label='First Name'
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
              <TextField
                fullWidth
                className={classes.SearchBox}
                variant='outlined'
                id='lastName'
                name='lastName'
                label='Last Name'
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
              <TextField
                fullWidth
                className={classes.SearchBox}
                variant='outlined'
                id='email'
                name='email'
                label='Email'
                type='email'
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <Button
                color='primary'
                variant='outlined'
                fullWidth
                type='submit'
              >
                Submit
              </Button>
            </form>
          </div>
        </Zoom>
      </Modal>
      <React.Fragment>
        {users && users.map(renderUsers)}
        <div ref={ref} />
      </React.Fragment>
      {isSearching && <CircularProgress />}
    </div>
  );
};

export default App;
