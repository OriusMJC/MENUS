import './App.css';
import {Routes,Route} from 'react-router-dom'
import LandingPage from './components/LandingPage';
import Home from './components/Home';

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<LandingPage/>}/>
      <Route path='/home' element={<Home/>}/>
    </Routes>
  );
}

export default App;
