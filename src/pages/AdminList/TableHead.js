import TableHead from '@mui/material/TableHead';
import { TableCell, TableRow } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';

export function EnhancedTableHead(props) {
  const { onSelectAllClick, numSelected, rowCount } = props;

  const HeadCells = ['FirstName', 'LastName', 'CreatetAt', 'UpdatedAt'];
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all admins',
            }}
          />
        </TableCell>
        <TableCell>Email</TableCell>
        {HeadCells.map((headCell) => (
          <TableCell
            key={headCell}
            align="right"
            padding="none"
            style={{ minWidth: 170 }}
          >
            {headCell}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
