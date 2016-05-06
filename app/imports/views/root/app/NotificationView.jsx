'use strict';

import React from 'react';
import { Container } from 'touchstonejs';
import { defer } from 'lodash';
import c from 'classnames';

import NotificationModel from '/imports/models/NotificationModel';
import PartupUpdateModel from '/imports/models/PartupUpdateModel';
import ReversedScroller from '/imports/classes/ReversedScroller';
import List from '/imports/components/List';
import ListItem from '/imports/components/ListItem';
import MessageForm from '/imports/components/MessageForm';
import NavButton from '/imports/components/NavButton';
import Notification from '/imports/components/Notification';
import PartupUpdateComment from '/imports/components/PartupUpdateComment';
import PartupUpdateContent from '/imports/components/PartupUpdateContent';

const NotificationView = class NotificationView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nowDate: new Date(),
            messageBoxFocussed: false
        };

        this.reversedScroller = new ReversedScroller();
    }

    componentDidMount() {
        this.nowInterval = setInterval(this.updateNowDate.bind(this), 5000);
    }

    componentWillUnmount() {
        if (this.nowInterval) {
            clearInterval(this.nowInterval);
            delete this.nowInterval;
        }

        this.reversedScroller.destroy();
    }

    componentDidUpdate() {
        defer(() => {
            if (this.refs.comments) {
                this.reversedScroller.contentPossiblyUpdated(this.refs.comments);
            }
        });
    }

    updateNowDate() {
        this.setState({
            nowDate: new Date()
        });
    }

    render() {
        const {t, notification, partupUpdate, partupUpdateData} = this.props;
        const {nowDate, messageBoxFocussed} = this.state;

        return (
            <Container fill className={c({
                'View--notification--collapse': messageBoxFocussed && window.cordova
            })}>
                <Notification
                    notification={notification}
                    isDetail={true} />
                {partupUpdate && [
                    <PartupUpdateContent key="updatecontent" update={partupUpdate} updateData={partupUpdateData} />,
                    <div key="comments" className="View--notification__comments" ref="comments">
                        {this.renderComments()}
                    </div>,
                    <div key="commentinput" className="View--notification__commentinput">
                        <MessageForm
                            onSend={this.onCommentSend.bind(this)}
                            onFocus={this.onMessageBoxFocus.bind(this)}
                            onBlur={this.onMessageBoxBlur.bind(this)} />
                    </div>
                ]}
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
    partupUpdate: React.PropTypes.instanceOf(PartupUpdateModel)
};

export default NotificationView;
