import MenuItem from '@mui/material/MenuItem';
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuList,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import { useState, useCallback } from 'react';
import adminApi from '../api/admin';
import { useAsync } from '../utils/useAsync';
import { Redirect } from 'react-router-dom';
export default function ThreeDotsMenu({ id }) {
  const { data, run } = useAsync();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const Edit = useCallback(() => {
    run(adminApi.getAdminById(id));
  }, [id, run]);

  return (
    <>
      {!!data && (
        <Redirect
          to={{
            pathname: '/EditAdmin',
            state: { data },
          }}
        />
      )}
      <div>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls="long-menu"
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuList>
            <MenuItem disableRipple onClick={Edit}>
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText>Edit</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleClose} disableRipple>
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText>Delete</ListItemText>
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </>
  );
}
