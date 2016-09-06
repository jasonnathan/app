'use strict';

import React from 'react';
import { Container } from '/imports/client/touchstonejs/lib';
import { defer } from 'lodash';
import c from 'classnames';

import openWeb from '/imports/client/services/openWeb';
import { NotificationModel, PartupUpdateModel, ActivityModel, UserModel, PartupModel } from '/imports/client/models';
import List from '/imports/client/components/List';
import ListItem from '/imports/client/components/ListItem';
import MessageForm from '/imports/client/components/MessageForm';
import NavButton from '/imports/client/components/NavButton';
import Notification from '/imports/client/components/Notification';
import PartupUpdateComment from '/imports/client/components/PartupUpdateComment';
import PartupUpdateContent from '/imports/client/components/PartupUpdateContent';
import Flex from '/imports/client/components/Flex';
import setCurrentBackbuttonHandler from '/imports/client/services/setCurrentBackbuttonHandler';

let notificationForNavigationBar;

const NotificationView = class NotificationView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nowDate: new Date(),
            messageBoxFocussed: false
        };
    }

    render() {
        const {t, notification, partupUpdate, partupUpdateData} = this.props;
        const {nowDate, messageBoxFocussed} = this.state;
        notificationForNavigationBar = notification;

        return (
            <Container fill className={c({
                'View--notification--collapse': messageBoxFocussed && window.cordova
            })}>
                <Flex>
                    <Flex.Shrink>
                        {this.renderNotificationDetails()}
                    </Flex.Shrink>
                    {partupUpdate && [
                        <Flex.Stretch scroll='reverse' key="comments" className="View--notification__comments" ref="comments">
                            {this.renderComments()}
                        </Flex.Stretch>,
                        <Flex.Shrink key="commentinput" className="View--notification__commentinput">
                            <MessageForm
                                onSend={this.onCommentSend.bind(this)}
                                onFocus={this.onMessageBoxFocus.bind(this)}
                                onBlur={this.onMessageBoxBlur.bind(this)} />
                        </Flex.Shrink>
                    ]}
                </Flex>
            </Container>
        );
    }

    renderNotificationDetails() {
        const {notification, partupUpdate, partupUpdateData} = this.props;

        const showNotification = partupUpdate && partupUpdate.type !== 'partups_message_added';

        return (
            <div>
                {showNotification && notification &&
                    <Notification
                        notification={notification}
                        isDetail={true} />
                }

                {partupUpdate &&
                    <PartupUpdateContent
                        update={partupUpdate}
                        updateData={partupUpdateData} />
                }
            </div>
        );
    }

    onMessageBoxFocus() {
        this.setState({messageBoxFocussed: true});
    }

    onMessageBoxBlur() {
        this.setState({messageBoxFocussed: false});
    }

    onCommentSend(comment) {
        if (comment.length > 1000) {
            alert('Characters may not exceed 1000.');
            return;
        }

        this.props.onCommentSend(comment);
    }

    renderComments() {
        const {partupUpdate} = this.props;

        const comments = (partupUpdate.comments || [])
            .filter(comment => comment.type !== 'system');

        return (
            <List partupUpdateComments>
                {comments.map((comment, index) => {
                    const author = PartupUpdateModel.getUserForComment(comment);

                    return (
                        <ListItem key={index}>
                            <PartupUpdateComment
                                type={comment.type}
                                author={author}
                                content={comment.content}
                                createdAt={comment.created_at} />
                        </ListItem>
                    );
                })}
            </List>
        );
    }
};

NotificationView.navigationBar = 'app';
NotificationView.getNavigation = (props, app) => {
    const back = () => {
        app.transitionTo('app:tabs:notifications', {
            transition: 'reveal-from-right'
        });
    };

    setCurrentBackbuttonHandler(back);

    return {
        leftLabel: <NavButton left icon="icon_back" label="Notifications" />,
        leftAction: back,
        rightLabel: <NavButton right icon="icon_part-up" />,
        rightAction: () => {
            openWeb(notificationForNavigationBar.getWebsiteUrl());
        }
    };
};

NotificationView.propTypes = {
    notification: React.PropTypes.instanceOf(NotificationModel),
    partupUpdate: React.PropTypes.instanceOf(PartupUpdateModel),
    partupUpdateData: React.PropTypes.shape({
        activity: React.PropTypes.instanceOf(ActivityModel),
        user: React.PropTypes.instanceOf(UserModel),
        partup: React.PropTypes.instanceOf(PartupModel)
    }).isRequired
};

export default NotificationView;
