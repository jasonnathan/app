'use strict';

import React from 'react';
import { Container, UI, Link, ViewManager, View } from 'touchstonejs';

import NavButton from '../../../NavButton';
import Content from '../../../Content';
import Paragraph from '../../../Paragraph';
import Form from '../../../Form';
import Input from '../../../Input';
import Button from '../../../Button';

export default class LoginWithEmailView extends React.Component {
    render() {
        return (
            <Container fill scrollable>
                <Content>
                    <Content.Text>
                        <Paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque neque ut ratione veritatis voluptas, quam explicabo modi, aperiam laboriosam? Maiores minima molestias magni inventore fuga.</Paragraph>
                    </Content.Text>
                    <Content.Block>
                        <Form>
                            <Input.Text email name="email" placeholder="Email address" />
                            <Input.Text password name="password" placeholder="Password" />
                            <Form.Footer>
                                <Form.Footer.Submit>
                                    <Button submit>Sign in</Button>
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
