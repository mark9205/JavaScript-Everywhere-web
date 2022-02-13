import React from 'react';
import ReactDOM from 'react-dom';
import Pages from './pages';
import GlobalStyle from './components/GlobalStyle';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

//настроим API URI и кэш

//настроим Apollo Client
const client = new ApolloClient({
    uri: 'http://127.0.0.1:4000/api',
    cache: new InMemoryCache(),
    connectToDevTools: true
});

const App = () => {
    return (
        <ApolloProvider client={client}>
            <GlobalStyle />
            <Pages />
        </ApolloProvider>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
