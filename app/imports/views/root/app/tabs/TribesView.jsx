'use strict';

import React from 'react';
import { Container } from '/imports/touchstonejs/lib';

import transitionTo from '/imports/services/transitionTo';
import NavButton from '/imports/components/NavButton';
import openWeb from '/imports/services/openWeb';
import NetworkModel from '/imports/models/NetworkModel';
import Content from '/imports/components/Content';
import Heading from '/imports/components/Heading';
import Paragraph from '/imports/components/Paragraph';
import Button from '/imports/components/Button';


const TribesView = class TribesView extends React.Component {
    render() {
        let {networks} = this.props;

        return (
            <Container fill>
                <Content>
                    <Content.Text>
                        <Heading>Push notifications</Heading>
                        <Paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut pretium tempor.</Paragraph>
                    </Content.Text>
                    <figure>
                        <img src="../../../images/notifications-warning.png"/>
                        <span className='pa-notification-warning-text'>Part-up Would Like to Send You Notifications...</span>
                        <span className='pa-notification-warning-decline'>Don't Allow</span>
                        <span className='pa-notification-warning-accept'>OK</span>
                    </figure>
                    <Button>Got it!</Button>
                </Content>
            </Container>
        );
    }
};

TribesView.propTypes = {
    networks: React.PropTypes.arrayOf(React.PropTypes.instanceOf(NetworkModel)).isRequired
};

TribesView.navigationBar = 'app';
TribesView.getNavigation = (props, app) => {
    return {
        title: 'Tribes',
        rightLabel: <NavButton right icon="icon_info" />,
        rightAction: () => {
            app.transitionTo('root:about-modal', {
                transition: 'show-from-bottom'
            });
        }
    };
};

export default TribesView;
