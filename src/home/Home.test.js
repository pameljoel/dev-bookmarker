import React from 'react';
import ReactDOM from 'react-dom';
import Home, {generateUrlsToSave} from './Home';

describe('Home', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Home/>, div);
    });
});


// TODO:
// add tests

// describe('generateUrlsToSave', () => {
//   it('generates urls', () => {
//     // generateUrlsToSave()
//   })
// })
