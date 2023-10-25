import './App.css';
import {Route, Routes} from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from './context/AuthContext';
import {InboxProvider} from './context/InboxContext'
import { PrivateSocketProvider } from './context/PrivateSocketContext';
import LoginSignup from './pages/_auth/LoginSignup';
import PrivateThread from './pages/chat/PrivateThread';
import Dashboard from './pages/chat/Dashboard'
function App() {
  return (
    <div className="App">
      <Routes>
        <AuthProvider>
          <Route exact path='/' element={<LoginSignup/>}></Route>
          <Route path='/login' element={<LoginSignup/>}></Route>
          <Route path='/signup' element={<LoginSignup/>}></Route>
          <InboxProvider>
            <PrivateSocketProvider>
            <PrivateRoute path='/dashboard' element={Dashboard}></PrivateRoute>
            <PrivateRoute path='/chat/:threadID' element={PrivateThread}></PrivateRoute>
            </PrivateSocketProvider>
          </InboxProvider>
        </AuthProvider>
      </Routes>
    </div>
  );
}

export default App;
