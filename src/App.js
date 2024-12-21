import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomePage from './components/Home';
import ChangeBoxColor from './components/ChangeBoxColor';
 
import Body from './components/Body';
import ProgressBar from './components/ProgressBar';
import TableChallenge from './components/TableChallenge';
import Timer from './components/Timer';
import TODOList from './components/TODOList';
import './App.css'
import Pagination from './components/Pagination';

function App() {
  return (
    <BrowserRouter basename='/'>
      <Routes>
        {/* Root layout with Outlet */}
        <Route path="/" element={<Body />}>
          <Route path='/' element={<HomePage />} /> {/* Default child route */}
          <Route path="/change-color/:id" element={<ChangeBoxColor />} />
          <Route path='/Progress-bar/:id' element={<ProgressBar/>} />
          <Route path='/table-challenge/:id' element={<TableChallenge/>} />
          <Route path='/timer/:id' element={<Timer/>} />
          <Route path='/to-do-list/:id' element={<TODOList/>} />
          <Route path='/pagination/:id' element={<Pagination/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
