'use strict';

import React from 'react';
import c from 'classnames';

import translate from '/imports/client/services/translate';
import { NotificationModel, ImageModel } from '/imports/client/models';
import List from '/imports/client/components/List';
import ListItem from '/imports/client/components/ListItem';
import Avatar from '/imports/client/components/Avatar';
import Heading from '/imports/client/components/Heading';
import Paragraph from '/imports/client/components/Paragraph';
import Svg from '/imports/client/components/Svg';

const Notification = class Notification extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nowDate: new Date()
        };
    }

    render() {
        const {notification: n, isDetail} = this.props;
        const className = c('pa-Notification', {
            'pa-Notification--new': !isDetail && n.new,
            'pa-Notification--detail': isDetail,
            'pa-Notification--clicked': !isDetail && n.clicked
        });

        if (this.props.onClick) {
            return (
                <a href="" onClick={(event) => {
                    event.preventDefault();
                    this.props.onClick();
                }} className={className}>
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
        const {t, notification: n} = this.props;
        const {nowDate} = this.state;
        const image = n.getImage();
        const isExternal = !n.hasUpdate() || n.type === 'partups_multiple_updates_since_visit';

        return (
            <div className="pa-Notification__content">
                <div key="avatar">
                    <Avatar src={image && image.getUrl('360x360')} />
                </div>
                <div key="content">
                    <Heading>
                        {n.getText(t)}
                        {isExternal &&
                            <Svg name='icon_link' />
                        }
                    </Heading>
                    <Paragraph meta>{n.getMetaText(t, nowDate)}</Paragraph>
                </div>
            </div>
        );
    }
};

Notification.propTypes = {
    notification: React.PropTypes.instanceOf(NotificationModel).isRequired,
    isDetail: React.PropTypes.bool,
    onClick: React.PropTypes.func
};

Notification.defaultProps = {
    isDetail: false
};

export default translate()(Notification);
