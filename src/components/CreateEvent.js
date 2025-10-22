import React, { useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { createEvent } from '../graphql/mutations';
import { v4 as uuidv4 } from 'uuid';

export default function CreateEvent({ onCreated, currentUser }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

  async function handleCreate(e) {
    e.preventDefault();
    const input = {
      id: uuidv4(),
      title,
      description,
      date,
      location,
      organizer: currentUser,
      participants: []
    };
    try {
      await API.graphql(graphqlOperation(createEvent, { input }));
      setTitle(''); setDescription(''); setDate(''); setLocation('');
      if (onCreated) onCreated();
    } catch (err) {
      console.error('Create error', err);
      alert('Error creating event (check console).');
    }
  }

  return (
    <div>
      <h3>Create Event</h3>
      <form onSubmit={handleCreate}>
        <div className="form-row">
          <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} required />
        </div>
        <div className="form-row">
          <textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
        </div>
        <div className="form-row">
          <input type="datetime-local" value={date} onChange={e=>setDate(e.target.value)} />
        </div>
        <div className="form-row">
          <input placeholder="Location" value={location} onChange={e=>setLocation(e.target.value)} />
        </div>
        <button className="button" type="submit">Create</button>
      </form>
    </div>
  );
}
