'use strict';

import React from 'react';
import { Container } from '/imports/touchstonejs/lib';

import transitionTo from '/imports/services/transitionTo';
import NavButton from '/imports/components/NavButton';
import openWeb from '/imports/services/openWeb';
import NetworkModel from '/imports/models/NetworkModel';
import Tile from '/imports/components/Tile';
import List from '/imports/components/List';
import ListItem from '/imports/components/ListItem';
import EmptyState from '/imports/components/EmptyState';

const TribesView = class TribesView extends React.Component {
    render() {
        let {networks} = this.props;

        return (
            <Container fill scrollable>
                {!networks || !networks.length &&
                    <EmptyState type="tribes" />
                }
                <List>
                    {networks.map((network, index) => (
                        <ListItem key={index}>
                            {this.renderNetwork(network)}
                        </ListItem>
                    ))}
                </List>
            </Container>
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
        openWeb(network.getWebsiteUrl());
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
