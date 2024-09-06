import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import UserDetail from './components/UserDetail';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import 'bootstrap-icons/font/bootstrap-icons.css'; // Bootstrap Icons

function App() {
  return (
    <Router basename="/usermanagement">
      <div className="App">
        <Routes>
          {/* Home Route */}
          <Route path="/" element={<Home />} />
          
          {/* User Detail Route */}
          <Route path="/user/:id" element={<UserDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
