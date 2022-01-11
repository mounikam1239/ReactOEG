/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-indent */
/* eslint-disable @typescript-eslint/semi */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import App from './App';
import { store } from './app/store';

ReactDOM.render(<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'));