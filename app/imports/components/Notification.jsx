'use strict';

import React from 'react';
import c from 'classnames';
import { translate } from 'react-i18next';

import NotificationModel from '/imports/models/NotificationModel';
import ImageModel from '/imports/models/ImageModel';
import List from '/imports/components/List';
import ListItem from '/imports/components/ListItem';
import Avatar from '/imports/components/Avatar';
import Heading from '/imports/components/Heading';
import Paragraph from '/imports/components/Paragraph';

const Notification = class Notification extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nowDate: new Date()
        };
    }

    componentDidMount() {
        this.nowInterval = setInterval(this.updateNowDate.bind(this), 5000);
    }

    componentWillUnmount() {
        if (this.nowInterval) {
            clearInterval(this.nowInterval);
            delete this.nowInterval;
        }
    }

    updateNowDate() {
        this.setState({
            nowDate: new Date()
        });
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

        return [
            <div key="avatar">
                <Avatar src={image && image.getUrl('360x360')} />
            </div>,
            <div key="content">
                <Heading>{n.getText(t)}</Heading>
                <Paragraph meta>{n.getMetaText(t, nowDate)}</Paragraph>
            </div>
        ];
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
