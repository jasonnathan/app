'use strict';

import React from 'react';
import { Container } from '/imports/touchstonejs/lib';
import { defer } from 'lodash';
import c from 'classnames';

import openWeb from '/imports/services/openWeb';
import { NotificationModel, PartupUpdateModel } from '/imports/models';
import ReversedScroller from '/imports/classes/ReversedScroller';
import List from '/imports/components/List';
import ListItem from '/imports/components/ListItem';
import MessageForm from '/imports/components/MessageForm';
import NavButton from '/imports/components/NavButton';
import Notification from '/imports/components/Notification';
import PartupUpdateComment from '/imports/components/PartupUpdateComment';
import PartupUpdateContent from '/imports/components/PartupUpdateContent';
import Flex from '/imports/components/Flex';
import setCurrentBackbuttonHandler from '/imports/services/setCurrentBackbuttonHandler';

let notificationForNavigationBar;

const NotificationView = class NotificationView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nowDate: new Date(),
            messageBoxFocussed: false
        };

        this.reversedScroller = new ReversedScroller();
    }

    componentWillUnmount() {
        this.reversedScroller.destroy();
    }

    componentDidUpdate() {
        this.triggerReversedScroll();
    }

    componentWillMount() {
        this.triggerReversedScroll();
    }

    triggerReversedScroll() {
        defer(() => {
            if (this.refs.comments && this.refs.comments.refs.flexStretch) {
                this.reversedScroller.contentPossiblyUpdated(this.refs.comments.refs.flexStretch);
            }
        });
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
                        {notification &&
                            <Notification
                                notification={notification}
                                isDetail={true} />
                        }
                    </Flex.Shrink>
                    {partupUpdate && [
                        <Flex.Shrink key="updatecontent">
                            <PartupUpdateContent update={partupUpdate} updateData={partupUpdateData} />
                        </Flex.Shrink>,
                        <Flex.Stretch scroll key="comments" className="View--notification__comments" ref="comments">
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
    partupUpdate: React.PropTypes.instanceOf(PartupUpdateModel)
};

export default NotificationView;
