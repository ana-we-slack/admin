import MenuItem from '@mui/material/MenuItem';
import { IconButton, ListItemIcon, ListItemText, Menu } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import ConfirmDialog from './confirmDialog';

export default function ThreeDotsMenu({ id, run, rowPerPage }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  let history = useHistory();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const Edit = useCallback(() => {
    history.push({
      pathname: `/editAdmin/${id}`,
    });
  }, [history, id]);

  return (
    <>
      {openDialog && (
        <ConfirmDialog
          rowPerPage={rowPerPage}
          run={run}
          id={id}
          setOpenDialog={setOpenDialog}
          openDialog={openDialog}
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
            <ListItemText onClick={handleClickOpenDialog}>Delete</ListItemText>
          </MenuItem>
        </Menu>
      </div>
    </>
  );
}
