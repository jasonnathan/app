'use strict';

import React from 'react';
import { Container, UI } from 'touchstonejs';
import { translate } from 'react-i18next';

import passPropsForTouchstone from '/imports/services/passPropsForTouchstone';
import Debug from '/imports/Debug';
import NotificationModel from '/imports/models/NotificationModel';
import PartupUpdateModel from '/imports/models/PartupUpdateModel';
import NavButton from '/imports/components/NavButton';
import Notification from '/imports/components/Notification';
import Paragraph from '/imports/components/Paragraph';
import Content from '/imports/components/Content';
import PartupUpdateContentPreview from '/imports/components/PartupUpdateContentPreview';
import PartupUpdateComments from '/imports/components/PartupUpdateComments';

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
        const {t, notification: n, coupledPartupUpdate: u} = this.props;
        const {nowDate} = this.state;

        return (
            <Container>
                <UI.NavigationBar name="notification" className="NavigationBar--detail" />
                <Container fill scrollable>
                    <Notification
                        notification={n}
                        isDetail={true} />
                    {u && [
                        <PartupUpdateContentPreview key="content" />,
                        <PartupUpdateComments key="comments"partupUpdate={u} />
                    ]}
                </Container>
            </Container>
        );
    }
};

NotificationView.navigationBar = 'notification';
NotificationView.getNavigation = (props, app) => {
    return {
        leftLabel: <NavButton left icon="icon_back" label="Notifications" />,
        leftAction: () => {
            app.transitionTo('app:tabs:notifications', {
                transition: 'reveal-from-right'
            });
        }
    };
};

NotificationView.propTypes = {
    notification: React.PropTypes.instanceOf(NotificationModel).isRequired,
    coupledPartupUpdate: React.PropTypes.instanceOf(PartupUpdateModel)
};

export default NotificationView;
