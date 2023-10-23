import './App.css';
import {Route, Routes} from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from './context/AuthContext';
import {InboxProvider} from './context/InboxContext'
import LoginSignup from './pages/_auth/LoginSignup';

function App() {
  return (
    <div className="App">
      <Routes>
        <AuthProvider>
          <Route exact path='/' element={<LoginSignup/>}></Route>
          <Route path='/login' element={<LoginSignup/>}></Route>
          <Route path='/signup' element={<LoginSignup/>}></Route>
          <InboxProvider>
            <PrivateRoute path='/dashboard' element={null}></PrivateRoute>
          </InboxProvider>
        </AuthProvider>
      </Routes>
    </div>
  );
}

export default App;
