import { useState } from 'react';
import AppRouter from './router.config';
import { AuthProvider } from "./contexts/authContext";

function App() {

  const [signIn, setSignIn] = useState(true);

  return (
    <div>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </div>
  );
}

export default App