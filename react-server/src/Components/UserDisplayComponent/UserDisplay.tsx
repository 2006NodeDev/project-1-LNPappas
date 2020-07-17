import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useSelector } from 'react-redux';
import { IState } from '../../reducers';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    backgroundColor: '#ebf7fa',
    color: '#0b3f32',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  imageMedia:{
    maxWidth:"100%",
    maxHeight:"100%",
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: '#106944',
  },
}));

export const UserDisplay:FunctionComponent<any> = (props)=>{
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  let currentUser = useSelector((state:IState)=>{
    return state.loginState.currentUser
  })

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  let changeRoute = () => {
    props.history.push('/edituser');
  }
  
  return (
    <div className='display'>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {props.user.username.charAt(0).toUpperCase()}
            </Avatar>
          }
          action={
            (currentUser.username === props.user.username)?
            <IconButton aria-label="settings" onClick={changeRoute}>
              <MoreVertIcon />
            </IconButton>
            :
            null
          }
          title={`${props.user.firstName} ${props.user.lastName}`}
          subheader={props.user.role.role}
        />
        <CardMedia
          className={classes.media}
          image={props.user.image || require('../../Pictures/noimage.png')}
          title={props.user.username}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.user.email}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>About: {props.user.username}</Typography>
            <Typography paragraph>
              {props.user.description}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  )
}