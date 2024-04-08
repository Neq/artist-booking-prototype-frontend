// components/Calendar/Calendar.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

export default function Calendar() {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchEvents();
      }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:8080/events');
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    return (
        <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        events={
            events
        }

        />
    )
}