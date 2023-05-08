import React from "react";
import { Link } from "react-router-dom";
import Auth from '../../utils/auth';
import { AppBar, Menu, MenuItem, IconButton, Tab, Tabs, Box, Typography, Toolbar } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';

function LinkTab(props) {
    return (
      <Tab
      sx={{ fontWeight: 'bold' }}
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
                            onChange={handleChange}
                            textColor="secondary"
                            indicatorColor="secondary"
                            aria-label="secondary tabs example"
                        >
                            <LinkTab label="My Bar" href="/mybar"/>
                            <LinkTab label="Cocktail Search" href="/cocktails"/>
                            <LinkTab label="Favourites" href="/favourites"/>
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
                        <MenuItem onClick={handleClose} component={Link} to="/profile">Profile</MenuItem>
                        <MenuItem onClick={Auth.logout}>Logout</MenuItem>
                    </Menu>
                        </Tabs>

                        
                    </div> }
                {!Auth.loggedIn() && 
                <div>
                    <Tabs
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