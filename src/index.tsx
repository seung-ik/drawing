import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { GlobalStyle } from './styles/global-styles';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();
const isDevelopmentEnv = process.env.NODE_ENV === 'development'


ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider contextSharing={true} client={queryClient}>
      <BrowserRouter>
        <RecoilRoot>
          <GlobalStyle />
          <App />
          {isDevelopmentEnv && <ReactQueryDevtools initialIsOpen={false}/>}
        </RecoilRoot>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
