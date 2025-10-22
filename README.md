# Event Management React App + AWS Amplify

This repo contains a React starter app for event management (create/delete events, assign organizer/participant roles) and scripts + GraphQL schema to provision AWS Amplify backend resources: Authentication (Cognito), GraphQL API (AppSync), Storage (S3), and Lambda functions.

## What's included
- React frontend (uses `aws-amplify` + `@aws-amplify/ui-react` Authenticator)
- `amplify-setup.sh` — script with Amplify CLI commands to create backend resources
- `schema.graphql` — GraphQL schema used for `amplify add api`
- `src/` — frontend source code
- `README` — this file

## Prerequisites
1. Node.js (16+), npm
2. Amplify CLI installed: `npm install -g @aws-amplify/cli`
3. An AWS account and credentials configured (`amplify configure`)

## Quick setup (high level)
1. Unzip the project and `cd event-management-amplify`.
2. Install frontend deps:
   ```bash
   npm install
   ```
3. Initialize Amplify (the script below automates most steps — read it first):
   ```bash
   bash amplify-setup.sh
   ```
   The script will:
   - `amplify init`
   - `amplify add auth` (default configuration)
   - `amplify add api` (GraphQL) and use `amplify/backend/api/events/schema.graphql` as schema
   - `amplify add storage` (S3 bucket for event assets)
   - `amplify add function` (Lambda for simple event processing)
   - `amplify push` to provision resources

> NOTE: The script includes prompts — follow the CLI prompts. After `amplify push` completes, Amplify will generate `src/aws-exports.js`. If it doesn't appear, run `amplify pull` or re-run the commands.

## Files of interest
- `src/App.js` — main app
- `src/components/CreateEvent.js` — create event form
- `src/components/EventList.js` — list and delete events
- `amplify/backend/api/events/schema.graphql` — GraphQL schema

## How frontend talks to backend
Frontend uses Amplify's GraphQL API (`API.graphql`) with mutations/queries defined in `src/graphql`.

## Run locally
```bash
npm start
```

After provisioning backend, authenticate via Amplify Auth UI and start creating events.

