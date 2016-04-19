'use strict';

import React from 'react';
import c from 'classnames';

import List from './List';
import ListItem from './ListItem';
import Button from './Button';

export default class LoginChoice extends React.Component {
    render() {
        return (
            <div className={c('pa-LoginChoice')}>
                <List buttons>
                    <ListItem><Button login onClick={this.props.onEmail}>Sign in with email</Button></ListItem>
                    <ListItem><Button login loginFacebook onClick={this.props.onFacebook}>Sign in with Facebook</Button></ListItem>
                    <ListItem><Button login loginLinkedIn onClick={this.props.onLinkedIn}>Sign in with LinkedIn</Button></ListItem>
                </List>
            </div>
        );
    }
}

LoginChoice.propTypes = {
    onEmail: React.PropTypes.func.isRequired,
    onFacebook: React.PropTypes.func.isRequired,
    onLinkedIn: React.PropTypes.func.isRequired
};
