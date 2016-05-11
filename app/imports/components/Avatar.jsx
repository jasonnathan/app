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
                {typeof this.props.score !== 'undefined' &&
                    <span className="pa-Avatar__score">{this.props.score}</span>
                }
            </figure>
        );
    }
};

Avatar.propTypes = {
    src: React.PropTypes.string,
    alt: React.PropTypes.string,
    onClick: React.PropTypes.func,
    score: React.PropTypes.number
};

export default Avatar;
