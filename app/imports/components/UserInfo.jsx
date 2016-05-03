'use strict';

import React from 'react';

const UserInfo = class UserInfo extends React.Component {
    render() {
        return (
            <div className="pa-UserInfo">
                {this.props.children}
            </div>
        );
    }
};

export default UserInfo;
