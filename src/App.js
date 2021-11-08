import { CssBaseline } from '@mui/material';
import { Router } from './components/router';
import { ProvideAuth } from './context/useAuth';
import { ProvideAxios } from './context/useAxios';

function App() {
  return (
    <>
      <CssBaseline />
      <ProvideAuth>
        <ProvideAxios>
          <Router />
        </ProvideAxios>
      </ProvideAuth>
    </>
  );
}

export default App;
