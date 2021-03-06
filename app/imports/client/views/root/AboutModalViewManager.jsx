'use strict';

import React from 'react';
import { Container, UI, View, ViewManager } from '/imports/client/touchstonejs/lib';

import AboutContainer from '/imports/client/views/root/about-modal/AboutContainer';

const AboutModalViewManager = class AboutModalViewManager extends React.Component {
    render() {
        return (
            <Container>
                <UI.NavigationBar name="about-modal" />
                <ViewManager name="about-modal" defaultView="about">
                    <View name="about" component={AboutContainer} />
                </ViewManager>
            </Container>
        );
    }
};

export default AboutModalViewManager;
