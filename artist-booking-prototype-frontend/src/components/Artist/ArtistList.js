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
                            <h5 class="card-header">Latest transactions</h5>
                            <div class="card-body">
                                <div class="table-responsive">
                                <ul>
      {artists.map(artist => (
        <ArtistItem key={artist.id} artist={artist} onDelete={onDelete} />
      ))}
    </ul>
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
                                            <th scope="row">17371705</th>
                                            <td>{artist.name}</td>
                                            <td>{artist.management}</td>
                                            <td>{artist.email}</td>
                                            <td>{artist.country}</td>
                                            <td>{artist.address}</td>                                            
                                            <td><a href="#" class="btn btn-sm btn-primary">View</a></td>
                                            <button onClick={() => onDelete(artist.id)}>L&ouml;schen</button>
                                          </tr>
                                          ))}
                                          <tr>
                                            <th scope="row">17371705</th>
                                            <td>Volt Premium Bootstrap 5 Dashboard</td>
                                            <td>johndoe@gmail.com</td>
                                            <td>€61.11</td>
                                            <td>Aug 31 2020</td>
                                            <td><a href="#" class="btn btn-sm btn-primary">View</a></td>
                                          </tr>
                                          <tr>
                                            <th scope="row">17370540</th>
                                            <td>Pixel Pro Premium Bootstrap UI Kit</td>
                                            <td>jacob.monroe@company.com</td>
                                            <td>$153.11</td>
                                            <td>Aug 28 2020</td>
                                            <td><a href="#" class="btn btn-sm btn-primary">View</a></td>
                                          </tr>
                                          <tr>
                                            <th scope="row">17371705</th>
                                            <td>Volt Premium Bootstrap 5 Dashboard</td>
                                            <td>johndoe@gmail.com</td>
                                            <td>€61.11</td>
                                            <td>Aug 31 2020</td>
                                            <td><a href="#" class="btn btn-sm btn-primary">View</a></td>
                                          </tr>
                                          <tr>
                                            <th scope="row">17370540</th>
                                            <td>Pixel Pro Premium Bootstrap UI Kit</td>
                                            <td>jacob.monroe@company.com</td>
                                            <td>$153.11</td>
                                            <td>Aug 28 2020</td>
                                            <td><a href="#" class="btn btn-sm btn-primary">View</a></td>
                                          </tr>
                                          <tr>
                                            <th scope="row">17371705</th>
                                            <td>Volt Premium Bootstrap 5 Dashboard</td>
                                            <td>johndoe@gmail.com</td>
                                            <td>€61.11</td>
                                            <td>Aug 31 2020</td>
                                            <td><a href="#" class="btn btn-sm btn-primary">View</a></td>
                                          </tr>
                                          <tr>
                                            <th scope="row">17370540</th>
                                            <td>Pixel Pro Premium Bootstrap UI Kit</td>
                                            <td>jacob.monroe@company.com</td>
                                            <td>$153.11</td>
                                            <td>Aug 28 2020</td>
                                            <td><a href="#" class="btn btn-sm btn-primary">View</a></td>
                                          </tr>
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