import { AuthProvider } from './contexts/auth/authContext';
import { UserProvider } from './contexts/user/userContext';
import BaseRoute from './routes/BaseRoute';

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <BaseRoute />
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
