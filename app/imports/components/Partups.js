'use strict';

import React from 'react';
import classNames from '../helpers/classNames';
import PartupModel from '../models/PartupModel';

export default class Users extends React.Component {
    render() {
        return (
            <article>
                <h3>Discover part-ups</h3>
                <ul className={classNames('test-list')}>
                    {this.renderPartups()}
                </ul>
            </article>
        );
    }

    renderPartups() {
        return this.props.partups.map((partup) => {
            return <li key={partup._id}>{partup.name}</li>;
        });
    }
}

Users.propTypes = {
    partups: React.PropTypes.arrayOf(React.PropTypes.instanceOf(PartupModel)).isRequired,
    partupsLoading: React.PropTypes.bool
};

Users.defaultProps = {
    partupsLoading: false
};
