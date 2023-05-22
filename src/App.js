import './index.css';
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom'
import Main from './pages/Main';
import Login from './pages/Login';
import LoggedIn from './pages/loggedIn/LoggedIn';
import Optionbar from './components/Optionbar';
import CreateForm from './pages/loggedIn/CreateForm';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Main/>} />
          <Route path='/logged' element={<LoggedIn/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/createPost' element={<CreateForm/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
