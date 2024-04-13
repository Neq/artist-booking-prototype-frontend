// ArtistForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ArtistForm({ onSubmit }) {
  const [newArtistId, setNewArtistId] = useState('');
  const [newArtistName, setNewArtistName] = useState('');
  const [newArtistManagement, setNewArtistManagement] = useState('');
  const [newArtistManagementEmail, setNewArtistManagementEmail] = useState('');
  const [newArtistManagementPhone, setNewArtistManagementPhone] = useState('');
  const [newArtistEmail, setNewArtistEmail] = useState('');
  const [newArtistCountry, setNewArtistCountry] = useState('');
  const [newArtistAddress, setNewArtistAddress] = useState('');
  const [newArtistZipCode, setNewArtistZipCode] = useState('');
  const [newArtistFirstname, setNewArtistFirstname] = useState('');
  const [newArtistLastname, setNewArtistLastname] = useState('');
  const [newArtistPhone, setNewArtistPhone] = useState('');
  const [newArtistContractTemplateId, setNewArtistContractTemplateId] = useState('');


  const [contractTemplates, setContractTemplates] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ newArtistName, newArtistManagement, newArtistManagementEmail, newArtistManagementPhone, newArtistEmail, newArtistAddress, newArtistZipCode, newArtistCountry, newArtistFirstname, newArtistLastname, newArtistPhone, newArtistContractTemplateId});
    setNewArtistName('');
    setNewArtistManagement('');
    setNewArtistEmail('');
    setNewArtistCountry('');
    setNewArtistAddress('');
    setNewArtistZipCode('');
    setNewArtistFirstname('');
    setNewArtistLastname('');
    setNewArtistContractTemplateId('');
    setNewArtistPhone('');
  };

  const handleEdit = (e) => {
    
  }

  useEffect(() => {        
    fetchContractTemplates();
  }, []);

  const fetchContractTemplates = async () => {
    try {
        const response = await axios.get('http://localhost:8080/contractTemplates');
        setContractTemplates(response.data);
    } catch (error) {
        console.error('Error fetching contract templates:', error);
    }
  };

  return (
    <div class="row">
    <div class="col-12 col-xl-8 mb-4 mb-lg-0">
    <div class="card">
      <h5 class="card-header">K&uuml;stler hinzuf&uuml;gen</h5>
      <div class="card-body">
    <form class="row g-3" onSubmit={handleSubmit}>
      <div class="col-md-6">
        <label for="newArtistContractTemplateId" class="form-label">Vertragsvorlage</label>
        <select class="form-select" id="newArtistContractTemplateId" name="contractTemplateId" value={newArtistContractTemplateId} onChange={(e) => setNewArtistContractTemplateId(e.target.value)}>
            <option value="">Vertragsvorlage w&auml;hlen</option>
            {contractTemplates.map(contractTemplate => (
              <option key={contractTemplate.id} value={contractTemplate.id}>{contractTemplate.name}</option>
            ))}
          </select>
      </div>
      <div class="col-md-6">
       <label for="newArtistName" class="form-label">Künstlername</label>
       <input class="form-control" id="newArtistName"
              type="text"
              placeholder="Enter artist name"
              value={newArtistName}
              onChange={(e) => setNewArtistName(e.target.value)}
              required
            />
      </div>
      <div class="col-md-6">
        <label for="newArtistManagement" class="form-label">Management</label>
            <input id="newArtistManagement"
              class="form-control"
              type="text"
              placeholder="Enter artist management"
              value={newArtistManagement}
              onChange={(e) => setNewArtistManagement(e.target.value)}
              required
            />
      </div>
      <div class="col-md-6">
            <label for="newArtistManagementEmail" class="form-label">Management Email</label>
            <input id="newArtistManagementEmail"
              class="form-control"
              type="text"
              placeholder="Enter artist management"
              value={newArtistManagementEmail}
              onChange={(e) => setNewArtistManagementEmail(e.target.value)}
              required
            />
      </div>
      <div class="col-md-6">
            <label for="newArtistManagementPhone" class="form-label">Management Telefon</label>
            <input id="newArtistManagementPhone"
              class="form-control"
              type="text"
              placeholder="Enter artist management"
              value={newArtistManagementPhone}
              onChange={(e) => setNewArtistManagementPhone(e.target.value)}
              required
            />
      </div>
      <div class="col-md-6">
            <label for="newArtistEmail" class="form-label">Email</label>
            <input id="newArtistEmail" class="form-control"
              type="email"
              placeholder="Enter artist email"
              value={newArtistEmail}
              onChange={(e) => setNewArtistEmail(e.target.value)}
              required
            />
      </div>
      <div class="col-md-6">
            <label for="newArtistCountry" class="form-label">Land</label>            
            <input class="form-control" id="newArtistCountry"
              type="text"
              placeholder="Artist country"
              value={newArtistCountry}
              onChange={(e) => setNewArtistCountry(e.target.value)}
              required
            />
      </div>
      <div class="col-md-6">
            <label for="newArtistAddress" class="form-label">Addresse</label>
            <input class="form-control" id="newArtistAddress"
              type="text"
              placeholder="Artist address"
              value={newArtistAddress}
              onChange={(e) => setNewArtistAddress(e.target.value)}
              required
            />
      </div>
      <div class="col-md-6">
            <label for="newArtistZipCode" class="form-label">PLZ</label>
            <input id="newArtistZipCode" class="form-control"
              type="text"
              placeholder="Artist zip code"
              value={newArtistZipCode}
              onChange={(e) => setNewArtistZipCode(e.target.value)}
              required
            />
      </div>
      <div class="col-md-6">
            <label for="newArtistPhone" class="form-label">Telefon</label>
            <input class="form-control"
              type="text"
              placeholder="Telefonnummer"
              value={newArtistPhone}
              onChange={(e) => setNewArtistPhone(e.target.value)}
              required
            />      
      </div>
      <div class="col-md-6">
            <label for="newArtistFirstname" class="form-label">Vorname</label>
            <input class="form-control"
              type="text"
              placeholder="Artist firstname"
              value={newArtistFirstname}
              onChange={(e) => setNewArtistFirstname(e.target.value)}
              required
            />
      </div>
      <div class="col-md-6">
            <label for="newArtistLastname" class="form-label">Nachname</label>
            <input class="form-control"
              type="text"
              placeholder="Artist lastname"
              value={newArtistLastname}
              onChange={(e) => setNewArtistLastname(e.target.value)}
              required
            />
      </div>
      <div class="col-12">
            <button class="btn btn-primary" type="submit">K&uuml;stler hinzuf&uuml;gen</button>      
      </div>
    </form>
    </div>
    </div>
    </div>
    </div>
  );
}

export default ArtistForm;