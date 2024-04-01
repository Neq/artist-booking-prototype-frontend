// TaskForm.js
import React, { useState } from 'react';

function TaskForm({ onSubmit }) {
  const [newArtistName, setNewArtistName] = useState('');
  const [newArtistManagement, setNewArtistManagement] = useState('');
  const [newArtistEmail, setNewArtistEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ newArtistName, newArtistManagement, newArtistEmail });
    setNewArtistName('');
    setNewArtistManagement('');
    setNewArtistEmail('');
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
            <Button type="submit">Add Artist</Button>
      <Button type="submit">Add Task</Button>
    </form>
  );
}

export default TaskForm;