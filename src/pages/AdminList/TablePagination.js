import { TablePagination } from '@mui/material';
import adminApi from '../../api/admin';

export const CustomPagination = ({
  setRowsPerPage,
  run,
  rowsPerPage,
  data,
}) => {
  const handleChangeRowsPerPage = (event) => {
    const newValue = parseInt(event.target.value, 10);

    run(adminApi.getAdmins({ page_number: 1, page_size: newValue }));
    setRowsPerPage(newValue);
  };

  const handleChangePage = (event, pageNumber) => {
    run(
      adminApi.getAdmins({
        page_number: +pageNumber + 1,
        page_size: rowsPerPage,
      })
    );
  };
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
};
