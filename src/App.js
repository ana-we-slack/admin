import { CssBaseline } from '@mui/material';
import { Router } from './components/router';
import { ProvideAuth } from './context/useAuth';

function App() {
  return (
    <ProvideAuth>
      <CssBaseline />
      <Router />
    </ProvideAuth>
  );
}

export default App;
