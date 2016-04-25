'use strict';

import React from 'react';
import c from 'classnames';

const Avatar = class Avatar extends React.Component {
    render() {
        if (this.props.onClick) {
            return (
                <a href="" onClick={(event) => {
                    event.preventDefault();
                    this.props.onClick();
                }}>
                    {this.renderAvatar()}
                </a>
            );
        } else {
            return this.renderAvatar();
        }
    }

    renderAvatar() {
        return (
            <figure className={c('pa-Avatar', {
                'pa-Avatar--clickable': this.props.onClick
            })} style={{
                backgroundImage: this.props.src && `url('${this.props.src}')`
            }}>
            </figure>
        );
    }
};

Avatar.propTypes = {
    src: React.PropTypes.string.isRequired,
    alt: React.PropTypes.string,
    onClick: React.PropTypes.func
};

export default Avatar;
