import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { IconButton, InputAdornment } from '@mui/material';
import { useState } from 'react';
import { VisibilityOff } from '@mui/icons-material';
import Visibility from '@mui/icons-material/Visibility';

export default function Login() {
  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
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
          <Typography
            component="subtitle"
            variant="h5"
            align="left"
            color="black"
          >
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
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 3 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              color="success"
            />
            <TextField
              value={values.password}
              onChange={handleChange('password')}
              type={values.showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton onClick={handleClickShowPassword}>
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              id="password"
              autoComplete="current-password"
              color="success"
            />
            <Grid container>
              <Grid item xs>
                <FormControlLabel
                  control={<Checkbox value="remember" color="success" />}
                  label="Remember me"
                />
              </Grid>
              <Grid item alignItems="self-end" mt={1}>
                <Link
                  href="#"
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
  );
}
