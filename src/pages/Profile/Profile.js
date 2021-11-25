import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Redirect } from 'react-router-dom';
import { useAsync } from '../../utils/useAsync';
import Spinner from '../../components/spinner';
import { useHistory } from 'react-router-dom';
import profileApi from '../../api/profile';
import { useEffect } from 'react';
const schema = yup.object({
  first_name: yup.string().min(3).max(15).required(),
  last_name: yup.string().min(3).max(15).required(),
  username: yup.string().min(3).max(15).required(),
  email: yup.string().email().required(),
});

function Profile() {
  const { data: profileData, run: profileRun, status, error } = useAsync();

  const {
    data: updateData,
    error: updateError,
    status: updateStatus,
    run: updateRun,
  } = useAsync();

  const history = useHistory();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),

    mode: 'onBlur',
  });

  useEffect(() => {
    profileRun(profileApi.myProfile());
  }, [profileRun]);

  const onCancel = () => {
    history.push('/adminList');
  };

  const onSubmit = (formData) => {
    if (formData) {
      updateRun(profileApi.updateProfile(formData));
    }
  };

  if ([status, updateStatus].includes('pending')) {
    return <Spinner />;
  } else if ([status, updateStatus].includes('rejected')) {
    throw error || updateError;
  }

  return (
    <>
      {!!updateData && <Redirect to="/adminList" />}
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
            My Profile
          </Typography>
          {profileData && (
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    defaultValue={profileData.first_name}
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
                    defaultValue={profileData.last_name}
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
                    defaultValue={profileData.username}
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
                    defaultValue={profileData.email}
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
                    Edit
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
export default Profile;
