import { useCallback, useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Grid, Typography } from '@mui/material';
import { CustomTableToolbar } from './TableToolbar';
import BreadCrumbs from '../../components/breadCrumbs';
import { AdminTable } from './Table';
import adminApi from '../../api/admin';
import { useAsync } from '../../utils/useAsync';
import debounce from 'lodash.debounce';

function AdminList() {
  const [selected, setSelected] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { data, run } = useAsync();

  const onSearch = useCallback(
    (query) => {
      run(adminApi.getAdmins({ search: query, page_size: rowsPerPage }));
    },
    [rowsPerPage, run]
  );

  const debouncedSearch = useMemo(() => debounce(onSearch, 300), [onSearch]);

  const onChange = (event) => {
    onSearch(event.target.value);
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

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
          <CustomTableToolbar
            numSelected={selected.length}
            onChange={onChange}
            debounce={debounce}
          />
          <AdminTable
            selected={selected}
            setSelected={setSelected}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            searchData={data}
          />
        </Paper>
      </Grid>
    </Box>
  );
}

export default AdminList;
