import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { IconButton, InputAdornment } from '@mui/material';
import { useEffect, useState } from 'react';
import { VisibilityOff } from '@mui/icons-material';
import Visibility from '@mui/icons-material/Visibility';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAsync } from '../utils/useAsync';
import authApi from '../api/auth';
import Spinner from '../components/spinner';
import { useAuth } from '../context/useAuth';
import Link from '@mui/material/Link';
import { Redirect, Link as RouterLink } from 'react-router-dom';
const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
});

function Login() {
  const {
    status: tokenStatus,
    run: tokenRun,
    data: tokenData,
    error: tokenError,
  } = useAsync();

  const { setAuthState, authState } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const onPasswordIconClick = () => {
    setShowPassword((showPassword) => !showPassword);
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (formData) => {
    if (formData) {
      tokenRun(authApi.login(formData.email, formData.password));
    }
  };

  useEffect(() => {
    if (tokenData?.token) {
      setAuthState(tokenData?.token);
    }
  }, [setAuthState, tokenData?.token]);

  if (tokenStatus === 'pending') {
    return <Spinner />;
  } else if (tokenStatus === 'rejected') {
    throw tokenError;
  }
  return (
    <>
      {!!authState.token && <Redirect to="/adminList" />}
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Container component="main" maxWidth="xs">
          <Box>
            <Typography component="div" variant="h5" align="left" color="black">
              Sign in
            </Typography>
            <Typography
              mt={1}
              component="p"
              variant="subtitle2"
              align="left"
              color="GrayText"
            >
              Enter your details below
            </Typography>
            <Box
              component="form"
              noValidate
              sx={{ mt: 3 }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextField
                error={!!errors.email}
                helperText={errors.email?.message}
                defaultValue=""
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
              <Grid container>
                <Grid item xs>
                  <FormControlLabel
                    control={
                      <Checkbox {...register('remember')} color="success" />
                    }
                    label="Remember me"
                  />
                </Grid>
                <Grid item alignItems="self-end" mt={1}>
                  <Link
                    component={RouterLink}
                    to="/forgetPassword"
                    variant="body2"
                    underline="none"
                    borderColor="green"
                    color="green"
                  >
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>

              <Button
                id="submit"
                color="success"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Container>
      </Grid>
    </>
  );
}

export default Login;
