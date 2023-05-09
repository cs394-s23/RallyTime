import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './Landing'
import Dashboard from './Dashboard/Dashboard';
import Fanclub from './Fanclub/Fanclub'
import AddClub from './AddClub/AddClub';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/addclub" element={<AddClub />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/fanclub" element={<Fanclub />}>
          <Route path="/fanclub/:docid" element={<Fanclub />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App;
