import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import { AuthContext } from './context/AuthContext.jsx';
import { useContext } from 'react';
import Messenger from './pages/messenger/Messenger';
import RegisterContinue from './pages/registerContinue/RegisterContinue';

const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          {user ? <Home /> : <Login />}
        </Route>
        <Route path='/login'>
          { user ? <Redirect to='/' /> : <Login /> }
        </Route>
        <Route path='/register/continue'>
          {user ? <Redirect to='/' /> : <RegisterContinue />}
        </Route>
        <Route path='/register'>
          {user ? <Redirect to='/' /> : <Register />}
        </Route>
        <Route path='/profile/:username'>
          {user ? <Profile /> : <Redirect to='/login' />}
        </Route>
        <Route path='/messenger'>
          {user ? <Messenger /> : <Redirect to='/login' />}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
