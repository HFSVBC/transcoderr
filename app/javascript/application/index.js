import React from 'react';
import { render } from 'react-dom';
//import { BrowserRouter } from 'react-router-dom';
import App from './App';
import "@coreui/coreui/scss/coreui";
//import './styles.scss';

document.addEventListener('DOMContentLoaded', () => {
  render((
    //<BrowserRouter>
      <App />
    //</BrowserRouter>
  ), document.querySelector('#app'));
});
