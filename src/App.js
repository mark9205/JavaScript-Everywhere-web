import React from 'react';
import ReactDOM from 'react-dom';
import Pages from './pages';
import GlobalStyle from './components/GlobalStyle';
import {
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
    createHttpLink
} from '@apollo/client';
import { setContext } from 'apollo-link-context';

//настроим API URI и кэш
const uri = process.env.API_URI;
const httpLink = createHttpLink({ uri });
const cache = new InMemoryCache();

//Проверяем наличие токена и возвр-м загол-ки в контекст
const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: localStorage.getItem('token') || ''
        }
    };
});

//создаем Apollo Client
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
    resolvers: {},
    connectToDevTools: true
});

//проверяем наличие локал-го токена
const data = {
    isLoggedIn: !!localStorage.getItem('token')
};

//записываем данные кэша при начальной загрузке
cache.writeData({ data });
//Запис-м данные кэша после его сброса
client.onResetStore(() => cache.writeData({ data }));

const App = () => {
    return (
        <ApolloProvider client={client}>
            <GlobalStyle />
            <Pages />
        </ApolloProvider>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
