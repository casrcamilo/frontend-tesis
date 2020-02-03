import React from 'react';
import ReactDOM from 'react-dom';
//import * as Sentry from '@sentry/browser';
import './global.css'
import App from './Components/App'

//Sentry.init({dsn: "https://d451640676dc4a75a27bc82d81ba8f46@sentry.io/1780927"});

const container = document.getElementById('app');

ReactDOM.render(<App/>, container);
