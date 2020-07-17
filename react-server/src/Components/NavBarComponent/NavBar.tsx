import React, { FunctionComponent } from 'react';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { Link } from 'react-router-dom'
import { IState } from '../../reducers';
import { useSelector } from 'react-redux';
import '../../App.css'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            colorDefault: '#0c4038',
            backgroundColor: '#000000'
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
            justifyContent: 'center',
        },
    }),
);

export const NavBar: FunctionComponent<any> = (props) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const currentUser = useSelector((state:IState)=>{
        return state.loginState.currentUser
    })

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    //always have the login item
    let menuItems = [<MenuItem onClick={handleClose} key={'login'}><Link to='/login'>Login</Link></MenuItem>, 
                        <MenuItem onClick={handleClose} key={'newUser'}><Link to='/new'>Create Account</Link></MenuItem>]
    
    if(currentUser){
        //if they are logged in, add the other items
        menuItems = []
        menuItems.push(<MenuItem selected classes={{ root: 'MenuItem', selected: 'selected' }} onClick={handleClose} key={'logout'}><Link to='/logout'>LogOut</Link></MenuItem>,
        <MenuItem onClick={handleClose}><Link to={`/profile/${(currentUser)?currentUser.userId : '0' }`}>My Profile</Link></MenuItem>)
    }

    if((currentUser && currentUser.role.role === 'admin') || (currentUser && currentUser.role.role === 'finance-manager')){
        menuItems.push(<MenuItem onClick={handleClose}><Link to='/users'>All Users</Link></MenuItem>)
    }

    return (
        <nav className='nav'>
            <AppBar position="static">
                <Toolbar >
                    <IconButton onClick={handleClick} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Menu id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}>
                        {menuItems}
                    </Menu>
                    <Typography variant="h6" className={classes.title}>
                        Project 1
                </Typography>
                    {/* <Link to='/login'><Button onClick={handleClose} key={'login'}>LogIn</Button></Link> */}
                </Toolbar>
            </AppBar>
        </nav>
    )
}