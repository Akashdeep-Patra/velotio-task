import Interweave from 'interweave';
import React, { Dispatch, SetStateAction, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
    width: '70%',
    height: '80%',
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
  note: {},
}));

interface FormProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  handleClose: Dispatch<SetStateAction<boolean>>;
}

const Form: React.FC<FormProps> = ({ setOpen, open, handleClose }) => {
  const classes = useStyles();
  const [note, setNote] = useState('');
  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: SignupSchema,
    onSubmit: (values, { resetForm }) => {
      setOpen(false);
      resetForm();
      alert(JSON.stringify({ ...values, note }, null, 2));
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
            <CKEditor
              editor={ClassicEditor}
              data={note}
              className={classes.note}
              onChange={(event: React.ChangeEvent, editor: any) => {
                const data = editor.getData();
                setNote(data);
              }}
            />
            <Interweave content={note} />
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
