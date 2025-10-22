import React, { useEffect, useState } from 'react';
import { Authenticator, Button } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import CreateEvent from './components/CreateEvent';
import EventList from './components/EventList';
import { API, graphqlOperation } from 'aws-amplify';
import { listEvents } from './graphql/queries';

function App() {
  const [events, setEvents] = useState([]);

  async function fetchEvents() {
    try {
      const result = await API.graphql(graphqlOperation(listEvents));
      const items = result.data.listEvents.items;
      setEvents(items || []);
    } catch (err) {
      console.error('Error fetching events', err);
    }
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div className="container">
          <div className="header">
            <h2>Event Management</h2>
            <div>
              <span className="small">Signed in as {user.username}</span>
              <Button className="button" onClick={signOut} style={{marginLeft:12}}>Sign Out</Button>
            </div>
          </div>

          <CreateEvent onCreated={fetchEvents} currentUser={user.username} />
          <hr />
          <EventList events={events} onDeleted={fetchEvents} currentUser={user.username} />
        </div>
      )}
    </Authenticator>
  );
}

export default App;
