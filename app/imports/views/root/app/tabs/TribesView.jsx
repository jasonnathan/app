'use strict';

import React from 'react';

import Content from '/imports/components/Content';

export default class TribesView extends React.Component {
    render() {
        return (
            <Content>
                <Content.Text>
                    <p>Tribes</p>
                </Content.Text>
            </Content>
        );
    }
};

TribesView.propTypes = {};

TribesView.navigationBar = 'tabs';
TribesView.getNavigation = () => {
    return {
        title: 'Tribes'
    };
};
