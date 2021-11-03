import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { EnhancedTableHead } from './TableHead';
import ThreeDotsMenu from '../../components/menu';
import { Avatar, CardHeader, Checkbox } from '@mui/material';
import { useAsync } from '../../utils/useAsync';
import { useEffect, useState } from 'react';
import adminApi from '../../api/admin';
import Spinner from '../../components/spinner';
import { CustomPagination } from './TablePagination';

export const AdminTable = ({ selected, setSelected }) => {
  const { status, error, run, data } = useAsync();
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
          <TableBody>
            {data?.results.map((row, index) => {
              const isItemSelected = isSelected(row._id);
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <TableRow
                  hover
                  onClick={(event) => handleClick(event, row._id)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row._id}
                  selected={isItemSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      inputProps={{
                        'aria-labelledby': labelId,
                      }}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    id={labelId}
                    scope="row"
                    padding="none"
                  >
                    <CardHeader
                      avatar={
                        <Avatar
                          alt="Remy Sharp"
                          src="/static/images/avatar/1.jpg"
                        />
                      }
                      title={row.email}
                    />
                  </TableCell>
                  <TableCell align="right">{row.first_name}</TableCell>
                  <TableCell align="right">{row.last_name}</TableCell>
                  <TableCell align="right">{row.createdAt}</TableCell>
                  <TableCell align="right">{row.updatedAt}</TableCell>
                  <TableCell
                    padding="none"
                    align="center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ThreeDotsMenu />{' '}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <CustomPagination
        setRowsPerPage={setRowsPerPage}
        run={run}
        rowsPerPage={rowsPerPage}
        data={data}
      />
    </>
  );
};
