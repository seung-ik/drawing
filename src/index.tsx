import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { GlobalStyle } from './styles/global-styles';

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