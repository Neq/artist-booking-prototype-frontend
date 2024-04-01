// ArtistItem.js
import React from 'react';
import Button from 'react-bootstrap/Button';

function ArtistItem({ artist, onDelete }) {
  return (
    <li key={artist.id}>
        {artist.name} {artist.management} {artist.email}
        <Button onClick={() => onDelete(artist.id)}>Delete</Button>
    </li>
  );
}

export default ArtistItem;