// components/Artist/Artist.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArtistList from './ArtistList';
import ArtistForm from './ArtistForm';

function Artist() {

    const [contractTemplates, setContractTemplates] = useState([]);
    const [invoiceTemplates, setInvoiceTemplates] = useState([]);
    const [artists, setArtists] = useState([]);
    const [newArtist, setNewArtist] = useState({
        name: '',
        management: '',
        managementEmail: '',
        managementPhone: '',
        email: '',
        country: '',
        address: '',
        zipCode: '',
        firstname: '',
        lastname: '',
        phone: '',
        contractTemplateId: '',
        invoiceTemplateId: ''
    });
    const [editArtist, setEditArtist] = useState(null);
    const [artistFiles, setArtistFiles] = useState([]);
    
    const fetchArtists = async () => {
        try {
            const response = await axios.get('http://localhost:8080/artists');
            setArtists(response.data);            
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const createArtist = async (artistData) => {
        try {
            const response = await axios.post('http://localhost:8080/artists', newArtist);
            setArtists([...artists, response.data]);      
            setNewArtist({
              name: '',
              management: '',
              managementEmail: '',
              managementPhone: '',
              email: '',
              country: '',
              address: '',
              zipCode: '',
              firstname: '',
              lastname: '',
              phone: '',
              contractTemplateId: '',
              invoiceTemplateId: ''
          });
        } catch (error) {
            console.error('Error adding new Artist:', error);
        }
    };

    const deleteArtist = async (artistId) => {
        try {
            await axios.delete(`http://localhost:8080/artists/${artistId}`);
            setArtists(artists.filter(artist => artist.id !== artistId));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const updateArtist = async () => {
        try {
            await axios.put(`http://localhost:8080/artists/${editArtist.id}`, editArtist);
            fetchArtists();
            setEditArtist(null);
        } catch (error) {
            console.error('Error updating artist request:', error);
        }
    };

    const handleEditClick = (request) => {
        setEditArtist(request);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewArtist({ ...newArtist, [name]: value });
    };

    const handleEditInputChange = (event) => {
        const { name, value } = event.target;
        setEditArtist({ ...editArtist, [name]: value });
    };

    const fetchContractTemplates = async () => {
        try {
            const response = await axios.get('http://localhost:8080/contractTemplates');
            setContractTemplates(response.data);
        } catch (error) {
            console.error('Error fetching contract templates:', error);
        }
    };

    const fetchInvoiceTemplates = async () => {
      try {
          const response = await axios.get('http://localhost:8080/invoiceTemplates');
          setInvoiceTemplates(response.data);
      } catch (error) {
          console.error('Error fetching invoice templates:', error);
      }
    };

    const fetchFilesFromArtist = async (artistId) => {
      try {
          const response = await axios.get(`http://localhost:8080/artistFiles/${artistId}`);
          setArtistFiles(response.data);
      } catch (error) {
          console.error('Error fetching invoice templates:', error);
      }
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    createArtist();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateArtist();
}

  
  useEffect(() => {        
    fetchContractTemplates();
    fetchInvoiceTemplates();
    fetchArtists();
  }, []);

  
    
    return (<div>
        <div class="row my-4">
    <div class="col-12">
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
                                            <th scope="col">Vertragsvorlagenid</th>
                                            <th scope="col">Rechnungsvorlagenid</th>
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
                                            <td>{artist.invoiceTemplateId}</td>
                                            <td><a href="#" class="btn btn-sm btn-primary" onClick={() => handleEditClick(artist)}>Bearbeiten</a>
                                            <a href="#" class="btn btn-sm btn-primary" onClick={() => deleteArtist(artist.id)}>L&ouml;schen</a>
                                            <a href="#" class="btn btn-sm btn-primary" onClick={() => fetchFilesFromArtist(artist.id)}>Dokumente</a>
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

<div class="row">
<div class="col-12">
<div class="card">
  <h5 class="card-header">K&uuml;stler hinzuf&uuml;gen</h5>
  <div class="card-body">
  {editArtist == null ? ( 
        <form class="row g-3" onSubmit={handleSubmit}>
        <div class="col-md-6">
            <label for="newArtistContractTemplateId" class="form-label">Vertragsvorlage</label>
            <select class="form-select" id="newArtistContractTemplateId" name="contractTemplateId" value={newArtist.contractTemplateId} onChange={handleInputChange}>
                <option value="">Vertragsvorlage w&auml;hlen</option>
                {contractTemplates.map(contractTemplate => (
                <option key={contractTemplate.id} value={contractTemplate.id}>{contractTemplate.name}</option>
                ))}
            </select>
        </div>
        <div class="col-md-6">
            <label for="newArtistInvoiceTemplateId" class="form-label">Rechnungsvorlage</label>
            <select class="form-select" id="newArtistContractTemplateId" name="invoiceTemplateId" value={newArtist.invoiceTemplateId} onChange={handleInputChange}>
                <option value="">Vertragsvorlage w&auml;hlen</option>
                {invoiceTemplates.map(invoiceTemplate => (
                <option key={invoiceTemplate.id} value={invoiceTemplate.id}>{invoiceTemplate.name}</option>
                ))}
            </select>
        </div>
        <div class="col-md-6">
        <label for="newArtistName" class="form-label">Künstlername</label>
        <input class="form-control" id="newArtistName"
                type="text"
                placeholder="Enter artist name"
                name="name"
                value={newArtist.name}
                onChange={handleInputChange}
                required
                />
        </div>
        <div class="col-md-6">
            <label for="newArtistManagement" class="form-label">Management</label>
                <input id="newArtistManagement"
                class="form-control"
                type="text"
                placeholder="Enter artist management"
                name="management"
                value={newArtist.management}
                onChange={handleInputChange}
                required
                />
        </div>
        <div class="col-md-6">
                <label for="newArtistManagementEmail" class="form-label">Management Email</label>
                <input id="newArtistManagementEmail"
                class="form-control"
                type="text"
                placeholder="Enter artist management"
                name="managementEmail"
                value={newArtist.managementEmail}
                onChange={handleInputChange}
                required
                />
        </div>
        <div class="col-md-6">
                <label for="newArtistManagementPhone" class="form-label">Management Telefon</label>
                <input id="newArtistManagementPhone"
                class="form-control"
                type="text"
                placeholder="Enter artist management"
                name="managementPhone"
                value={newArtist.managementPhone}
                onChange={handleInputChange}
                required
                />
        </div>
        <div class="col-md-6">
                <label for="newArtistEmail" class="form-label">Email</label>
                <input id="newArtistEmail" class="form-control"
                type="email"
                placeholder="Enter artist email"
                name="email"
                value={newArtist.email}
                onChange={handleInputChange}
                required
                />
        </div>
        <div class="col-md-6">
                <label for="newArtistCountry" class="form-label">Land</label>            
                <input class="form-control" id="newArtistCountry"
                type="text"
                placeholder="Artist country"
                name="country"
                value={newArtist.country}
                onChange={handleInputChange}
                required
                />
        </div>
        <div class="col-md-6">
                <label for="newArtistAddress" class="form-label">Addresse</label>
                <input class="form-control" id="newArtistAddress"
                type="text"
                placeholder="Artist address"
                name="address"
                value={newArtist.address}
                onChange={handleInputChange}
                required
                />
        </div>
        <div class="col-md-6">
                <label for="newArtistZipCode" class="form-label">PLZ</label>
                <input id="newArtistZipCode" class="form-control"
                type="text"
                placeholder="Artist PLZ"
                name="zipCode"
                value={newArtist.zipCode}
                onChange={handleInputChange}
                required
                />
        </div>
        <div class="col-md-6">
                <label for="newArtistPlace" class="form-label">Ort</label>
                <input id="newArtistPlace" class="form-control"
                type="text"
                placeholder="Artist Ort"
                name="place"
                value={newArtist.place}
                onChange={handleInputChange}
                required
                />
        </div>
        <div class="col-md-6">
                <label for="newArtistPhone" class="form-label">Telefon</label>
                <input class="form-control"
                type="text"
                placeholder="Telefonnummer"
                name="phone"
                value={newArtist.phone}
                onChange={handleInputChange}
                required
                />      
        </div>
        <div class="col-md-6">
                <label for="newArtistFirstname" class="form-label">Vorname</label>
                <input class="form-control"
                type="text"
                placeholder="Artist firstname"
                name="firstname"
                value={newArtist.firstname}
                onChange={handleInputChange}
                required
                />
        </div>
        <div class="col-md-6">
                <label for="newArtistLastname" class="form-label">Nachname</label>
                <input class="form-control"
                type="text"
                placeholder="Artist lastname"
                name="lastname"
                value={newArtist.lastname}
                onChange={handleInputChange}
                required
                />
        </div>
        <div class="col-12">
                <button class="btn btn-primary" type="submit">K&uuml;stler hinzuf&uuml;gen</button>      
        </div>
        </form> ) : (

<form class="row g-3" onSubmit={handleEditSubmit}>
<div class="col-md-6">
  <label for="editArtistContractTemplateId" class="form-label">Vertragsvorlage</label>
  <select class="form-select" id="editArtistContractTemplateId" name="contractTemplateId" value={editArtist.contractTemplateId} onChange={handleEditInputChange}>
      <option value="">Vertragsvorlage w&auml;hlen</option>
      {contractTemplates.map(contractTemplate => (
        <option key={contractTemplate.id} value={contractTemplate.id}>{contractTemplate.name}</option>
      ))}
    </select>
</div>
<div class="col-md-6">
            <label for="newArtistInvoiceTemplateId" class="form-label">Rechnungsvorlage</label>
            <select class="form-select" id="newArtistContractTemplateId" name="invoiceTemplateId" value={editArtist.invoiceTemplateId} onChange={handleEditInputChange}>
                <option value="">Vertragsvorlage w&auml;hlen</option>
                {invoiceTemplates.map(invoiceTemplate => (
                <option key={invoiceTemplate.id} value={invoiceTemplate.id}>{invoiceTemplate.name}</option>
                ))}
            </select>
        </div>
<div class="col-md-6">
 <label for="editArtistName" class="form-label">Künstlername</label>
 <input class="form-control" id="editArtistName"
        type="text"
        placeholder="Enter artist name"
        name="name"
        value={editArtist.name}
        onChange={handleEditInputChange}
        required
      />
</div>
<div class="col-md-6">
  <label for="editArtistManagement" class="form-label">Management</label>
      <input id="editArtistManagement"
        class="form-control"
        type="text"
        placeholder="Enter artist management"
        name="management"
        value={editArtist.management}
        onChange={handleEditInputChange}
        required
      />
</div>
<div class="col-md-6">
      <label for="editArtistManagementEmail" class="form-label">Management Email</label>
      <input id="editArtistManagementEmail"
        class="form-control"
        type="text"
        placeholder="Enter artist management"
        name="managementEmail"
        value={editArtist.managementEmail}
        onChange={handleEditInputChange}
        required
      />
</div>
<div class="col-md-6">
      <label for="editArtistManagementPhone" class="form-label">Management Telefon</label>
      <input id="editArtistManagementPhone"
        class="form-control"
        type="text"
        placeholder="Enter artist management"
        name="managementPhone"
        value={editArtist.managementPhone}
        onChange={handleEditInputChange}
        required
      />
</div>
<div class="col-md-6">
      <label for="editArtistEmail" class="form-label">Email</label>
      <input id="editArtistEmail" class="form-control"
        type="email"
        placeholder="Enter artist email"
        name="email"
        value={editArtist.email}
        onChange={handleEditInputChange}
        required
      />
</div>
<div class="col-md-6">
      <label for="editArtistCountry" class="form-label">Land</label>            
      <input class="form-control" id="editArtistCountry"
        type="text"
        placeholder="Artist country"
        name="country"
        value={editArtist.country}
        onChange={handleEditInputChange}
        required
      />
</div>
<div class="col-md-6">
      <label for="editArtistAddress" class="form-label">Addresse</label>
      <input class="form-control" id="editArtistAddress"
        type="text"
        placeholder="Artist address"
        name="address"
        value={editArtist.address}
        onChange={handleEditInputChange}
        required
      />
</div>
<div class="col-md-6">
      <label for="editArtistZipCode" class="form-label">PLZ</label>
      <input id="editArtistZipCode" class="form-control"
        type="text"
        placeholder="Artist zip code"
        name="zipCode"
        value={editArtist.zipCode}
        onChange={handleEditInputChange}
        required
      />
</div>
<div class="col-md-6">
                <label for="newArtistPlace" class="form-label">Ort</label>
                <input id="newArtistPlace" class="form-control"
                type="text"
                placeholder="Artist Ort"
                name="place"
                value={editArtist.place}
                onChange={handleEditInputChange}
                required
                />
        </div>
<div class="col-md-6">
      <label for="editArtistPhone" class="form-label">Telefon</label>
      <input class="form-control"
        type="text"
        placeholder="Telefonnummer"
        name="phone"
        value={editArtist.phone}
        onChange={handleEditInputChange}
        required
      />      
</div>
<div class="col-md-6">
      <label for="editArtistFirstname" class="form-label">Vorname</label>
      <input class="form-control"
        type="text"
        placeholder="Artist firstname"
        name="firstname"
        value={editArtist.firstname}
        onChange={handleEditInputChange}
        required
      />
</div>
<div class="col-md-6">
      <label for="editArtistLastname" class="form-label">Nachname</label>
      <input class="form-control"
        type="text"
        placeholder="Artist lastname"
        name="lastname"
        value={editArtist.lastname}
        onChange={handleEditInputChange}
        required
      />
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

{artistFiles != null ? (
  <div class="row my-4">
  <div class="col-12 col-xl-8 mb-4 mb-lg-0">
  <div class="card">
    <h5 class="card-header">Erzeugte Dokumente zum Künstler</h5>
    <div class="card-body">
      <ul>
      {artistFiles.map(artistFile => (
        <li>{artistFile.filename}</li>
      ))}</ul>
  </div>
  </div>
  </div>
  </div>
) : ( <div></div> )}

</div>            
    )
}

export default Artist;