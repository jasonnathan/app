'use strict';

import React from 'react';

import Content from '/imports/components/Content';
import Paragraph from '/imports/components/Paragraph';
import PartupModel from '/imports/models/PartupModel';

export default class PartupsView extends React.Component {
    render() {
        return (
            <Content>
                <Content.Text>
                    <Paragraph>Supporter</Paragraph>
                    <ul>
                        {this.props.supporterPartups.map(this.renderPartup)}
                    </ul>
                </Content.Text>
                <Content.Text>
                    <Paragraph>Partner</Paragraph>
                    <ul>
                        {this.props.partnerPartups.map(this.renderPartup)}
                    </ul>
                </Content.Text>
            </Content>
        );
    }

    renderPartup(partup, index) {
        return <li key={index}>{partup.name}</li>;
    }
};

PartupsView.propTypes = {
    supporterPartups: React.PropTypes.arrayOf(React.PropTypes.instanceOf(PartupModel)).isRequired,
    partnerPartups: React.PropTypes.arrayOf(React.PropTypes.instanceOf(PartupModel)).isRequired
};

PartupsView.navigationBar = 'tabs';
PartupsView.getNavigation = () => {
    return {
        title: 'Part-ups'
    };
};
