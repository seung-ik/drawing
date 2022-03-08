import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { GlobalStyle } from './styles/global-styles';
import { RecoilRoot } from 'recoil';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <RecoilRoot> 
        <GlobalStyle />
        <App />
      </RecoilRoot>  
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);