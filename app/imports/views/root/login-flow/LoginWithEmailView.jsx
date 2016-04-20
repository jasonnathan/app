'use strict';

import React from 'react';
import { Container, UI, Link, ViewManager, View } from 'touchstonejs';
import { isEmail, isLength } from 'validator';

import transitionTo from '/imports/helpers/transitionTo';
import Debug from '/imports/Debug';
import NavButton from '/imports/components/NavButton';
import Content from '/imports/components/Content';
import Paragraph from '/imports/components/Paragraph';
import Form from '/imports/components/Form';
import Input from '/imports/components/Input';
import Button from '/imports/components/Button';

export default class LoginWithEmailView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            submitting: false
        };
    }

    render() {
        return (
            <Container fill scrollable>
                <Content>
                    <Content.Text>
                        <Paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque neque ut ratione veritatis voluptas, quam explicabo modi, aperiam laboriosam? Maiores minima molestias magni inventore fuga.</Paragraph>
                    </Content.Text>
                    <Content.Block>
                        <Form onSubmit={this.onSubmit.bind(this)}>
                            <Input.Text email name="email" placeholder="Email address" />
                            <Input.Text ref="passwordField" password name="password" placeholder="Password" />
                            <Form.Footer>
                                <Form.Footer.Submit>
                                    <Button submit formNoValidate loading={this.state.submitting}>Sign in</Button>
                                </Form.Footer.Submit>
                                <Form.Footer.Action>
                                    {/*TODO <Button text>Forgot password</Button>*/}
                                </Form.Footer.Action>
                            </Form.Footer>
                        </Form>
                    </Content.Block>
                </Content>
            </Container>
        );
    }

    onSubmit(event) {
        const form = event.target;
        const fields = {
            email: form.elements.email.value,
            password: form.elements.password.value
        };

        let syncErrorMessage = (() => {
            if (!isLength(fields.email, {min: 1})) return 'Please enter an email address';
            if (!isEmail(fields.email)) return 'Please enter a valid email address';
            if (!isLength(fields.password, {min: 1})) return 'Please enter a password';
        })();

        if (syncErrorMessage) {
            window.alert(syncErrorMessage);
            return;
        }

        this.login(fields.email, fields.password);
    }

    login(email, password) {
        this.setState({submitting: true});

        this.props.onLoginWithPassword(email, password, (err) => {
            this.setState({submitting: false});

            if (err) {
                let serverErrorMessage = (() => {
                    if (err.message === 'User not found [403]') return 'User not found';
                    if (err.message === 'Incorrect password [403]') {
                        const input = this.refs.passwordField.refs.input;
                        input.value = '';
                        input.focus();
                        return 'Password is incorrect';
                    }

                    Debug.methods(`Failed user login "${email}"`, err);
                    return 'Login failed for an unknown reason';
                })();

                if (serverErrorMessage) {
                    window.alert(serverErrorMessage);
                }
            } else {
                Debug.methods(`User logged in: "${email}"`);

                transitionTo('root:app', {
                    transition: 'show-from-right'
                });
            }
        });
    }
};

LoginWithEmailView.navigationBar = 'login-flow';
LoginWithEmailView.getNavigation = (props, app) => {
    return {
        leftLabel: <NavButton left icon="icon_back" />,
        leftAction: () => {
            app.transitionTo('root:login', {
                transition: 'reveal-from-right'
            });
        },
        title: 'Sign in with email'
    };
};

LoginWithEmailView.propTypes = {
    onLoginWithPassword: React.PropTypes.func.isRequired
};
