import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { deleteEvent } from '../graphql/mutations';

export default function EventList({ events, onDeleted, currentUser }) {

  async function handleDelete(eventId) {
    if (!window.confirm('Delete this event?')) return;
    try {
      await API.graphql(graphqlOperation(deleteEvent, { input: { id: eventId } }));
      if (onDeleted) onDeleted();
    } catch (err) {
      console.error('Delete error', err);
      alert('Error deleting event (check console).');
    }
  }

  return (
    <div>
      <h3>Events</h3>
      {events.length === 0 && <p className="small">No events yet.</p>}
      {events.map(ev => (
        <div key={ev.id} className="event-card">
          <h4>{ev.title}</h4>
          <p className="small">Organizer: {ev.organizer || '—'}</p>
          <p>{ev.description}</p>
          <p className="small">{ev.date ? new Date(ev.date).toLocaleString() : ''} {ev.location}</p>
          <div style={{marginTop:8}}>
            {(ev.organizer === currentUser) && <button className="button" onClick={()=>handleDelete(ev.id)}>Delete</button>}
          </div>
        </div>
      ))}
    </div>
  );
}
