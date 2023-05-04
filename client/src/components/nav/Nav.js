import React from "react";
import Auth from '../../utils/auth';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';

function LinkTab(props) {
    return (
      <Tab
        component="a"
        onClick={(event) => {
        }}
        {...props}
      />
    );
  }
function Nav() {
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  // return focus to the button when we transitioned from !open -> open
  const [anchorEl, setAnchorEl] = React.useState(null);
  return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
        <Toolbar>
        <Typography variant="h5" component="a" sx={{
              mr: 2,
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }} href="/">My Home Bar</Typography>
                {Auth.loggedIn() && 
                    <div>
                            
                        <Tabs
                        
                            value={value}
                            onChange={handleChange}
                            textColor="secondary"
                            indicatorColor="secondary"
                            aria-label="secondary tabs example"
                        >
                            <LinkTab label="My Bar" href="/mybar"/>
                            <LinkTab label="Cocktail Search" href="/cocktails"/>
                            <LinkTab label="Favourites" href="/favorites"/>
                            <IconButton
                        size="large"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={Auth.logout}>Logout</MenuItem>
                    </Menu>
                        </Tabs>

                        
                    </div> }
                {!Auth.loggedIn() && 
                <div>
                    <Tabs
                            value={value}
                            onChange={handleChange}
                            textColor="secondary"
                            indicatorColor="secondary"
                            aria-label="secondary tabs example"
                        >
                            <LinkTab label="Login" href="/login"/>
                            <LinkTab label="Sign Up" href="/signup"/>
                        </Tabs>
                </div>}
            </Toolbar>
        </AppBar>
        </Box>
  );
}

export default Nav;