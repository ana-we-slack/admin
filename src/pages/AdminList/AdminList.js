import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Grid, Typography } from '@mui/material';
import { EnhancedTableToolbar } from './TableToolbar';
import BreadCrumbs from '../../components/breadCrumbs';
import { AdminTable } from './Table';
export default function AdminList() {
  const [selected, setSelected] = useState([]);

  return (
    <Box sx={{ width: '100%' }}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Paper sx={{ width: '100%', mb: 2 }}>
          <Typography variant="h4" component="h4" sx={{ mb: 2 }}>
            Users List
          </Typography>
          <BreadCrumbs />
          <EnhancedTableToolbar numSelected={selected.length} />
          <AdminTable selected={selected} setSelected={setSelected} />
        </Paper>
      </Grid>
    </Box>
  );
}
