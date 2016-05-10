'use strict';

import React from 'react';
import Avatar from '/imports/components/Avatar';
import Paragraph from '/imports/components/Paragraph';

const ChatTile = class ChatTile extends React.Component {
    render() {
        if (this.props.onClick) {
            return (
                <a onClick={this.onClick.bind(this)} className="pa-ChatTile">
                    {this.renderContent()}
                </a>
            );
        }

        return (
            <div className="pa-ChatTile">
                {this.renderContent()}
            </div>
        );
    }

    renderContent() {
        return (
            <div>
                <Avatar src="http://media02.hongkiat.com/ww-flower-wallpapers/roundflower.jpg"></Avatar>

            </div>
        );
    }

    onClick(event) {
        event.preventDefault();
        this.props.onClick();
    }
};

ChatTile.propTypes = {
    imageSrc: React.PropTypes.string,
    label: React.PropTypes.string.isRequired,
    updatesCount: React.PropTypes.number,
    onClick: React.PropTypes.func
};

export default ChatTile;
