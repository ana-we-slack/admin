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
import { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import adminApi from '../api/admin';

import { useAsync } from '../utils/useAsync';

export default function ThreeDotsMenu({ id }) {
  const { data, run } = useAsync();

  const [anchorEl, setAnchorEl] = useState(null);
  let history = useHistory();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    run(adminApi.getAdminById(id));
  }, [id, run]);

  const Edit = useCallback(() => {
    history.push({
      pathname: `/editAdmin/${id}`,
      state: { data: data },
    });
  }, [data, history, id]);

  return (
    <>
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
