import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './home';
import Mynotes from './mynotes';
import Favorites from './favorites';
import Layout from '../components/Layout';
import NotePage from './note';

const Pages = () => {
    return (
        <Router>
            <Layout>
                <Route exact path="/" component={Home} />
                <Route path="/mynotes" component={Mynotes} />
                <Route path="/favorites" component={Favorites}/>
                <Route path="/note/:id" component={NotePage} />
            </Layout>
        </Router>
    );
};

export default Pages;
