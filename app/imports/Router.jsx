'use strict';

import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import UsersContainer from './containers/UsersContainer';

export default class router extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={UsersContainer} />
            </Router>
        );
    }
}
