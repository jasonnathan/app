'use strict';

import React from 'react';
import { Container, UI } from 'touchstonejs';
import { translate } from 'react-i18next';

import passPropsForTouchstone from '/imports/services/passPropsForTouchstone';
import Debug from '/imports/Debug';
import NotificationModel from '/imports/models/NotificationModel';
import PartupUpdateModel from '/imports/models/PartupUpdateModel';
import List from '/imports/components/List';
import ListItem from '/imports/components/ListItem';
import MessageForm from '/imports/components/MessageForm';
import NavButton from '/imports/components/NavButton';
import Notification from '/imports/components/Notification';
import Paragraph from '/imports/components/Paragraph';
import PartupUpdateComment from '/imports/components/PartupUpdateComment';
import PartupUpdateContent from '/imports/components/PartupUpdateContent';

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
        const {t, notification: notification, coupledPartupUpdate: update} = this.props;
        const {nowDate} = this.state;

        return (
            <Container fill scrollable>
                <Notification
                    notification={notification}
                    isDetail={true} />
                {update &&
                    <div>
                        <PartupUpdateContent update={update} />
                        {this.renderComments()}
                        <MessageForm key="commentinput" onSend={this.onCommentSend.bind(this)} />
                    </div>
                }
            </Container>
        );
    }

    onCommentSend(comment) {
        console.log(`Sending: ${comment}`);
    }

    renderComments() {
        const {coupledPartupUpdate: update} = this.props;

        const comments = (update.comments || [])
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
    coupledPartupUpdate: React.PropTypes.instanceOf(PartupUpdateModel)
};

export default NotificationView;
