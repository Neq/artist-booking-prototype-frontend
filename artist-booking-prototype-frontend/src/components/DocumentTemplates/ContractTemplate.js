// components/ArtistRequest/ArtistRequest.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CodeEditor from '@uiw/react-textarea-code-editor';
import InvoiceTemplate from './InvoiceTemplate';

function DocumentTemplates() {    
    const [contractTemplates, setContractTemplates] = useState([]);
    const [newContractTemplate, setNewContractTemplate] = useState({        
        name: '',
        template: ''
    });
    const [editContractTemplate, setEditContractTemplate]= useState(null);    

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
            await axios.post('http://localhost:8080/contractTemplates', newContractTemplate);
            fetchContractTemplates();
            setNewContractTemplate({
                name: '',
                template: ''
            });
        } catch (error) {
            console.error('Error creating contract template:', error);
        }
    };

    const updateContractTemplate = async () => {
        try {
            await axios.put(`http://localhost:8080/contractTemplates/${editContractTemplate.id}`, editContractTemplate);
            fetchContractTemplates();
            setEditContractTemplate(null);
        } catch (error) {
            console.error('Error updating artist request:', error);
        }
    };

    const deleteContractTemplate = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/contractTemplates/${id}`);
            fetchContractTemplates();
        } catch (error) {
            console.error('Error deleting contract template:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createContractTemplate();
      };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        updateContractTemplate();
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewContractTemplate({ ...newContractTemplate, [name]: value });
    };

    const handleEditInputChange = (event) => {
        const { name, value } = event.target;
        setEditContractTemplate({ ...editContractTemplate, [name]: value });
    };

    const handleCancelEdit = () => {
        setEditContractTemplate(null);
    };

    const handleEditClick = (contractTemplateToEdit) => {
        setEditContractTemplate(contractTemplateToEdit);
    };

    return (
        <div>
            <h2>Dokumentvorlagen</h2>

            <div class="row my-4">
    <div class="col-12 col-xl-8 mb-4 mb-lg-0">
    <div class="card">
      <h5 class="card-header">Vertragsvorlagen</h5>
      <div class="card-body">                        
            <div class="col-md-6">                     
                    <div class="table-responsive">                                
                                    <table class="table">
                                        <thead>
    
                    <tr>
                        <th>ID</th>
                        <th>Templatename</th>                        
                        <th>Template</th>
                        <th>Aktionen</th>
                    </tr>
                </thead>
                <tbody>
                    {contractTemplates.map(template => (
                        <tr key={template.id}>
                            <td>{template.id}</td>
                            <td>{template.name}</td>
                            <td>{template.template.substr(0,50)}</td>
                            <td>
                                {editContractTemplate && editContractTemplate.id === template.id ? (
                                    <div>
                                        <button class="btn btn-primary" onClick={updateContractTemplate}>Save</button>
                                        <button class="btn btn-primary" onClick={handleCancelEdit}>Cancel</button>
                                    </div>
                                ) : (
                                    <div>
                                        <button class="btn btn-primary" onClick={() => handleEditClick(template)}>Edit</button>
                                        <button class="btn btn-primary" onClick={() => deleteContractTemplate(template.id)}>Delete</button>
                                    </div>
                                )}
                            </td>
                        </tr>                        
                    ))}
                </tbody>
            </table>
            </div>
            </div>
            
            {editContractTemplate == null ? (
                <form class="row g-3" onSubmit={handleSubmit}>
                    <div class="col-md-12">
                        <label for="templateName" class="form-label">Templatename</label>
                        <input class="form-control" name="name" type="text" value={newContractTemplate.name} onChange={handleInputChange} />
                    </div>
                    <div class="col-md-12">                    
                        <label for="templateContent">Template</label>                    
                        <CodeEditor
                        value={newContractTemplate.template}
                        language="html"
                        name="template"
                        placeholder="Template hier editieren"
                        onChange={handleInputChange}
                        padding={15}
                        style={{
                            backgroundColor: "#f5f5f5",
                            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                        }}
                        />  
                    </div>
                    <div class="col-md-12">                    
                        <button class="btn btn-primary" type="submit">Vertragsvorlage hinzuf&uuml;gen</button>                        
                    </div>
                </form>
            ) : (
                <form class="row g-3" onSubmit={handleEditSubmit}>
                    <div class="col-md-12">
                        <label for="templateName" class="form-label">Templatename</label>
                        <input class="form-control" type="text" name="name" value={editContractTemplate.name} onChange={handleEditInputChange} />
                    </div>
                    <div class="col-md-12">                    
                        <label for="templateContent">Template</label>                    
                        <CodeEditor
                        value={editContractTemplate.template}
                        language="html"
                        placeholder="Template hier editieren"
                        onChange={handleEditInputChange}
                        name="template"
                        padding={15}
                        style={{
                            backgroundColor: "#f5f5f5",
                            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                        }}
                        />  
                    </div>
                    <div class="col-md-12">                                            
                        <button class="btn btn-primary" type="submit">&Auml;nderungen speichern</button>
                    </div>
                </form>
            )}            
        </div>
        </div></div></div>
        
        <InvoiceTemplate />
        
        </div>        
    );
}

export default DocumentTemplates;