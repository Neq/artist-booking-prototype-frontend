// ArtistRequestItem.js
import React from 'react';

function ArtistRequestItem({ artistRequest, onDelete }) {
  return (
    <li key={artistRequest.id}>
        {artistRequest.name} {artist.management} {artist.email}
        <Button onClick={() => onDelete(artist.id)}>Delete</Button>
    </li>
  );
}

export default ArtistItem;