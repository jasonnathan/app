'use strict';

import React from 'react';

const UserCard = class UserCard extends React.Component {
    render() {
        return (
            <div className="pa-UserCard">
                {this.props.children}
            </div>
        );
    }
};

UserCard.UserDetails = class UserCardUserDetails extends React.Component {
    render() {
        return (
            <section className="pa-UserCard__UserDetails">
                {this.props.children}
            </section>
        );
    }
};

UserCard.LogoutButton = class UserCardLogoutButton extends React.Component {
    render() {
        return (
            <footer className="pa-UserCard__LogoutButton">
                {this.props.children}
            </footer>
        );
    }
};

export default UserCard;
