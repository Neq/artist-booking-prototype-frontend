// TaskForm.js
import React, { useState } from 'react';

function TaskForm({ onSubmit }) {
  const [newArtistName, setNewArtistName] = useState('');
  const [newArtistManagement, setNewArtistManagement] = useState('');
  const [newArtistEmail, setNewArtistEmail] = useState('');
  const [newArtistCountry, setNewArtistCountry] = useState('');
  const [newArtistAddress, setNewArtistAddress] = useState('');
  const [newArtistZipCode, setNewArtistZipCode] = useState('');
  const [newArtistFirstname, setNewArtistFirstname] = useState('');
  const [newArtistLastname, setNewArtistLastname] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ newArtistName, newArtistManagement, newArtistEmail, newArtistAddress, newArtistZipCode, newArtistCountry, newArtistFirstname, newArtistLastname });
    setNewArtistName('');
    setNewArtistManagement('');
    setNewArtistEmail('');
    setNewArtistCountry('');
    setNewArtistAddress('');
    setNewArtistZipCode('');
    setNewArtistFirstname('');
    setNewArtistLastname('');
  };

  return (
    <form onSubmit={handleSubmit}>
       <input
              type="text"
              placeholder="Enter artist name"
              value={newArtistName}
              onChange={(e) => setNewArtistName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter artist management"
              value={newArtistManagement}
              onChange={(e) => setNewArtistManagement(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter artist email"
              value={newArtistEmail}
              onChange={(e) => setNewArtistEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Artist country"
              value={newArtistCountry}
              onChange={(e) => setNewArtistCountry(e.target.value)}
            />
            <input
              type="text"
              placeholder="Artist address"
              value={newArtistAddress}
              onChange={(e) => setNewArtistAddress(e.target.value)}
            />
            <input
              type="text"
              placeholder="Artist zip code"
              value={newArtistZipCode}
              onChange={(e) => setNewArtistZipCode(e.target.value)}
            />
            <input
              type="text"
              placeholder="Artist firstname"
              value={newArtistFirstname}
              onChange={(e) => setNewArtistFirstname(e.target.value)}
            />
            <input
              type="text"
              placeholder="Artist lastname"
              value={newArtistLastname}
              onChange={(e) => setNewArtistLastname(e.target.value)}
            />
            <button type="submit">K&uuml;stler hinzuf&uuml;gen</button>      
    </form>
  );
}

export default TaskForm;