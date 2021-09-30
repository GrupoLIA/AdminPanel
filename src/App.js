import { AuthProvider } from './contexts/auth/authContext';
import { UserProvider } from './contexts/user/userContext';
import { ContractProvider } from './contexts/contract/contractContext';
import BaseRoute from './routes/BaseRoute';

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <ContractProvider>
          <BaseRoute />
        </ContractProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
