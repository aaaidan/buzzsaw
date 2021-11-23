import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const AppComponent = <App />

ReactDOM.render(AppComponent, document.getElementById('root'));
registerServiceWorker();

