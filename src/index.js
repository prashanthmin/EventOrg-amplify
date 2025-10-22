import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

const root = createRoot(document.getElementById('root'));
root.render(<App />);
