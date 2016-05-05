'use strict';

import React from 'react';

import NetworkModel from '/imports/models/NetworkModel';
import Tile from '/imports/components/Tile';
import List from '/imports/components/List';
import ListItem from '/imports/components/ListItem';

const TribesView = class TribesView extends React.Component {
    render() {
        const {networks} = this.props;

        return (
            <List>
                {networks.map((network, index) => (
                    <ListItem key={index}>
                        {this.renderNetwork(network)}
                    </ListItem>
                ))}
            </List>
        );
    }

    renderNetwork(network) {
        const networkImage = network.getImage();

        return (
            <Tile
                imageSrc={networkImage && networkImage.getUrl('80x80')}
                label={network.name}
                onClick={this.onNetworkClick.bind(this, network)} />
        );
    }

    onNetworkClick(network) {
        window.location = network.getWebsiteUrl();
    }
};

TribesView.propTypes = {
    networks: React.PropTypes.arrayOf(React.PropTypes.instanceOf(NetworkModel)).isRequired
};

TribesView.navigationBar = 'app';
TribesView.getNavigation = () => {
    return {
        title: 'Tribes'
    };
};

export default TribesView;
