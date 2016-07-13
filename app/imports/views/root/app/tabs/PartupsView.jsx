'use strict';

import React from 'react';
import { findDOMNode } from 'react-dom';

import transitionTo from '/imports/services/transitionTo';
import NavButton from '/imports/components/NavButton';
import openWeb from '/imports/services/openWeb';
import Content from '/imports/components/Content';
import { PartupModel } from '/imports/models';
import ButtonGroup from '/imports/components/ButtonGroup';
import Tile from '/imports/components/Tile';
import List from '/imports/components/List';
import ListItem from '/imports/components/ListItem';
import Flex from '/imports/components/Flex';
import EmptyState from '/imports/components/EmptyState';
import Spinner from '/imports/components/Spinner';

const PartupsView = class PartupsView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTab: 'byPartner'
        };
    }

    render() {
        const {currentTab} = this.state;
        const partupsProps = this.props.partups && this.props.partups[currentTab];
        const {data: partups, loading, loadMore, endReached} = partupsProps || {};

        return (
            <Flex>
                <Flex.Shrink className="View--partups__tabs">
                    <ButtonGroup buttons={[
                        {key: 'byPartner', label: <span>Partners</span>},
                        {key: 'bySupporter', label: <span>Supporters</span>}
                    ]} activeTab={currentTab} onClick={this.onTabClick.bind(this)} />
                </Flex.Shrink>

                {partupsProps &&
                    <Flex.Stretch scroll onHitBottom={() => !loading && !endReached && loadMore()}>
                        {!loading && !partups.length &&
                            <EmptyState type="partups" />
                        }

                        <List tiles>
                            {partups.map((partup, index) => (
                                <ListItem key={index}>
                                    {this.renderPartup(partup)}
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

    renderPartup(partup) {
        const partupImage = partup.getImage();

        return (
            <Tile
                imageSrc={partupImage && partupImage.getUrl('80x80')}
                label={partup.name}
                updatesCount={partup.getNewUpdatesCount(this.props.loggedInUser._id)}
                onClick={this.onPartupClick.bind(this, partup)} />
        );
    }

    onTabClick(tab) {
        this.setState({currentTab: tab});

        findDOMNode(this)
            .querySelector('.pa-Flex__Stretch--scroll')
            .scrollTop = 0;
    }

    onPartupClick(partup) {
        openWeb(partup.getWebsiteUrl());
    }
};

PartupsView.propTypes = {
    partups: React.PropTypes.shape({
        byPartner: React.PropTypes.shape({
            data: React.PropTypes.arrayOf(React.PropTypes.instanceOf(PartupModel)).isRequired,
            loading: React.PropTypes.bool.isRequired,
            endReached: React.PropTypes.bool.isRequired,
            loadMore: React.PropTypes.func.isRequired
        }).isRequired,
        bySupporter: React.PropTypes.shape({
            data: React.PropTypes.arrayOf(React.PropTypes.instanceOf(PartupModel)).isRequired,
            loading: React.PropTypes.bool.isRequired,
            endReached: React.PropTypes.bool.isRequired,
            loadMore: React.PropTypes.func.isRequired
        }).isRequired
    })
};

PartupsView.navigationBar = 'app';
PartupsView.getNavigation = (props, app) => {
    return {
        title: 'Part-ups',
        rightLabel: <NavButton right icon="icon_info" />,
        rightAction: () => {
            app.transitionTo('root:about-modal', {
                transition: 'show-from-bottom'
            });
        },
    };
};

export default PartupsView;
