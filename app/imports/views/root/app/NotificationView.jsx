'use strict';

import React from 'react';
import { Container, UI } from 'touchstonejs';
import { translate } from 'react-i18next';

import Debug from '/imports/Debug';
import NavButton from '/imports/components/NavButton';
import Content from '/imports/components/Content';
import Paragraph from '/imports/components/Paragraph';
import NotificationModel from '/imports/models/NotificationModel';

const NotificationView = class NotificationView extends React.Component {
    render() {
        const {t, notification: n} = this.props;

        return (
            <Container fill scrollable>
                <UI.NavigationBar name="notification" className={"NavigationBar--detail"} />
                <Container>
                    <Content>
                        <Paragraph>{t(`notification-${n.type}`, {inviter: 'Jantje'})}</Paragraph>
                        {Object.keys(n).map((key, index) => (
                            <Content.Text key={index}>
                                <Paragraph>{key}: {JSON.stringify(n[key])}</Paragraph>
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

export default translate()(NotificationView);
