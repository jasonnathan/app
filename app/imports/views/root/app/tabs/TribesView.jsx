'use strict';

import React from 'react';

import Content from '/imports/components/Content';
import Paragraph from '/imports/components/Paragraph';

const TribesView = class TribesView extends React.Component {
    render() {
        return (
            <Content>
                <Content.Text>
                    <Paragraph>Tribes</Paragraph>
                </Content.Text>
            </Content>
        );
    }
};

TribesView.propTypes = {};

TribesView.navigationBar = 'app';
TribesView.getNavigation = () => {
    return {
        title: 'Tribes'
    };
};

export default TribesView;
