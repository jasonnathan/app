'use strict';

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, UI, View, ViewManager } from 'touchstonejs';
import c from 'classnames';

import App from '../../../App';
import UserModel from '../../../models/UserModel';
import Content from '../../Content';
import Paragraph from '../../Paragraph';
import Button from '../../Button';

export default class ProfileView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loggingOut: false
        };
    }

    render() {
        return (
            <Container fill className={c('Container NoNavigationBar')}>
                <Content>
                    {this.props.loggedInUser &&
                        <Content.Text>
                            <Paragraph><strong>{this.props.loggedInUser.getFirstname()}</strong></Paragraph>
                        </Content.Text>
                    }
                    <Content.Text>
                        <Paragraph>You're succesfully logged in.</Paragraph>
                    </Content.Text>
                    <Content.Block>
                        <Button onClick={this.logout.bind(this)} loading={this.state.loggingOut}>Log out</Button>
                    </Content.Block>
                </Content>
            </Container>
        );
    }

    logout() {
        this.setState({loggingOut: true});

        Meteor.logout((err) => {
            this.setState({loggingOut: false});

            if (err) {
                Debug.methods(`Failed user logout`, err);
                window.alert('Logout failed');
                return;
            }

            App.get().transitionTo('root:login', {
                transition: 'reveal-from-right'
            });
        });
    }
}

ProfileView.propTypes = {
    loggedInUser: React.PropTypes.instanceOf(UserModel),
    loggedInUserLoading: React.PropTypes.bool
};

ProfileView.defaultProps = {
    loggedInUserLoading: false
};
