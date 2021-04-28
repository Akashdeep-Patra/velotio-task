import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { User } from '../../redux/users/User.type';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  Card: {
    display: 'flex',
    padding: '1%',
    margin: '2%',
    justifyContent: 'space-between',
    borderRadius: '6px',
    border: `1px solid ${theme.palette.primary.light}`,
    minWidth: '60%',
    transition: 'all .3s',
    '&:hover': {
      transition: 'all .3s',
      transform: 'scale(1.035)',
      cursor: 'pointer',
      boxShadow:
        ' rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
      border: '1px',
    },
  },
  Avatar: {
    height: '100px',
    width: '100px',
    borderRadius: '50px',
    boxShadow:
      ' rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
  },
  loginName: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));
const Card = (props: any) => {
  const user: User = props.user;
  const classes = useStyles();
  return (
    <div className={classes.Card}>
      <img alt='avatar' className={classes.Avatar} src={user.avatar_url} />
      <div className={classes.loginName}>
        <Typography color='primary' variant='h5'>
          PROFILE NAME:
        </Typography>
        <Typography color='primary' variant='h5'>
          {user.login}
        </Typography>
      </div>
    </div>
  );
};
export default Card;
