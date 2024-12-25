import { useState } from 'react';
import AppRouter from './router.config';

function App() {

  const [signIn, setSignIn] = useState(true);

  return (
    <div>
      <AppRouter />
    </div>
  );
}

export default App