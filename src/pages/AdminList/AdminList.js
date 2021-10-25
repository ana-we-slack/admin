import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Grid, Typography } from '@mui/material';
import { EnhancedTableToolbar } from './TableToolbar';
import { EnhancedTablePagination } from './TablePagination';
import BreadCrumbs from '../../components/breadCrumbs';
import { AdminTable } from './Table';
import { rows } from '../../fakeData';
export default function AdminList() {
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
          <AdminTable
            selected={selected}
            setSelected={setSelected}
            page={page}
            rowsPerPage={rowsPerPage}
          />

          <EnhancedTablePagination
            rows={rows}
            rowsPerPage={rowsPerPage}
            page={page}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </Grid>
    </Box>
  );
}
