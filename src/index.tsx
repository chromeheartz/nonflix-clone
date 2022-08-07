// coin

// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import CoinApp from './CoinApp';

// const queryClient = new QueryClient();

// todo

import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import App from './App';
import { darkTheme } from './theme';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      {/* 
        Coin Tracker
        
        <QueryClientProvider client={queryClient}>
          <CoinApp />
        </QueryClientProvider>
       */}
      <ThemeProvider theme={darkTheme}>
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
)