export const createEvent = /* GraphQL */ `
mutation CreateEvent($input: CreateEventInput!) {
  createEvent(input: $input) {
    id
    title
    description
    date
    location
    organizer
    participants
  }
}
`;

export const deleteEvent = /* GraphQL */ `
mutation DeleteEvent($input: DeleteEventInput!) {
  deleteEvent(input: $input) {
    id
  }
}
`;
