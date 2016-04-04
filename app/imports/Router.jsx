'use strict';

import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import PartupsContainer from './containers/PartupsContainer';

export default class router extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={PartupsContainer} />
            </Router>
        );
    }
}
