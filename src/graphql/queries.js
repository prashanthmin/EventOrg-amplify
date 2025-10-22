export const listEvents = /* GraphQL */ `
query ListEvents {
  listEvents {
    items {
      id
      title
      description
      date
      location
      organizer
      participants
      createdAt
      updatedAt
    }
  }
}
`;
