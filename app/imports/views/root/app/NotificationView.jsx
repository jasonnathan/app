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
        const {t, notification: n} = this.props;
        const {nowDate} = this.state;

        return (
            <Container fill scrollable>
                <UI.NavigationBar name="notification" className={"NavigationBar--detail"} />
                <Container>
                    <Content>
                        <Content.Text>
                            <Paragraph><strong>{n.getText(t)}</strong></Paragraph>
                            <Paragraph meta>{n.getMetaText(t, nowDate)}</Paragraph>
                        </Content.Text>
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
