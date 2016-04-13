'use strict';

import React from 'react';
import { Container, UI, Link, ViewManager, View } from 'touchstonejs';
import { isEmail, isLength } from 'validator';

import NavButton from '../../../NavButton';
import Content from '../../../Content';
import Paragraph from '../../../Paragraph';
import Form from '../../../Form';
import Input from '../../../Input';
import Button from '../../../Button';

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
                            <Input.Text password name="password" placeholder="Password" />
                            <Form.Footer>
                                <Form.Footer.Submit>
                                    <Button submit formNoValidate loading={this.state.submitting}>Sign in</Button>
                                </Form.Footer.Submit>
                                <Form.Footer.Action>
                                    <Button text>Forgot password</Button>
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

        let syncErrorMessage = ((f) => {
            if (!isLength(f.email, {min: 1})) return 'Please enter an email address';
            if (!isEmail(f.email)) return 'Please enter a valid email address';
            if (!isLength(f.password, {min: 1})) return 'Please enter a password';
        })(fields);

        if (syncErrorMessage) {
            window.alert(syncErrorMessage);
            return;
        }

        this.setState({submitting: true});
        setTimeout(() => {
            this.setState({submitting: false});
        }, 2000);
    }
};

// Statics
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
