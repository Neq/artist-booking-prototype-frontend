// ArtistItem.js
import React from 'react';

function ArtistItem({ artist, onDelete }) {
  return (
    <li key={artist.id}>
        {artist.name} {artist.management} {artist.email}
        <button onClick={() => onDelete(artist.id)}>Delete</button>
    </li>
  );
}

export default ArtistItem;