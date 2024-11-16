import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppNavbar from './components/Navbar';
import Overview from './pages/Overview';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import { Navbar } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <div className="w-100">
        <AppNavbar />
        <div className="content mt-5">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/*<Route path="/budgeting" element={<Budgeting />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/investment" element={<Investment />} />*/}
        </Routes>
        </div>
        
        <Footer />
      </div>
  </Router>
  );
}


export default App;
