import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AddExpensePage from './pages/AddExpensePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ExpenseDetails from './components/ExpenseDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path='/AddExpensePage' element={<AddExpensePage />}/>
            <Route path='/expenses/:id' element={<ExpenseDetails />}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
