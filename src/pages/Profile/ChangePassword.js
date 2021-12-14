import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { IconButton, InputAdornment, Grid } from '@mui/material';
import { useState } from 'react';
import { VisibilityOff } from '@mui/icons-material';
import Visibility from '@mui/icons-material/Visibility';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAsync } from '../../utils/useAsync';
import profileApi from '../../api/profile';
import { Redirect, useHistory } from 'react-router-dom';
import Spinner from '../../components/spinner';
const schema = yup.object({
  old_password: yup.string().min(8).max(32).required(),
  password: yup.string().min(8).max(32).required(),
});

function ChangePassword() {
  const history = useHistory();
  const { status, run, error } = useAsync();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onPasswordIconClick = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  const onOldPasswordIconClick = () => {
    setShowOldPassword((showOldPassword) => !showOldPassword);
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onCancel = () => {
    history.push('/adminList');
  };
  const onSubmit = (formData) => {
    if (formData) {
      run(
        profileApi.updateProfilePassword(
          formData.old_password,
          formData.password
        )
      );
      history.push('/adminList');
    }
  };
  if (status === 'pending') {
    return <Spinner />;
  } else if (status === 'error') {
    throw error;
  } else if (status === 'resolved') {
    <Redirect to="/adminList" />;
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
          <Typography component="div" variant="h5" align="left" color="black">
            Change Password
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 3 }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={!!errors.old_password}
                  helperText={errors.old_password?.message}
                  defaultValue=""
                  {...register('old_password')}
                  type={showOldPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => onOldPasswordIconClick()}>
                          {showOldPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  margin="normal"
                  required
                  fullWidth
                  label="OldPassword"
                  id="old_password"
                  autoComplete="old-password"
                  color="success"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  defaultValue=""
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => onPasswordIconClick()}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  id="password"
                  autoComplete="current-password"
                  color="success"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  id="submit"
                  color="success"
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Change Password
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

export default ChangePassword;
