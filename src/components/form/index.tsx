import React, { Dispatch, SetStateAction } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';

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
  SearchBox: {
    minWidth: '50%',
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
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

interface FormProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  handleClose: Dispatch<SetStateAction<boolean>>;
}

const Form: React.FC<FormProps> = ({ setOpen, open, handleClose }) => {
  const classes = useStyles();
  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: SignupSchema,
    onSubmit: (values, { resetForm }) => {
      setOpen(false);
      resetForm();
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
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
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
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
            <Button color='primary' variant='outlined' fullWidth type='submit'>
              Submit
            </Button>
          </form>
        </div>
      </Zoom>
    </Modal>
  );
};

export default Form;
