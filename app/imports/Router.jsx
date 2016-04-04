'use strict';

import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import HelloWorld from './components/HelloWorld';

export default class router extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="*" component={HelloWorld} />
            </Router>
        );
    }
}
