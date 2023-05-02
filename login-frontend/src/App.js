import Login from './components/login';
import Home from './pages/home'
import appStyles from './styles/App.module.css'

function App() {
  return (
    <div className={appStyles.wrapper}>
      {/* <Login/> */}
      <Home/>

    </div>
  );
}

export default App;
