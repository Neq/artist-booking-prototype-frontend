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
import ArtistItem from './ArtistItem';

function ArtistList({ artists, onDelete }) {
  return (

    <div class="col-12 col-xl-8 mb-4 mb-lg-0">
                        <div class="card">
                            <h5 class="card-header">K&uuml;stler</h5>
                            <div class="card-body">
                                <div class="table-responsive">                                
                                    <table class="table">
                                        <thead>
                                          <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Artist Management</th>
                                            <th scope="col">Artist Email</th>
                                            <th scope="col">Land</th>
                                            <th scope="col">Addresse</th>                                            
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {artists.map(artist => (
                                            <tr>
                                            <th scope="row">{artist.name}</th>                                            
                                            <td>{artist.management}</td>
                                            <td>{artist.email}</td>
                                            <td>{artist.country}</td>
                                            <td>{artist.address}</td>
                                            <td>{artist.contractTemplateId}</td>
                                            <td><a href="#" class="btn btn-sm btn-primary">View</a></td>
                                            <button onClick={() => onDelete(artist.id)}>L&ouml;schen</button>
                                          </tr>
                                          ))}                                         
                                        </tbody>
                                      </table>
                                </div>
                                <a href="#" class="btn btn-block btn-light">View all</a>
                            </div>
                        </div>
                    </div>    
  );
}

export default ArtistList;