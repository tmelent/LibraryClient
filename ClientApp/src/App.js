import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { GetBook } from './components/GetBook';
import Login from './components/Login';
import { Register } from './components/Register';
import { Profile } from './components/Profile';
import { Books } from './components/Books';
import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/counter' component={Counter} />
                <Route path='/fetch-data' component={FetchData} />
                <Route path='/getbook' component={GetBook} />
                <Route path='/login' component={Login} />
                <Route path='/register' component={Register} />
                <Route path='/profile' component={Profile} />
                <Route path='/books' component={Books} />
            </Layout>
        );
    }
}