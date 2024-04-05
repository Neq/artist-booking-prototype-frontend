// TaskForm.js
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

function TaskForm({ onSubmit }) {
  const [newArtistName, setNewArtistName] = useState('');
  const [newArtistManagement, setNewArtistManagement] = useState('');
  const [newArtistEmail, setNewArtistEmail] = useState('');
  const [newArtistCountry, setNewArtistCountry] = useState('');
  const [newArtistAddress, setNewArtistAddress] = useState('');
  const [newArtistZipCode, setNewArtistZipCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ newArtistName, newArtistManagement, newArtistEmail });
    setNewArtistName('');
    setNewArtistManagement('');
    setNewArtistEmail('');
    setNewArtistCountry('');
    setNewArtistAddress('');
    setNewArtistZipCode('');
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
            <Button type="submit">K&uuml;stler hinzuf&uuml;gen</Button>      
    </form>
  );
}

export default TaskForm;