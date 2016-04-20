'use strict';

import React from 'react';

import Content from '/imports/components/Content';

export default class PartupsView extends React.Component {
    render() {
        return (
            <Content>
                <Content.Text>
                    <p>Part-ups</p>
                </Content.Text>
            </Content>
        );
    }
};

PartupsView.propTypes = {};

PartupsView.navigationBar = 'tabs';
PartupsView.getNavigation = () => {
    return {
        title: 'Part-ups'
    };
};
