import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import { EnhancedTableHead } from './TableHead';
import { TableRows } from '../../pages/AdminList/TableRows';
import { CustomPagination } from './TablePagination';
import Spinner from '../../components/spinner';

export const AdminTable = ({
  selected,
  setSelected,
  rowsPerPage,
  setRowsPerPage,
  data,
  run,
  query,
  status,
  error,
}) => {
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

  if (status === 'pending') {
    return <Spinner />;
  } else if (status === 'rejected') {
    throw error;
  }
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
            handleClick={handleClick}
            isSelected={isSelected}
            run={run}
            rowsPerPage={rowsPerPage}
          />
        </Table>
      </TableContainer>
      <CustomPagination
        setRowsPerPage={setRowsPerPage}
        run={run}
        query={query}
        rowsPerPage={rowsPerPage}
        data={data}
      />
    </>
  );
};
