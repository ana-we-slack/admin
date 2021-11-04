import { TablePagination } from '@mui/material';

export const CustomTablePagination = ({
  searchData,
  data,
  run,
  adminApi,
  rowsPerPage,
  setRowsPerPage,
}) => {
  const handleChangePage = (event, pageNumber) => {
    run(
      adminApi.getAdmins({
        page_number: +pageNumber + 1,
        page_size: rowsPerPage,
      })
    );
  };

  const handleChangeRowsPerPage = (event) => {
    const newValue = parseInt(event.target.value, 10);

    run(adminApi.getAdmins({ page_number: 1, page_size: newValue }));
    setRowsPerPage(newValue);
  };
  return (
    <>
      {searchData?.results > 0 ? (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={searchData?.pagination.count}
          rowsPerPage={searchData?.pagination.page_size}
          page={+searchData?.pagination.page_number - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      ) : (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data?.pagination.count}
          rowsPerPage={data?.pagination.page_size}
          page={+data?.pagination.page_number - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </>
  );
};
