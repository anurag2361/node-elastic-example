import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Search from './components/Search/search';

class Router extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/' component={Search} />
                </Switch>
            </div>
        )
    }
}
export default Router;