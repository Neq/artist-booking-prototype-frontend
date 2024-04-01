// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import ArtistList from './components/Artist/ArtistList';
import ArtistForm from './components/Artist/ArtistForm';


function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [artists, setArtists] = useState([]);

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

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    try {
      const response = await axios.get('http://localhost:8080/artists');
      setArtists(response.data._embedded.artistList);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addArtist = async (artistData) => {
    try {
      const response = await axios.post('http://localhost:8080/artists', {
        name: artistData.newArtistName,
        management: artistData.newArtistManagement,
        email: artistData.newArtistEmail,
        completed: false 
      });
      setArtists([...artists, response.data]);      
    } catch (error) {
      console.error('Error adding new Artist:', error);
    }
  };

  const deleteArtist = async (artistId) => {
    try {
      await axios.delete(`http://localhost:8080/artists/${artistId}`);
      setArtists(artists.filter(artist => artist.id !== artistId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  
  return (
    <div className="App">
      {isLoggedIn ? (
        <div>
          <h1>Welcome, {username}!</h1>
          <h1>Artist Manager</h1>
          <div>
            <ArtistList artists={artists} onDelete={deleteArtist} />
            <ArtistForm onSubmit={addArtist} />

            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
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
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
}

export default App;