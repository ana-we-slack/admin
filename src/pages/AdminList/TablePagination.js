import { TablePagination } from '@mui/material';
import adminApi from '../../api/admin';

export const CustomTablePagination = ({
  data,
  rowsPerPage,
  setRowsPerPage,
  run,
  defaultData,
  query,
}) => {
  const handleChangePage = (event, pageNumber) => {
    run(
      adminApi.getAdmins({
        page_number: +pageNumber + 1,
        page_size: rowsPerPage,
        search: query,
      })
    );
  };

  const handleChangeRowsPerPage = (event) => {
    const newValue = parseInt(event.target.value, 10);

    run(
      adminApi.getAdmins({ page_number: 1, page_size: newValue, search: query })
    );
    setRowsPerPage(newValue);
  };

  const getPagination = () => {
    if (data?.results.length > 0) {
      return (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data?.pagination.count}
          rowsPerPage={data?.pagination.page_size}
          page={+data?.pagination.page_number - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      );
    } else if (defaultData?.results.length > 0) {
      return (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={defaultData?.pagination.count}
          rowsPerPage={defaultData?.pagination.page_size}
          page={+defaultData?.pagination.page_number - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      );
    }
  };
  return <>{getPagination()}</>;
};
