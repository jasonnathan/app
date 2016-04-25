'use strict';

import React from 'react';
import c from 'classnames';
import { translate } from 'react-i18next';

import NotificationModel from '/imports/models/NotificationModel';
import ImageModel from '/imports/models/ImageModel';
import List from '/imports/components/List';
import ListItem from '/imports/components/ListItem';
import Avatar from '/imports/components/Avatar';
import Paragraph from '/imports/components/Paragraph';

const NotificationTile = class NotificationTile extends React.Component {
    render() {
        const {t, notification: n} = this.props;

        return (
            <div className={c('pa-NotificationTile', {
                'pa-NotificationTile--new': n.new,
                'pa-NotificationTile--clicked': n.clicked
            })}>
                <div>
                    <Avatar src={n.getImage().getUrl('360x360')} />
                </div>
                <div>
                    <Paragraph><strong>{n.getText(t)}</strong></Paragraph>
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

export default translate()(NotificationTile);
