import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import { EnhancedTableHead } from './TableHead';
import { useAsync } from '../../utils/useAsync';
import { useEffect } from 'react';
import adminApi from '../../api/admin';
import Spinner from '../../components/spinner';
import { TableRows } from '../../pages/AdminList/TableRows';
import { CustomTablePagination } from './TablePagination';
export const AdminTable = ({
  selected,
  setSelected,
  rowsPerPage,
  setRowsPerPage,
  searchData,
}) => {
  const { status, error, run, data } = useAsync();

  useEffect(() => {
    run(adminApi.getAdmins({ page_size: rowsPerPage }));
  }, [rowsPerPage, run]);

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
            data={data}
            searchData={searchData}
            handleClick={handleClick}
            isSelected={isSelected}
          />
        </Table>
      </TableContainer>
      <CustomTablePagination
        run={run}
        adminApi={adminApi}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        data={data}
        searchData={searchData}
      />
    </>
  );
};
