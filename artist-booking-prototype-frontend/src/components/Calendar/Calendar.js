// components/Calendar/Calendar.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

export default function Calendar() {

    const [artistEvents, setArtistEvents] = useState({});
    const [offerStatus, setOfferStatus] = useState([]);
    const calendarRef = useRef(null);

    useEffect(() => {
        fetchOfferStatus();
        fetchArtistEvents();        
      }, []);

    const fetchArtistEvents = async () => {
        try {
            const response = await axios.get('http://localhost:8080/events');
            //setEvents(response.data);
            setArtistEvents([                  
                  {
                    events: response.data,
                    color: 'black',     
                    textColor: 'green',
                    className: 'asdf'
                  }
                ]);
            /*setArtistEvents({

                eventSources: [
              
                  // your event source
                  {
                    events: [ // put the array in the `events` property
                      {
                        title  : 'event1',
                        start  : '2024-01-01'
                      },
                      {
                        title  : 'event2',
                        start  : '2024-01-05',
                        end    : '2024-01-07'
                      },
                      {
                        title  : 'event3',
                        start  : '2024-01-09T12:30:00',
                      }
                    ],
                    color: 'black',     // an option!
                    textColor: 'yellow' // an option!
                  }
              
                  // any other event sources...
              
                ]
              
              });*/
            //fetchCalendarEvents();
            //console.log("ArtistEvents: "+response.data + " artistEvents: "+artistEvents);
        } catch (error) {
            console.error('Error fetching tasks:', error);
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

    const fetchCalendarEvents = () => {        
        
        console.log("calendarEvents - artistEvents: "+artistEvents);
        const calendarApi = calendarRef.current.getApi();
        calendarApi.addEventSource([artistEvents]);
        calendarApi.refetchEvents();
    }

    function renderEventContent(eventInfo) {
        console.log(eventInfo);
        return(
          <>          
            
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title} {eventInfo.event.id}</i>
            
          </>
        )
      }

    return (
        <FullCalendar
        plugins={[ dayGridPlugin ]}
        locale="deLocale"
        ref={calendarRef}
        eventSources={artistEvents}
        initialView="dayGridMonth"  
        eventContent={renderEventContent}      
        />
    )
}


