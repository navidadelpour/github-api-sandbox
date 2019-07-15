import React from 'react'
import * as serviceWorker from '../../serviceWorker';
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter } from 'react-router-dom'
import client from './ClientConfig'
import PublicArea from '../PublicArea/PublicArea'

const App = () => {
  return (
    <ApolloProvider client={client}>
        <BrowserRouter>
            <PublicArea/>
        </BrowserRouter>
    </ApolloProvider>
  )
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

export default App