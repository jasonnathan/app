'use strict';

import React from 'react';
import UserModel from '../models/UserModel';

export default class Users extends React.Component {
    render() {
        return <ul>{this.renderUsers()}</ul>;
    }

    renderUsers() {
        return this.props.users.map((user) =>
            <li key={user._id}>{user.getFirstname()}</li>);
    }
}

Users.propTypes = {
    users: React.PropTypes.arrayOf(React.PropTypes.instanceOf(UserModel)).isRequired,
    usersLoading: React.PropTypes.bool
};

Users.defaultProps = {
    usersLoading: false
};
