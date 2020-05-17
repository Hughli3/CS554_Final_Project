import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider as AlertProvider } from 'react-alert'
import { HelmetProvider } from 'react-helmet-async';

const AlertTemplate = ({ style, options, message, close }) => {
  let classes = 
    options.type === 'info' ? 'alert alert-secondary alert-message' :
    options.type === 'success' ? ' alert alert-success alert-message' :
    'alert alert-danger alert-message'

  return (
  <div className={classes}>
    <span>{message}</span>
    <button type="button" className={options.type === 'info' ? 'close close-dark' : 'close'} onClick={close} data-dismiss="alert">&#215;</button>
  </div>
)}

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} transition='fade' timeout={3000} position='top center'>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </AlertProvider>  
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
