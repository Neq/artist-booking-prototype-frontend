// components/ArtistRequest/ArtistRequest.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ContractTemplate() {    
    const [contractTemplates, setContractTemplates] = useState([]);
    const [newContractTemplate, setNewContractTemplate] = useState({        
        name: '',
        template: ''
    });
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [editRequest, setEditRequest] = useState(null);

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

    const createContractTemplate = async () => {
        try {
            await axios.post('http://localhost:8080/contractTemplate', newContractTemplate);
            fetchContractTemplates();
            setNewContractTemplate({
                name: '',
                template: ''
            });
        } catch (error) {
            console.error('Error creating contract template:', error);
        }
    };

    const updateArtistRequest = async () => {
        try {
            await axios.put(`http://localhost:8080/artistRequests/${editRequest.id}`, editRequest);
            fetchContractTemplates();
            setEditRequest(null);
        } catch (error) {
            console.error('Error updating artist request:', error);
        }
    };

    const deleteContractTemplate = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/contractTemplate/${id}`);
            fetchContractTemplates();
        } catch (error) {
            console.error('Error deleting contract template:', error);
        }
    };

    const handleTemplateChange = (event) => {
        const selectedTemplateName = event.target.value;
        const selectedTemplate = contractTemplates.find(template => template.name === selectedTemplateName);
        setSelectedTemplate(selectedTemplate);
    };

    const handleNameChange = (event) => {
        // Handle changes to the name input field
        // Here you would typically update the state with the new name value
    };

    const handleTemplateTextChange = (event) => {
        // Handle changes to the template textarea
        // Here you would typically update the state with the new template value
    };

    return (
        <div>
            <h2>Contract Templates</h2>
                        
            <select onChange={handleTemplateChange}>
                <option value="">Select a Template</option>
                {contractTemplates.map(template => (
                    <option key={template.name} value={template.name}>{template.name}</option>
                ))}
            </select>
            {selectedTemplate && (
                <div>
                    <label>Name:</label>
                    <input type="text" value={selectedTemplate.name} onChange={handleNameChange} />
                    <label>Template:</label>
                    <textarea value={selectedTemplate.template} onChange={handleTemplateTextChange} />
                </div>
            )}            
        </div>
    );
}

export default ContractTemplate;