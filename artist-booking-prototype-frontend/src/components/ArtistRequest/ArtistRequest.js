// components/ArtistRequest/ArtistRequest.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ArtistRequest() {
    const [artistRequests, setArtistRequests] = useState([]);
    const [newRequest, setNewRequest] = useState({
        artistId: '',
        eventStart: '',
        eventEnd: '',
        details: ''
    });
    const [editRequest, setEditRequest] = useState(null);

    useEffect(() => {
        fetchArtistRequests();
    }, []);

    const fetchArtistRequests = async () => {
        try {
            const response = await axios.get('http://localhost:8080/artistRequests');
            setArtistRequests(response.data);
        } catch (error) {
            console.error('Error fetching artist requests:', error);
        }
    };

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
                <input type="text" name="artistId" placeholder="Artist ID" value={newRequest.artistId} onChange={handleInputChange} />
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