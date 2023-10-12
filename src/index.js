import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {configureStore} from '@reduxjs/toolkit'
import { Provider } from 'react-redux';
import myDB from './features/db'
import myUser from './features/user'
import myUpdate from './features/wasUpdated'

const store = configureStore({
  reducer: {
    db: myDB,
    user: myUser,
    wasUpdated: myUpdate,
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

