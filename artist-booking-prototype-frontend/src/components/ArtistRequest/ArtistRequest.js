// components/ArtistRequest/ArtistRequest.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ArtistRequest() {
    const [artistRequests, setArtistRequests] = useState([]);
    const [artists, setArtists] = useState([]);
    const [newRequest, setNewRequest] = useState({        
        artistId: '',
        eventStart: '',
        eventEnd: '',
        details: ''
    });
    const [offerStatus, setOfferStatus] = useState([])
    const [editRequest, setEditRequest] = useState(null);

    useEffect(() => {
        fetchOfferStatus();
        fetchArtists();
        fetchArtistRequests();        
    }, []);

    const fetchArtists = async () => {
        try {
            const response = await axios.get('http://localhost:8080/artists');
            setArtists(response.data);
        } catch (error) {
            console.error('Error fetching artists:', error);
        }
    };


    const fetchArtistRequests = async () => {
        try {
            const response = await axios.get('http://localhost:8080/artistRequests');
            setArtistRequests(response.data);
        } catch (error) {
            console.error('Error fetching artist requests:', error);
        }
    };

    const fetchOfferStatus = async() => {
        try {
            const response = await axios.get('http://localhost:8080/offerStatus');
            setOfferStatus(response.data);
        } catch (error) {
            console.error('Error fetching offerStatus:', error);
        }
    }

    const createArtistRequest = async () => {
        try {
            await axios.post('http://localhost:8080/artistRequests', newRequest);
            fetchArtistRequests();
            setNewRequest({                
                artistId: '',
                eventStart: '',
                eventEnd: '',
                details: ''
            });
        } catch (error) {
            console.error('Error creating artist request:', error);
        }
    };

    const updateArtistRequest = async () => {
        try {
            await axios.put(`http://localhost:8080/artistRequests/${editRequest.id}`, editRequest);
            fetchArtistRequests();
            setEditRequest(null);
        } catch (error) {
            console.error('Error updating artist request:', error);
        }
    };

    const deleteArtistRequest = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/artistRequests/${id}`);
            fetchArtistRequests();
        } catch (error) {
            console.error('Error deleting artist request:', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewRequest({ ...newRequest, [name]: value });
    };

    const handleEditInputChange = (event) => {
        const { name, value } = event.target;
        setEditRequest({ ...editRequest, [name]: value });
    };

    const handleEditClick = (request) => {
        setEditRequest(request);
    };

    const handleCancelEdit = () => {
        setEditRequest(null);
    };

    return (
        <div>
            <h2>Artist Requests</h2>
            <div>
                <h3>Create Request</h3>      
                <label>
        Artist:
        <select name="artistId" value={newRequest.artistId} onChange={handleInputChange}>
          <option value="">Select Artist</option>
          {artists.map(artist => (
            <option key={artist.id} value={artist.id}>{artist.name}</option>
          ))}
        </select>
      </label>          
                <input type="text" name="eventStart" placeholder="Event Start" value={newRequest.eventStart} onChange={handleInputChange} />
                <input type="text" name="eventEnd" placeholder="Event End" value={newRequest.eventEnd} onChange={handleInputChange} />
                <input type="text" name="details" placeholder="Details" value={newRequest.details} onChange={handleInputChange} />
                <button onClick={createArtistRequest}>Create</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Artist ID</th>
                        <th>Event Start</th>
                        <th>Event End</th>
                        <th>Details</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {artistRequests.map(request => (
                        <tr key={request.id}>
                            <td>{request.id}</td>
                            <td>{request.artistId}</td>
                            <td>{request.eventStart}</td>
                            <td>{request.eventEnd}</td>
                            <td>{request.details}</td>
                            <td>{offerStatus[request.offerStatusId].color}
                                
                            </td>
                            <td>
                                {editRequest && editRequest.id === request.id ? (
                                    <div>
                                        <button onClick={updateArtistRequest}>Save</button>
                                        <button onClick={handleCancelEdit}>Cancel</button>
                                    </div>
                                ) : (
                                    <div>
                                        <button onClick={() => handleEditClick(request)}>Edit</button>
                                        <button onClick={() => deleteArtistRequest(request.id)}>Delete</button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ArtistRequest;