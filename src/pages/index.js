import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Home from './home';
import Mynotes from './mynotes';
import Favorites from './favorites';
import Layout from '../components/Layout';
import NotePage from './note';
import SignUp from './signup'
import SignIn from './signin';
import { useQuery, gql } from '@apollo/client';
import NewNote from './New';

const IS_LOGGED_IN = gql`
    {
        isLoggedIn @client
    }
`;

const Pages = () => {
    return (
        <Router>
            <Layout>
                <Route exact path="/" component={Home} />
                <PriviteRoute path="/mynotes" component={Mynotes} />
                <PriviteRoute path="/favorites" component={Favorites}/>
                <Route path="/note/:id" component={NotePage} />
                <Route path="/signup" component={SignUp} />
                <Route path="/signin" component={SignIn} />
                <PriviteRoute path="/new" component={NewNote} />
            </Layout>
        </Router>
    );
};

const PriviteRoute = ({component: Component, ...rest}) => {
    const {loading, error, data} = useQuery(IS_LOGGED_IN)
    //если данные загр-ся, отобр-м сообщ о загрузке
    {loading && <p>loading...</p>}
    //если error, отобр-м сообщ об errore
    {error && <p>sign Up error!</p>}
    //если польз-ль авторизовн, направляем его к запращ-му комп-ту
    //в противном случае направляем его на страницу авторизации
    return (
        <Route 
            {...rest}
            render={props => 
                data.isLoggedIn === true
                ? <Component {...props}/>
                : <Redirect to={{pathname: '/signIn', state: {from: props.location}
                }}/>
            }
        />
    )
}

export default Pages;
