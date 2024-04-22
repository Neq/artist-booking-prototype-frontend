// components/ArtistRequest/ArtistRequest.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ArtistRequest() {
    const [artistRequests, setArtistRequests] = useState([]);
    const [artists, setArtists] = useState([]);
    const [newRequest, setNewRequest] = useState({        
        artistId: '',
        eventName: '',
        eventStart: '',
        eventEnd: '',
        notes: '',
        offerStatusId: '',
        locationName: '',
        locationWebsite: '',
        price: '',
        invoiceAddress: '',
        invoiceCountry: '',
        invoiceName: '',
        invoiceZipCode: '',
        invoicePlace: ''
    });
    const [offerStatus, setOfferStatus] = useState([])
    const [editRequest, setEditRequest] = useState(null);

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
                eventName: '',
                eventStart: '',
                eventEnd: '',
                notes: '',
                offerStatusId: '',
                locationName: '',
                locationWebsite: '',
                price: '',
                invoiceAddress: '',
                invoiceCountry: '',
                invoiceName: '',
                invoiceZipCode: '',
                invoicePlace: ''
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

    const handleSubmit = (e) => {
        e.preventDefault();
        createArtistRequest();
      };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        updateArtistRequest();
    }

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

    useEffect(() => {
        fetchOfferStatus();
        fetchArtists();
        fetchArtistRequests();        
    }, []);
    
    return (
            <div class="row">
    <div class="col-12 col-xl-8 mb-4 mb-lg-0">
    <div class="row my-4">
            <div class="col-12">
                        <div class="card">
                            <h5 class="card-header">K&uuml;stleranfragen</h5>
                            <div class="card-body">
                                <div class="table-responsive">                                
                                    <table class="table">
                                        <thead>
    
                    <tr>
                        <th>ID</th>
                        <th>K&uuml;stler</th>
                        <th>Event Start</th>
                        <th>Event End</th>
                        <th>Notizen</th>                        
                        <th>Status</th>
                        <th>Location</th>
                        <th>Location Website</th>
                    </tr>
                </thead>
                <tbody>
                    {artistRequests.map(request => (
                        <tr key={request.id}>
                            <td>{request.id}</td>
                            <td>{artists.find(obj => obj.id === request.artistId).name}</td>
                            <td>{request.eventStart}</td>
                            <td>{request.eventEnd}</td>
                            <td>{request.notes}</td>
                            <td>{offerStatus[request.offerStatusId-1].status}</td>
                            <td>{request.locationName}</td>
                            <td>{request.locationWebsite}</td>
                            
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
            </div>
            </div>
            </div>
            </div>


    <div class="card">
      <h5 class="card-header">K&uuml;stleranfragen hinzuf&uuml;gen</h5>
      <div class="card-body">
        {editRequest == null ? ( 
            <form class="row g-3" onSubmit={handleSubmit}>
                <div class="col-md-6">                     
                    <label for="newRequestArtistId" class="form-label">K&uuml;nstler</label>                
                    <select class="form-select" id="newRequestArtistId" name="artistId" value={newRequest.artistId} onChange={handleInputChange}>
                    <option value="">K&uuml;stler ausw&auml;hlen</option>
                    {artists.map(artist => (
                        <option key={artist.id} value={artist.id}>{artist.name}</option>
                    ))}
                    </select>
                </div>
                <div class="col-md-6">        
                    <label for="newRequestOfferStatusId" class="form-label">Status</label>                
                    <select class="form-select" id="newRequestOfferStatusId" name="offerStatusId" value={newRequest.offerStatusId} onChange={handleInputChange}>
                    <option value="">Status</option>
                    {offerStatus.map(offerStatusItem => (
                        <option key={offerStatusItem.id} value={offerStatusItem.id}>{offerStatusItem.status}</option>
                    ))}
                    </select>      
                </div>
                <div class="col-md-6">
                    <label for="newRequestEventStart" class="form-label">Event Start</label>                
                    <input class="form-control" type="datetime-local" name="eventStart" placeholder="Event Start" value={newRequest.eventStart} onChange={handleInputChange} required />
                </div>
                <div class="col-md-6">
                    <label for="newRequestEventEnd" class="form-label">Event End</label>                
                    <input class="form-control" type="datetime-local" name="eventEnd" placeholder="Event End" value={newRequest.eventEnd} onChange={handleInputChange} required />
                </div>
                <div class="col-md-6">
                    <label for="newRequestEventName" class="form-label">Name des Events</label>                
                    <input class="form-control" type="text" name="eventName" placeholder="Eventname" value={newRequest.eventName} onChange={handleInputChange} required />
                </div>
                <div class="col-md-6">
                    <label for="newRequestNotes" class="form-label">Notizen</label>                
                    <textarea class="form-control" type="text" name="notes" placeholder="Notes" value={newRequest.notes} onChange={handleInputChange} />
                </div>
                <div class="col-md-6">
                    <label for="newRequestLocationName" class="form-label">Location Name</label>                
                    <input class="form-control" type="text" name="locationName" placeholder="Name der Location" value={newRequest.locationName} onChange={handleInputChange} required />
                </div>
                <div class="col-md-6">
                    <label for="newRequestLocationWebsite" class="form-label">Location Website</label>                
                    <input class="form-control" type="text" name="locationWebsite" placeholder="Website der Location" value={newRequest.locationWebsite} onChange={handleInputChange} />                    
                </div>
                <div class="col-md-6">
                    <label for="newRequestInvoiceAddress" class="form-label">Rechnungsadresse</label>                
                    <input class="form-control" type="text" name="invoiceAddress" placeholder="Rechnungsadresse" value={newRequest.invoiceAddress} onChange={handleInputChange} />                    
                </div>
                <div class="col-md-6">
                    <label for="newRequestInvoicePlz" class="form-label">Rechnungs PLZ</label>                
                    <input class="form-control" type="text" name="invoiceZipCode" placeholder="PLZ der Rechnung" value={newRequest.invoiceZipCode} onChange={handleInputChange} />                    
                </div>
                <div class="col-md-6">
                    <label for="newRequestInvoiceCountry" class="form-label">Rechnungs Land</label>                
                    <input class="form-control" type="text" name="invoiceCountry" placeholder="Land der Rechnung" value={newRequest.invoiceCountry} onChange={handleInputChange} />                    
                </div>
                <div class="col-md-6">
                    <label for="newRequestInvoiceName" class="form-label">Name der Rechnung</label>                
                    <input class="form-control" type="text" name="invoiceName" placeholder="Name der Rechnung" value={newRequest.invoiceName} onChange={handleInputChange} />                    
                </div>
                <div class="col-md-6">
                    <label for="newRequestInvoicePlace" class="form-label">Rechnungs Ort</label>                
                    <input class="form-control" type="text" name="invoicePlace" placeholder="Ort der Rechnung" value={newRequest.invoicePlace} onChange={handleInputChange} />                    
                </div>
                <div class="col-md-6">
                    <label for="newRequestPrice" class="form-label">Preis der Provision</label>                
                    <input class="form-control" type="number" name="price" placeholder="Preis der Rechnung" value={newRequest.price} onChange={handleInputChange} />                    
                </div>
                <div class="col-12">
                    <button class="btn btn-primary" type="submit">Hinzuf&uuml;gen</button>
                </div>
            </form>
        ) : (
            <form class="row g-3" onSubmit={handleEditSubmit}>
                <div class="col-md-6">                     
                    <label for="editRequestArtistId" class="form-label">K&uuml;nstler</label>                
                    <select class="form-select" id="editRequestArtistId" name="artistId" value={editRequest.artistId} onChange={handleEditInputChange}>
                    <option value="">K&uuml;stler editieren</option>
                    {artists.map(artist => (
                        <option key={artist.id} value={artist.id}>{artist.name}</option>
                    ))}
                    </select>
                </div>
                <div class="col-md-6">        
                    <label for="editRequestOfferStatusId" class="form-label">Status</label>                
                    <select class="form-select" id="editRequestOfferStatusId" name="offerStatusId" value={editRequest.offerStatusId} onChange={handleEditInputChange}>
                    <option value="">Status</option>
                    {offerStatus.map(offerStatusItem => (
                        <option key={offerStatusItem.id} value={offerStatusItem.id}>{offerStatusItem.status}</option>
                    ))}
                    </select>      
                </div>
                <div class="col-md-6">
                    <label for="editRequestEventStart" class="form-label">Event Start</label>                
                    <input class="form-control" type="datetime-local" name="eventStart" placeholder="Event Start" value={editRequest.eventStart} onChange={handleEditInputChange} required />
                </div>
                <div class="col-md-6">
                    <label for="editRequestEventEnd" class="form-label">Event End</label>                
                    <input class="form-control" type="datetime-local" name="eventEnd" placeholder="Event End" value={editRequest.eventEnd} onChange={handleEditInputChange} required />
                </div>
                <div class="col-md-6">
                    <label for="newRequestEventName" class="form-label">Name des Events</label>                
                    <input class="form-control" type="text" name="eventName" placeholder="Eventname" value={newRequest.eventName} onChange={handleInputChange} required />
                </div>
                <div class="col-md-6">
                    <label for="editRequestNotes" class="form-label">Notizen</label>                
                    <textarea class="form-control" type="text" name="notes" placeholder="Notes" value={editRequest.notes} onChange={handleEditInputChange} />
                </div>
                <div class="col-md-6">
                    <label for="editRequestLocationName" class="form-label">Location Name</label>                
                    <input class="form-control" type="text" name="locationName" placeholder="Name der Location" value={editRequest.locationName} onChange={handleEditInputChange} required />
                </div>
                <div class="col-md-6">
                    <label for="editRequestLocationWebsite" class="form-label">Location Website</label>                
                    <input class="form-control" type="text" name="locationWebsite" placeholder="Website der Location" value={editRequest.locationWebsite} onChange={handleEditInputChange} />                    
                </div>
                <div class="col-md-6">
                    <label for="newRequestInvoiceAddress" class="form-label">Rechnungsadresse</label>                
                    <input class="form-control" type="text" name="invoiceAddress" placeholder="Rechnungsadresse" value={editRequest.invoiceAddress} onChange={handleEditInputChange} />                    
                </div>
                <div class="col-md-6">
                    <label for="newRequestInvoicePlz" class="form-label">Rechnungs PLZ</label>                
                    <input class="form-control" type="text" name="invoicePlz" placeholder="PLZ der Rechnung" value={editRequest.invoicePlz} onChange={handleEditInputChange} />                    
                </div>
                <div class="col-md-6">
                    <label for="newRequestInvoiceCountry" class="form-label">Rechnungs Land</label>                
                    <input class="form-control" type="text" name="invoiceCountry" placeholder="Land der Rechnung" value={editRequest.invoiceCountry} onChange={handleEditInputChange} />                    
                </div>
                <div class="col-md-6">
                    <label for="newRequestInvoiceName" class="form-label">Name der Rechnung</label>                
                    <input class="form-control" type="text" name="invoiceName" placeholder="Name der Rechnung" value={editRequest.invoiceName} onChange={handleEditInputChange} />                    
                </div>
                <div class="col-md-6">
                    <label for="newRequestInvoicePlace" class="form-label">Rechnungs Ort</label>                
                    <input class="form-control" type="text" name="invoicePlace" placeholder="Ort der Rechnung" value={editRequest.invoicePlace} onChange={handleEditInputChange} />                    
                </div>
                <div class="col-md-6">
                    <label for="newRequestPrice" class="form-label">Preis der Provision</label>                
                    <input class="form-control" type="number" name="price" placeholder="Preis der Rechnung" value={editRequest.price} onChange={handleEditInputChange} />                    
                </div>
                <div class="col-12">
                    <button class="btn btn-primary" type="submit">&Auml;nderungen speichern</button>
                </div>
            </form>
        )}
        </div>                     

                
            </div>
            
            
            </div>
        </div>
    );
}

export default ArtistRequest;