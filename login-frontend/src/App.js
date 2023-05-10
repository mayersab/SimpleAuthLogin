import Register from './components/register';
import Home from './pages/home'
import appStyles from './styles/App.module.css'
import Posts from './components/posts';
import Login from './components/login';
import CreatePost from './components/createPost';
import EditPost from './components/editPost';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const {user} = useAuthContext()
  return (
    <div className={appStyles.wrapper}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={user ? <Home/> : <Login/>} />
          <Route path='/login' element={ user ? <Home/> : <Login/>} />
          <Route path='/register' element={user ? <Home/> : <Register/>} />
          <Route path='/create' element={user ? <CreatePost/> : <Login/>} />
          <Route path='/:id' element={user ? <EditPost/>  : <Login/>} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
