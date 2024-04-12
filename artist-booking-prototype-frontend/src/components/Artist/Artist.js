// components/Artist/Artist.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArtistList from './ArtistList';
import ArtistForm from './ArtistForm';

function Artist() {

    const [artists, setArtists] = useState([]);
    
    const fetchArtists = async () => {
        try {
            const response = await axios.get('http://localhost:8080/artists');
            setArtists(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const addArtist = async (artistData) => {
        try {
            const response = await axios.post('http://localhost:8080/artists', {
                name: artistData.newArtistName,
                management: artistData.newArtistManagement,
                email: artistData.newArtistEmail,
                country: artistData.newArtistCountry,
                address: artistData.newArtistAddress,
                zipCode: artistData.newArtistZipCode,
                firstname: artistData.newArtistFirstname,
                lastname: artistData.newArtistLastname,
                contractTemplateId: artistData.newArtistContractTemplateId
            });
            setArtists([...artists, response.data]);      
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

    const editArtist = async (artistData) => {
        
    };

    useEffect(() => {
        fetchArtists();
      }, []);

    return (<div><ArtistList artists={artists} onDelete={deleteArtist} onEdit={editArtist} />
    <ArtistForm onSubmit={addArtist} /></div>)
}

export default Artist;