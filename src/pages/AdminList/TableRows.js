import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Avatar, CardHeader, Checkbox } from '@mui/material';
import ThreeDotsMenu from '../../components/menu';

export const TableRows = ({
  handleClick,
  isSelected,
  data,
  run,
  rowPerPage,
}) => {
  return (
    <TableBody>
      {data?.results.length > 0 &&
        data?.results.map((row, index) => {
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
              <TableCell component="th" id={labelId} scope="row" padding="none">
                <CardHeader
                  avatar={<Avatar alt="admin-avatar" src={row.avatar} />}
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
                <ThreeDotsMenu run={run} id={row._id} />{' '}
              </TableCell>
            </TableRow>
          );
        })}
    </TableBody>
  );
};
