import React from 'react';
import { ToastContainer } from 'react-toastify';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import {
  Provider as UrqlProvider,
  createClient,
  defaultExchanges,
  subscriptionExchange,
} from 'urql';
import Header from './components/Header';
import Wrapper from './components/Wrapper';
import NowWhat from './components/NowWhat';

const subscriptionClient = new SubscriptionClient(
  'wss://react.eogresources.com/graphql',
  {
    reconnect: true,
    timeout: 20000,
  },
);

const client = createClient({
  url: '/graphql',
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: operation => subscriptionClient.request(operation),
    }),
  ],
});

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(39,49,66)',
    },
    secondary: {
      main: 'rgb(197,208,222)',
    },
    background: {
      default: 'rgb(226,231,238)',
    },
  },
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Wrapper>
      <Header />
      <UrqlProvider value={client}>
        <NowWhat />
      </UrqlProvider>
      <ToastContainer />
    </Wrapper>
  </MuiThemeProvider>
);

export default App;