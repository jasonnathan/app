'use strict';

import React from 'react';

import transitionTo from '/imports/helpers/transitionTo';
import NotificationModel from '/imports/models/NotificationModel';
import Content from '/imports/components/Content';
import Paragraph from '/imports/components/Paragraph';
import Button from '/imports/components/Button';

export default class NotificationsView extends React.Component {
    render() {
        return (
            <Content>
                {this.props.notifications.map((notification, index) => (
                    <Content.Text key={index}>
                        <Paragraph>
                            <Button onClick={() => {
                                transitionTo('app:notification', {
                                    transition: 'show-from-right',
                                    viewProps: {notification}
                                });
                            }}>
                                {notification._id}
                            </Button>
                        </Paragraph>
                    </Content.Text>
                ))}
            </Content>
        );
    }
};

NotificationsView.propTypes = {
    notifications: React.PropTypes.arrayOf(React.PropTypes.instanceOf(NotificationModel)).isRequired
};

NotificationsView.navigationBar = 'tabs';
NotificationsView.getNavigation = () => {
    return {
        title: 'Notifications'
    };
};
