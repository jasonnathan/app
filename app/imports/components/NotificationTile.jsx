'use strict';

import React from 'react';
import c from 'classnames';

import NotificationModel from '/imports/models/NotificationModel';
import List from '/imports/components/List';
import ListItem from '/imports/components/ListItem';
import Avatar from '/imports/components/Avatar';
import Paragraph from '/imports/components/Paragraph';

const NotificationTile = class NotificationTile extends React.Component {
    render() {
        const {notification: n} = this.props;

        return (
            <div className={c('pa-NotificationTile', {
                'pa-NotificationTile--new': n.new,
                'pa-NotificationTile--clicked': n.clicked
            })}>
                <div>
                    <Avatar src="https://scontent-ams3-1.xx.fbcdn.net/hphotos-xpf1/v/t1.0-0/p480x480/12654276_10153497190189315_5610049985251143068_n.jpg?oh=d02fec40dc99520f168b4d965a511900&oe=57C07AC8" />
                </div>
                <div>
                    <Paragraph><strong>Maarten Osieck has invited you to join Communicatiecampagne ontwikkelen</strong></Paragraph>
                    <Paragraph meta>3 days ago in Communcatiecampagne ontwikkelen</Paragraph>
                </div>
            </div>
        );
    }
};

NotificationTile.propTypes = {
    notification: React.PropTypes.instanceOf(NotificationModel).isRequired,
    onClick: React.PropTypes.func
};

export default NotificationTile;
