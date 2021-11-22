import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLocation, Redirect } from 'react-router-dom';
import { useAsync } from '../utils/useAsync';
import adminApi from '../api/admin';
import Spinner from '../components/spinner';
import { useHistory } from 'react-router-dom';
const schema = yup.object({
  first_name: yup.string().min(3).max(15).required(),
  last_name: yup.string().min(3).max(15).required(),
  username: yup.string().min(3).max(15).required(),
  email: yup.string().email().required(),
});

function EditAdmin() {
  const { data: editData, error, status, run } = useAsync();
  const location = useLocation();
  const { data } = location.state;
  const history = useHistory();

  const {
    handleSubmit,
    register,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      first_name: data.first_name,
      last_name: data.last_name,
      username: data.username,
      email: data.email,
    },
  });

  const onCancel = () => {
    history.push('/adminList');
  };

  const onSubmit = (formData) => {
    if (formData) {
      run(adminApi.updateAdmin(data._id, formData));
    }
  };

  if (status === 'pending') {
    return <Spinner />;
  } else if (status === 'rejected') {
    throw error;
  }

  return (
    <>
      {!!editData && <Redirect to="/adminList" />}
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Edit Admin
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={!!errors.first_name}
                  helperText={errors.first_name?.message}
                  type="text"
                  {...register('first_name')}
                  margin="normal"
                  required
                  fullWidth
                  id="first_name"
                  label="First Name"
                  autoComplete="first_name"
                  autoFocus
                  color="success"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={!!errors.last_name}
                  helperText={errors.last_name?.message}
                  type="text"
                  {...register('last_name')}
                  margin="normal"
                  required
                  fullWidth
                  id="last_name"
                  label="Last Name"
                  autoComplete="last name"
                  autoFocus
                  color="success"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={!!errors.username}
                  helperText={errors.username?.message}
                  type="text"
                  {...register('username')}
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  autoComplete="user name"
                  autoFocus
                  color="success"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  type="email"
                  {...register('email')}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  autoFocus
                  color="success"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  color="success"
                  id="submit"
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Add Admin
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  onClick={onCancel}
                  fullWidth
                  color="error"
                  type="cancel"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}
export default EditAdmin;
