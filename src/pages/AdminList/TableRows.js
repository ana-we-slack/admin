import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Avatar, CardHeader, Checkbox } from '@mui/material';
import ThreeDotsMenu from '../../components/menu';
import Spinner from '../../components/spinner';

export const TableRows = ({
  handleClick,
  isSelected,
  data,
  defaultData,
  defaultStatus,
  defaultError,
}) => {
  if (defaultStatus === 'pending') {
    return <Spinner />;
  } else if (defaultStatus === 'rejected') {
    throw defaultError;
  } else if (!data && !defaultData) {
    return <h1>Data no Avaliabe</h1>;
  }
  return (
    <TableBody>
      {data?.results.length > 0
        ? data?.results.map((row, index) => {
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
                  <ThreeDotsMenu id={row._id} />{' '}
                </TableCell>
              </TableRow>
            );
          })
        : defaultData?.results.map((row, index) => {
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
                  <ThreeDotsMenu id={row._id} />{' '}
                </TableCell>
              </TableRow>
            );
          })}
    </TableBody>
  );
};
