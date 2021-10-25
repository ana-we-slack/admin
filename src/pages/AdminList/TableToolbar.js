import {
  IconButton,
  InputBase,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '../../components/Button';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useState } from 'react';

export const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;
  const [query, updateQuery] = useState('');

  function onSearch({ currentTarget }) {
    updateQuery(currentTarget.value);
  }

  return (
    <Toolbar
      sx={{
        pl: { sm: 1 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <>
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>

          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <>
          <InputBase
            onChange={onSearch}
            value={query}
            type="text"
            sx={{ flex: '1 1 33%' }}
            startAdornment={
              <IconButton type="submit" aria-label="search">
                <SearchIcon />
              </IconButton>
            }
            placeholder="Search user"
            inputProps={{ 'aria-label': 'search users' }}
          />
          <Tooltip title="Filter list ">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
          <Button />
        </>
      )}
    </Toolbar>
  );
};
