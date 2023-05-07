import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LandingPage from './Landing'
import Dashboard from './Dashboard/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
      </Routes>
    </Router>
  )
}

export default App;
