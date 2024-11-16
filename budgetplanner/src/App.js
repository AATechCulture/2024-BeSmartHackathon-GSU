import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppNavbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import BudgetingPage from './components/budgeting';
import InvestmentPage from './components/investment';
import { Navbar } from 'react-bootstrap';
import Login from './components/SignUp';

function App() {
  return (
    <Router>
      <div className="w-100">
        <AppNavbar />
        <div className="content mt-5">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/budgeting" element={<BudgetingPage />} />
          <Route path="/SignUp" element={<Login/>} />
          <Route path="/investment" element={<InvestmentPage />} />
        </Routes>
        </div>
        <Footer />
      </div>
  </Router>
  );
}


export default App;
