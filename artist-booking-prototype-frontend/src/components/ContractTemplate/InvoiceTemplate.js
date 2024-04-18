// components/ArtistRequest/ArtistRequest.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CodeEditor from '@uiw/react-textarea-code-editor';

function InvoiceTemplate() {    
    const [invoiceTemplates, setInvoiceTemplates] = useState([]);
    const [newInvoiceTemplate, setNewInvoiceTemplate] = useState({        
        name: '',
        template: ''
    });
    const [editInvoiceTemplate, setEditInvoiceTemplate]= useState(null);    

    useEffect(() => {        
        fetchInvoiceTemplates();
    }, []);
    
    const fetchInvoiceTemplates = async () => {
        try {
            const response = await axios.get('http://localhost:8080/invoiceTemplates');
            setInvoiceTemplates(response.data);
        } catch (error) {
            console.error('Error fetching invoice templates:', error);
        }
    };

    const createInvoiceTemplate = async () => {
        try {
            await axios.post('http://localhost:8080/invoiceTemplates', newInvoiceTemplate);
            fetchInvoiceTemplates();
            setNewInvoiceTemplate({
                name: '',
                template: ''
            });
        } catch (error) {
            console.error('Error creating invoice template:', error);
        }
    };

    const updateInvoiceTemplate = async () => {
        try {
            await axios.put(`http://localhost:8080/invoiceTemplates/${editInvoiceTemplate.id}`, editInvoiceTemplate);
            fetchInvoiceTemplates();
            setEditInvoiceTemplate(null);
        } catch (error) {
            console.error('Error updating artist request:', error);
        }
    };

    const deleteInvoiceTemplate = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/invoiceTemplates/${id}`);
            fetchInvoiceTemplates();
        } catch (error) {
            console.error('Error deleting invoice template:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createInvoiceTemplate();
      };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        updateInvoiceTemplate();
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewInvoiceTemplate({ ...newInvoiceTemplate, [name]: value });
    };

    const handleEditInputChange = (event) => {
        const { name, value } = event.target;
        setEditInvoiceTemplate({ ...editInvoiceTemplate, [name]: value });
    };

    const handleCancelEdit = () => {
        setEditInvoiceTemplate(null);
    };

    const handleEditClick = (invoiceTemplateToEdit) => {
        setEditInvoiceTemplate(invoiceTemplateToEdit);
    };

    return (
        <div>
            <div class="row">
    <div class="col-12 col-xl-8 mb-4 mb-lg-0">
    <div class="card">
      <h5 class="card-header">Rechnungsvorlagen</h5>
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
                    {invoiceTemplates.map(template => (
                        <tr key={template.id}>
                            <td>{template.id}</td>
                            <td>{template.name}</td>
                            <td>{template.template.substr(0,50)}</td>
                            <td>
                                {editInvoiceTemplate && editInvoiceTemplate.id === template.id ? (
                                    <div>
                                        <button onClick={updateInvoiceTemplate}>Save</button>
                                        <button onClick={handleCancelEdit}>Cancel</button>
                                    </div>
                                ) : (
                                    <div>
                                        <button onClick={() => handleEditClick(template)}>Edit</button>
                                        <button onClick={() => deleteInvoiceTemplate(template.id)}>Delete</button>
                                    </div>
                                )}
                            </td>
                        </tr>                        
                    ))}
                </tbody>
            </table>
            </div>
            </div>
            
            {editInvoiceTemplate == null ? (
                <form class="row g-3" onSubmit={handleSubmit}>
                    <div class="col-md-12">
                        <label for="templateName" class="form-label">Templatename</label>
                        <input class="form-control" name="name" type="text" value={newInvoiceTemplate.name} onChange={handleInputChange} />
                    </div>
                    <div class="col-md-12">                    
                        <label for="templateContent">Template</label>                    
                        <CodeEditor
                        value={newInvoiceTemplate.template}
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
                        <button class="btn btn-primary" type="submit">Rechnungsvorlage hinzuf&uuml;gen</button>                        
                    </div>
                </form>
            ) : (
                <form class="row g-3" onSubmit={handleEditSubmit}>
                    <div class="col-md-12">
                        <label for="templateName" class="form-label">Templatename</label>
                        <input class="form-control" type="text" name="name" value={editInvoiceTemplate.name} onChange={handleEditInputChange} />
                    </div>
                    <div class="col-md-12">                    
                        <label for="templateContent">Template</label>                    
                        <CodeEditor
                        value={editInvoiceTemplate.template}
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
        </div></div></div></div>
    );
}

export default InvoiceTemplate;