import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
export default function IconLabelButtons() {
  return (
    <Stack direction="row" spacing={2}>
      <Button color="success" back variant="contained" startIcon={<AddIcon />}>
        New User
      </Button>
    </Stack>
  );
}
