import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';

export default function CircularIndeterminate() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <CircularProgress color="success" />
      </Grid>
    </Box>
  );
}
