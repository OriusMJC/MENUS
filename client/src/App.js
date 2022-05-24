import './App.css';
import {Routes,Route} from 'react-router-dom'
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import RecipeDetails from './components/RecipeDetails';
import RecipeCreate from './components/RecpieCreate'

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<LandingPage/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/recipe/:idRecipe' element={<RecipeDetails/>}/>
      <Route path='/recipecreate' element={<RecipeCreate/>}/>
    </Routes>
  );
}

export default App;
