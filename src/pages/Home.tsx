import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Card from '../components/card';
import { makeStyles } from '@material-ui/core/styles';
import { AppState } from '../redux/store';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Zoom from '@material-ui/core/Zoom';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Form from '../components/form';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  home: {
    display: 'flex',
    flexDirection: 'column',
    padding: '2%',
    alignItems: 'center',
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
    width: '70%',
    height: '80%',
    overflowY: 'scroll',
  },
  radioBar: {
    display: 'flex',
  },
}));

const Home = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [tab, setTab] = useState('posts');
  const users = useSelector<AppState, User[]>((state) =>
    Object.values(state.users.byId)
  );
  const posts = useSelector<AppState, Post[]>((state) =>
    Object.values(state.posts.byId)
  );
  const comments = useSelector<AppState, Comment[]>((state) =>
    Object.values(state.comments.byId)
  );
  const todos = useSelector<AppState, Todo[]>((state) =>
    Object.values(state.todos.byId)
  );
  const handleformClose = () => {
    setFormOpen(false);
  };
  const handleClick = (user: User) => {
    setSelectedUser(user);
    setOpen(true);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTab(e.target.value);
  };
  const renderUsers = (users: User[]) =>
    users.map((user) => (
      <Card key={user.id} handleClick={() => handleClick(user)} user={user} />
    ));
  const renderPosts = (posts: Post[]) =>
    posts
      .filter((post) => post.userId === selectedUser?.id)
      .map((post) => <div key={post.id}>{post.title}</div>);
  const renderComments = (comments: Comment[]) =>
    comments.map((comment) => <div key={comment.id}>{comment.name}</div>);
  const renderTodos = (todos: Todo[]) =>
    todos
      .filter((todo) => todo.userId === selectedUser?.id)
      .map((todo) => <div key={todo.id}>{todo.title}</div>);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.home}>
      <Button
        variant='outlined'
        onClick={() => {
          setFormOpen(true);
        }}
        color='primary'
      >
        Open Form
      </Button>
      <Form
        open={formOpen}
        handleClose={handleformClose}
        setOpen={setFormOpen}
      />
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
          <form className={classes.paper}>
            <FormControl className={classes.radioBar} component='fieldset'>
              <FormLabel component='legend'>TAB</FormLabel>
              <RadioGroup
                row
                aria-label='position'
                name='position'
                value={tab}
                onChange={handleChange}
              >
                <FormControlLabel
                  value='posts'
                  control={<Radio />}
                  label='Posts'
                />
                <FormControlLabel
                  value='comments'
                  control={<Radio />}
                  label='Comments'
                />
                <FormControlLabel
                  value='todos'
                  control={<Radio />}
                  label='Todos'
                />
              </RadioGroup>
            </FormControl>
            {selectedUser && open && tab === 'posts' && renderPosts(posts)}
            {selectedUser && open && tab === 'todos' && renderTodos(todos)}
            {selectedUser &&
              open &&
              tab === 'comments' &&
              renderComments(comments)}
          </form>
        </Zoom>
      </Modal>
      {renderUsers(users)}
    </div>
  );
};

export default Home;
