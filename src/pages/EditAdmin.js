import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAsync } from '../utils/useAsync';
import adminApi from '../api/admin';
import Spinner from '../components/spinner';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';
const schema = yup.object({
  first_name: yup.string().min(3).max(15).required(),
  last_name: yup.string().min(3).max(15).required(),
  username: yup.string().min(3).max(15).required(),
  email: yup.string().email().required(),
});
function EditAdmin() {
  const { data, error, status, run } = useAsync();
  const history = useHistory();
  let { id } = useParams();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });
  useEffect(() => {
    run(adminApi.getAdminById(id));
  }, [id, run]);

  const onCancel = () => {
    history.push('/adminList');
  };

  const onSubmit = (formData) => {
    if (formData) {
      run(adminApi.updateAdmin(id, formData));
    }
    history.push('/adminList');
  };

  if (status === 'pending') {
    return <Spinner />;
  } else if (status === 'rejected') {
    throw error;
  }

  return (
    <>
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
          {data && (
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    defaultValue={data.first_name}
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
                    color="success"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    defaultValue={data.last_name}
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
                    color="success"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    defaultValue={data.username}
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
                    color="success"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    defaultValue={data.email}
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
          )}
        </Box>
      </Container>
    </>
  );
}
export default EditAdmin;
