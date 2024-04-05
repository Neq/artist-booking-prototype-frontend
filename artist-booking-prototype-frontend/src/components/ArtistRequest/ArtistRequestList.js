/*class ArtistList extends React.Component {
    return() {
        const artists = this.props.artists.map(artist =>
            <Artist key={artist._links.self.href} artist={artist}/>
        );
        return (
            <div>
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
            <button onClick={addArtist}>Add Artist</button>
          </div>
          <ul>
            {artists.map(artist => (
              <li key={artist.id}>
                {artist.name} {artist.management} {artist.email}
                <button onClick={() => deleteArtist(artist.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )
    }
}*/

// ArtistList.js
import React from 'react';
import ArtistRequestItem from './ArtistRequestItem';

function ArtistRequestList({ artistRequests, onDelete }) {
  return (
    <ul>
      {artistRequests.map(artistRequest => (
        <ArtistRequestItem key={artistRequest.id} artistRequest={artistRequest} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default ArtistRequestList;