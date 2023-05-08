import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LandingPage from './Landing'
import Dashboard from './Dashboard/Dashboard';
import Chat from './Chat/Chat'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/chat" element={<Chat />}/>

      </Routes>
    </Router>
  )
}

export default App;
