'use strict';

import React from 'react';

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
            currentTab: 'partnerPartups'
        };
    }

    render() {
        const {currentTab} = this.state;
        let partups = this.props[currentTab] || [];
        const partnerPartupsLoading = currentTab === 'partnerPartups' && this.props.partnerPartupsLoading;
        const supporterPartupsLoading = currentTab === 'supporterPartups' && this.props.supporterPartupsLoading;

        return (
            <Flex>
                <Flex.Shrink className="View--partups__tabs">
                    <ButtonGroup buttons={[
                        {key: 'partnerPartups', label: <span>Partners</span>},
                        {key: 'supporterPartups', label: <span>Supporters</span>}
                    ]} activeTab={currentTab} onClick={this.onTabClick.bind(this)} />
                </Flex.Shrink>
                <Flex.Stretch scroll onHitBottom={() => this.requestMore(currentTab)}>
                    {!partnerPartupsLoading && !supporterPartupsLoading && !partups.length &&
                        <EmptyState type="partups" />
                    }
                    <List>
                        {partups.map((partup, index) => (
                            <ListItem key={index}>
                                {this.renderPartup(partup)}
                            </ListItem>
                        ))}
                    </List>
                    {(partnerPartupsLoading || supporterPartupsLoading) &&
                        <Spinner infiniteScroll />
                    }
                </Flex.Stretch>
            </Flex>
        );
    }

    requestMore(tab) {
        if (tab === 'partnerPartups' && !this.props.partnerPartupsLoading && !this.props.partnerPartupsEnd) {
            this.props.requestMorePartnerPartups();
        } else if (tab === 'supporterPartups' && !this.props.supporterPartupsLoading && !this.props.supporterPartupsEnd) {
            this.props.requestMoreSupporterPartups();
        }
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
    }

    onPartupClick(partup) {
        openWeb(partup.getWebsiteUrl());
    }
};

PartupsView.propTypes = {
    supporterPartups: React.PropTypes.arrayOf(React.PropTypes.instanceOf(PartupModel)).isRequired,
    partnerPartups: React.PropTypes.arrayOf(React.PropTypes.instanceOf(PartupModel)).isRequired,
    requestMorePartnerPartups: React.PropTypes.func.isRequired,
    requestMoreSupporterPartups: React.PropTypes.func.isRequired,
    partnerPartupsLoading: React.PropTypes.bool.isRequired,
    partnerPartupsEnd: React.PropTypes.bool.isRequired,
    supporterPartupsLoading: React.PropTypes.bool.isRequired,
    supporterPartupsEnd: React.PropTypes.bool.isRequired
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
