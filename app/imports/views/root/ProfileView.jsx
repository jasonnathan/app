'use strict';

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, UI, View, ViewManager } from 'touchstonejs';
import c from 'classnames';

import transitionTo from '/imports/helpers/transitionTo';
import UserModel from '/imports/models/UserModel';
import Content from '/imports/components/Content';
import Paragraph from '/imports/components/Paragraph';
import Button from '/imports/components/Button';

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
                            <Paragraph>
                                Hi {this.props.loggedInUser.getFirstname()}, you're succesfully logged in.
                            </Paragraph>
                        </Content.Text>
                    }
                    <Content.Block>
                        <Button onClick={this.logout.bind(this)} loading={this.state.loggingOut}>Log out</Button>
                    </Content.Block>
                </Content>
            </Container>
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
}

ProfileView.propTypes = {
    loggedInUser: React.PropTypes.instanceOf(UserModel),
    loggedInUserLoading: React.PropTypes.bool,
    onLogout: React.PropTypes.func.isRequired
};

ProfileView.defaultProps = {
    loggedInUserLoading: false
};
