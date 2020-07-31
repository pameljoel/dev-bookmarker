import React from 'react';
import ReactDOM from 'react-dom';
import './main.scss';
import Home from './home/Home';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Home />, document.getElementById('root'));
registerServiceWorker();
