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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
  tab: {
    border: '1px solid grey',
    borderRadius: '6px',
    width: '70%',
    margin: '1%',
    padding: '1%',
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

const Home = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [tab, setTab] = useState('posts');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleAnchorClick = (
    post: Post,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    setSelectedPost(post);
    setAnchorEl(event.currentTarget);
  };

  const handleAnchorClose = () => {
    setAnchorEl(null);
  };
  const users = useSelector<AppState, NormalizedUserObject[]>((state) =>
    Object.values(state.users.byId)
  );
  const posts = useSelector<AppState, NormalizedPostObject[]>((state) =>
    Object.values(state.posts.byId)
  );
  const commentsById = useSelector<AppState, { [id: string]: Comment }>(
    (state) => state.comments.byId
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

  const renderPosts = (posts: NormalizedPostObject[]) =>
    posts
      .filter((post) => post.userId === selectedUser?.id)
      .map((post) => (
        <div className={classes.tab} key={post.id}>
          <div onClick={(e) => handleAnchorClick(post, e)}>{post.title}</div>
          {selectedPost?.id === post.id && (
            <Menu
              id='simple-menu'
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleAnchorClose}
            >
              {renderComments(post)}
            </Menu>
          )}
        </div>
      ));

  const renderComments = (post: NormalizedPostObject) =>
    post.comments.map((commentId) => (
      <MenuItem onClick={handleAnchorClose} key={commentId}>
        {commentsById[commentId].name}
      </MenuItem>
    ));

  const renderTodos = (todos: Todo[]) =>
    todos
      .filter((todo) => todo.userId === selectedUser?.id)
      .map((todo) => (
        <div className={classes.tab} key={todo.id}>
          {todo.title}
        </div>
      ));

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
                  value='todos'
                  control={<Radio />}
                  label='Todos'
                />
              </RadioGroup>
            </FormControl>
            {selectedUser && open && tab === 'posts' && renderPosts(posts)}
            {selectedUser && open && tab === 'todos' && renderTodos(todos)}
          </form>
        </Zoom>
      </Modal>
      {renderUsers(users)}
    </div>
  );
};

export default Home;
