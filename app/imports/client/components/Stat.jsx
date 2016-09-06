'use strict';

import React from 'react';

const Stat = class Stat extends React.Component {
    render() {
        return (
            <div className="pa-Stat">
                {this.props.children}
            </div>
        );
    }
};

export default Stat;
