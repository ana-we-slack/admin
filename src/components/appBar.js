import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { ListItemIcon, ListItemText } from '@mui/material';
import { useState, useCallback } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import Avatar from '@mui/material/Avatar';
import { useAuth } from '../context/useAuth';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
export default function MenuAppBar() {
  const history = useHistory();
  const { logout, authState } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

  const handleProfile = useCallback(() => {
    history.push({
      pathname: '/profile',
    });
    handleClose();
  }, [history]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {!!authState.user && (
        <AppBar position="sticky" color="success">
          <Toolbar>
            <Typography
              style={{ textDecoration: 'none', color: 'unset' }}
              variant="h6"
              to="/adminList"
              component={NavLink}
              sx={{ flexGrow: 1 }}
            >
              ADMIN
            </Typography>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
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
                <MenuItem onClick={handleProfile}>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText>Profile</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      )}
    </Box>
  );
}
