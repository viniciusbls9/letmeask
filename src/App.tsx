import { BrowserRouter, Route, useHistory } from 'react-router-dom'

import { createContext, useState } from 'react'
import api from './service/api';
import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import './styles/global.scss'

export const AuthContext = createContext({} as any);

function App() {
  const history = useHistory();
  const [user, setUser] = useState()

  function signInWithGoogle() {
    api.signInWithGoogle()
  }

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ user, signInWithGoogle }}>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" component={NewRoom} />
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
