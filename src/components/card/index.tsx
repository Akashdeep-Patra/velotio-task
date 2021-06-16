import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Gravatar from 'react-gravatar';
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
export interface CardProps {
  user: User;
  key: string;
  handleClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}
const Card: React.FC<CardProps> = (props: CardProps): JSX.Element => {
  const user: User = props.user;
  const classes = useStyles();
  return (
    <div
      onClick={props.handleClick ? props.handleClick : () => {}}
      className={classes.Card}
    >
      <Gravatar
        email={user.email}
        size={100}
        rating='pg'
        default='monsterid'
        className={classes.Avatar}
      />
      <div className={classes.loginName}>
        <Typography color='primary' variant='h6'>
          PROFILE NAME:
        </Typography>
        <Typography color='primary' variant='subtitle1'>
          {user.username}
        </Typography>
      </div>
    </div>
  );
};
export default Card;
