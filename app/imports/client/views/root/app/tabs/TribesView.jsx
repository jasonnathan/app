'use strict';

import React from 'react';

import transitionTo from '/imports/client/services/transitionTo';
import NavButton from '/imports/client/components/NavButton';
import openWeb from '/imports/client/services/openWeb';
import { NetworkModel } from '/imports/client/models';
import Tile from '/imports/client/components/Tile';
import List from '/imports/client/components/List';
import ListItem from '/imports/client/components/ListItem';
import Flex from '/imports/client/components/Flex';
import EmptyState from '/imports/client/components/EmptyState';
import Spinner from '/imports/client/components/Spinner';

const TribesView = class TribesView extends React.Component {
    render() {
        const networksProps = this.props.networks;
        const {data: networks, loading, loadMore, endReached} = networksProps || {};

        return (
            <Flex>
                {networksProps &&
                    <Flex.Stretch scroll onHitBottom={() => !loading && !endReached && loadMore()}>
                        {!networks || !networks.length &&
                            <EmptyState type="tribes" />
                        }

                        <List tiles>
                            {networks.map((network, index) => (
                                <ListItem key={index}>
                                    {this.renderNetwork(network)}
                                </ListItem>
                            ))}
                        </List>

                        {loading &&
                            <Spinner infiniteScroll />
                        }
                    </Flex.Stretch>
                }
            </Flex>
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
    networks: React.PropTypes.shape({
        data: React.PropTypes.arrayOf(React.PropTypes.instanceOf(NetworkModel)).isRequired,
        loading: React.PropTypes.bool.isRequired,
        endReached: React.PropTypes.bool.isRequired,
        loadMore: React.PropTypes.func.isRequired
    })
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
