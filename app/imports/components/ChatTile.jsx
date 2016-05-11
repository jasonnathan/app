'use strict';

import React from 'react';
import c from 'classnames';
import Avatar from '/imports/components/Avatar';
import Paragraph from '/imports/components/Paragraph';

const ChatTile = class ChatTile extends React.Component {
    render() {
        const className = c('pa-ChatTile', {
            'pa-ChatTile--is-unread': true
        });

        if (this.props.onClick) {
            return (
                <a onClick={this.onClick.bind(this)} className={className}>
                    {this.renderContent()}
                </a>
            );
        }

        return (
            <div className={className}>
                {this.renderContent()}
            </div>
        );
    }

    renderContent() {
        return (
            <div>
                <div className="pa-ChatTile__image">
                    <Avatar src="http://media02.hongkiat.com/ww-flower-wallpapers/roundflower.jpg"></Avatar>
                </div>
                <div className="pa-ChatTile__label">
                    <Paragraph className="pa-ChatTile__label__title">Anthony Wells</Paragraph>
                    <Paragraph>Lorem ipsum dolor sit amet dolor sit</Paragraph>
                </div>
                <span className="pa-ChatTile__time">
                    <Paragraph>Yesterday</Paragraph>
                </span>
                <span className="pa-ChatTile__alert">
                </span>
            </div>
        );
    }

    onClick(event) {
        event.preventDefault();
        this.props.onClick();
    }
};

ChatTile.propTypes = {

};

export default ChatTile;
