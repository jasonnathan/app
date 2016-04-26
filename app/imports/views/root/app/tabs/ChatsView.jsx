'use strict';

import React from 'react';

import transitionTo from '/imports/services/transitionTo';
import Debug from '/imports/Debug';
import Content from '/imports/components/Content';
import Button from '/imports/components/Button';
import Paragraph from '/imports/components/Paragraph';

const ChatsView = class ChatsView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loggingOut: false
        };
    }

    render() {
        return (
            <Content>
                <Content.Text>
                    <Paragraph>Chat</Paragraph>
                </Content.Text>
                <Content.Block>
                    <Button onClick={this.logout.bind(this)} loading={this.state.loggingOut}>Log out</Button>
                </Content.Block>
            </Content>
        );
    }

    logout() {
        this.setState({loggingOut: true});

        this.props.onLogout((err) => {
            this.setState({loggingOut: false});

            if (err) {
                Debug.methods(`Failed user logout`, err);
                window.alert('Logout failed');
                return;
            }

            transitionTo('root:login', {
                transition: 'reveal-from-right'
            });
        });
    }
};

ChatsView.propTypes = {
    onLogout: React.PropTypes.func.isRequired
};

ChatsView.navigationBar = 'tabs';
ChatsView.getNavigation = () => {
    return {
        title: 'Chat'
    };
};

export default ChatsView;
