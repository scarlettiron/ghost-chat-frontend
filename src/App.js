import './App.css';
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from './context/AuthContext';
import {InboxProvider} from './context/InboxContext'
import { PrivateSocketProvider } from './context/PrivateSocketContext';
import LoginSignup from './pages/_auth/LoginSignup';
import PrivateThread from './pages/chat/PrivateThread';
import Dashboard from './pages/chat/Dashboard'
import Navbar from './components/nav/Navbar'
import SideNav from './components/nav/SideNav';
import './css/general.css'
import './css/inbox.css'
import './css/profile.css'
import './css/buttons-inputs.css'
import './css/errors-success.css'
import './css/forms.css'
import './css/loader.css'
import './css/chat.css'
import './css/threads.css'

function App() {
  return (
    <div className="App">
    <Navbar/>
    <BrowserRouter>
    <div className='app-container'>
      <AuthProvider>
      <InboxProvider>
      <PrivateSocketProvider>
      <SideNav/>
      <Routes>
x
          <Route exact path='/' element={<LoginSignup/>}></Route>
          <Route path='/login' element={<LoginSignup/>}></Route>
          <Route path='/signup' element={<LoginSignup/>}></Route>

          <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}></Route>
          <Route path='/chat/:threadID' element={<PrivateRoute><PrivateThread/></PrivateRoute>}></Route>
      </Routes>
      </PrivateSocketProvider>
      </InboxProvider>
      </AuthProvider>
      </div>
     </BrowserRouter>
    </div>

  );
}

export default App;
