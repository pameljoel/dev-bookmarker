import React from 'react';
import ReactDOM from 'react-dom';
import './main.scss';
import registerServiceWorker from './registerServiceWorker';
import Login from "./Login/Login";

ReactDOM.render(<Login />, document.getElementById('root'));
registerServiceWorker();
