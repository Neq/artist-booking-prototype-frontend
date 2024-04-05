// App.js
import React, { useState } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Artist from './components/Artist/Artist';
import ArtistRequest from './components/ArtistRequest/ArtistRequest';


function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true);  

  const handleLogin = () => {
    // Simple auth, replace with more sophisticated solution later
    if (username === 'user' && password === 'password') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  
  return (
    <div className="App">
        
<nav className="navbar navbar-light bg-light p-3">
  <div className="d-flex col-12 col-md-3 col-lg-2 mb-2 mb-lg-0 flex-wrap flex-md-nowrap justify-content-between">
      <a className="navbar-brand" href="#">
          WoF Booking Prototyp
      </a>
      <button className="navbar-toggler d-md-none collapsed mb-3" type="button" data-toggle="collapse" data-target="#sidebar" aria-controls="sidebar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
      </button>
  </div>
  <div className="col-12 col-md-4 col-lg-2">
      <input className="form-control form-control-dark" type="text" placeholder="Search" aria-label="Search" />
  </div>
  <div className="col-12 col-md-5 col-lg-8 d-flex align-items-center justify-content-md-end mt-3 mt-md-0">
      <div className="mr-3 mt-1">
          
      </div>
      <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
            Hello, {username}
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li><a className="dropdown-item" href="#">Settings</a></li>
            <li><a className="dropdown-item" href="/artistRequests">Messages</a></li>
            <li><a className="dropdown-item" href="#">Sign out</a></li>
          </ul>
        </div>
  </div>
</nav>
  
<div className="container-fluid">
  <div className="row">
      <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">  
           
<div className="position-sticky pt-md-5">
  <ul className="nav flex-column">
      <li className="nav-item">
        <a className="nav-link active" aria-current="page" href="#">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          <span className="ml-2">Dashboard</span>
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-file"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
          <span className="ml-2">Artists</span>
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/artistRequests">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-shopping-cart"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          <span className="ml-2">Events & Anfragen</span>
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          <span className="ml-2">Verträge</span>
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-bar-chart-2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
          <span className="ml-2">Kalender</span>
        </a>
      </li>      
    </ul>
</div>
  

      </nav>
      <main className="col-md-9 ml-sm-auto col-lg-10 px-md-4 py-4">
          <h1 className="h2">Dashboard</h1>

          {isLoggedIn ? (
        <Router>
        <div>
          <h1>Welcome, {username}!</h1>
          
          <div>
            <Routes>
              <Route path="/" element={<Artist /> } />
              <Route path="/artistRequests" element={<ArtistRequest /> } />
            </Routes>

            
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </div>
        </Router>
      ) : (
        <div>
          <h1>Login</h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <Button onClick={handleLogin}>Login</Button>
        </div>
      )}

          </main>
  </div>
</div>
  

  

      
    </div>
    
  );
}

export default App;