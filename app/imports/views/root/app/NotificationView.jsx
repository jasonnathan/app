'use strict';

import React from 'react';
import { Container, UI } from 'touchstonejs';

import Debug from '/imports/Debug';
import NavButton from '/imports/components/NavButton';
import Content from '/imports/components/Content';
import Paragraph from '/imports/components/Paragraph';
import NotificationModel from '/imports/models/NotificationModel';

export default class NotificationView extends React.Component {
    render() {
        return (
            <Container fill scrollable>
                <UI.NavigationBar name="notification" className={"NavigationBar--detail"} />
                <Container>
                    <Content>
                        {Object.keys(this.props.notification).map((key, index) => (
                            <Content.Text key={index}>
                                <Paragraph>{key}: {JSON.stringify(this.props.notification[key])}</Paragraph>
                            </Content.Text>
                        ))}
                    </Content>
                </Container>
            </Container>
        );
    }
};

NotificationView.navigationBar = 'notification';
NotificationView.getNavigation = (props, app) => {
    return {
        leftLabel: <NavButton left icon="icon_back" />,
        leftAction: () => {
            app.transitionTo('app:tabs:notifications', {
                transition: 'reveal-from-right'
            });
        }
    };
};

NotificationView.propTypes = {
    notification: React.PropTypes.instanceOf(NotificationModel).isRequired
};
