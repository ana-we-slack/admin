import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import { EnhancedTableHead } from './TableHead';
import { TableRows } from '../../pages/AdminList/TableRows';
import { CustomTablePagination } from './TablePagination';
import Spinner from '../../components/spinner';
import { useEffect } from 'react';
import adminApi from '../../api/admin';
import { useAsync } from '../../utils/useAsync';

export const AdminTable = ({
  selected,
  setSelected,
  rowsPerPage,
  setRowsPerPage,
  data,
  status,
  error,
  run,
  query,
}) => {
  const {
    data: defaultData,
    run: defaultRun,
    status: defaultStatus,
    error: defaultError,
  } = useAsync();

  useEffect(() => {
    defaultRun(adminApi.getAdmins({ page_size: rowsPerPage }));
  }, []);

  if (status === 'pending') {
    return <Spinner />;
  } else if (status === 'rejected') {
    throw error;
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data?.results.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <EnhancedTableHead
            numSelected={selected.length}
            onSelectAllClick={handleSelectAllClick}
            rowCount={data?.results.length}
          />
          <TableRows
            rowsPerPage={rowsPerPage}
            data={data}
            handleClick={handleClick}
            isSelected={isSelected}
            defaultData={defaultData}
            defaultStatus={defaultStatus}
            defaultError={defaultError}
          />
        </Table>
      </TableContainer>
      <CustomTablePagination
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        data={data}
        run={run}
        defaultData={defaultData}
        query={query}
      />
    </>
  );
};
