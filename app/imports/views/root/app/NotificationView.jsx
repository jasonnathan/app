'use strict';

import React from 'react';
import { Container, UI } from 'touchstonejs';
import { translate } from 'react-i18next';

import passPropsForTouchstone from '/imports/helpers/passPropsForTouchstone';
import Debug from '/imports/Debug';
import NavButton from '/imports/components/NavButton';
import NotificationTile from '/imports/components/NotificationTile';
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
            <Container>
                <UI.NavigationBar name="notification" className={"NavigationBar--detail"} />
                <Container fill scrollable>
                    <NotificationTile notification={n} />
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

export default passPropsForTouchstone(
    translate()(NotificationView),
    NotificationView
);
