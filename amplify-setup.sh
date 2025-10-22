#!/usr/bin/env bash
set -e
echo "This script will run Amplify CLI commands to create backend resources."
echo "Make sure you have run 'amplify configure' and have AWS credentials."
read -p "Enter a project name for Amplify (default: event-management): " AMPLIFY_PROJECT
AMPLIFY_PROJECT=${AMPLIFY_PROJECT:-event-management}
echo "Initializing Amplify project..."
amplify init --amplify "{"projectName":"$AMPLIFY_PROJECT","envName":"dev"}" --yes

echo "Adding Authentication (Cognito User Pool)..."
amplify add auth --headless "{"version":1,"authSelections":"identityPoolAndUserPool","resourceName":"${AMPLIFY_PROJECT}Auth","userPoolConfiguration":{"mfaConfiguration":"OFF","requiredAttributes":["email"]}}"

echo "Adding GraphQL API (AppSync) with basic schema..."
amplify add api --apiName events --graphql --headless "{"service":"AppSync","providerPlugin":"awscloudformation"}"

# Copy schema file into the newly created api folder if CLI created one; otherwise CLI will prompt during add api
SCHEMA_DEST=$(pwd)/amplify/backend/api/events/schema.graphql
if [ -f "./amplify/backend/api/events/schema.graphql" ]; then
  echo "Found schema path."
else
  mkdir -p ./amplify/backend/api/events
fi
cp amplify/backend/api/events/schema.graphql amplify/backend/api/events/schema.graphql || true

echo "Adding Storage (S3) for event assets..."
amplify add storage --headless "{"service":"S3","resourceName":"eventAssets","bucketName":"event-assets-$RANDOM","permissions":[{"groupName":"admin","access":"create,read,update,delete"}],"bucketConfig":{"access":"authAndGuest","publicAccess":"false"}}"

echo "Adding Lambda Function..."
amplify add function --functionName eventProcessor --template "Hello World" --headless "{"runtime":"nodejs18.x"}"

echo "Pushing to the cloud (this will create AWS resources and may take several minutes)..."
amplify push --yes

echo "Done. Amplify backend has been provisioned. The file src/aws-exports.js should be generated; if not, run 'amplify pull'."
