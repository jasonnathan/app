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
            currentTab: 'partnerPartups',
            loadingPartnerPartups: false,
            loadingSupporterPartups: false,
            endPartnerPartups: false,
            endSupporterPartups: false
        };
    }

    render() {
        const {currentTab} = this.state;
        let partups = this.props[currentTab];

        return (
            <Flex>
                <Flex.Shrink className="View--partups__tabs">
                    <ButtonGroup buttons={[
                        {key: 'partnerPartups', label: <span>Partners</span>},
                        {key: 'supporterPartups', label: <span>Supporters</span>}
                    ]} activeTab={currentTab} onClick={this.onTabClick.bind(this)} />
                </Flex.Shrink>
                <Flex.Stretch scroll onHitBottom={() => this.requestMore(currentTab)}>
                    {!partups || !partups.length &&
                        <EmptyState type="partups" />
                    }
                    <List>
                        {partups.map((partup, index) => (
                            <ListItem key={index}>
                                {this.renderPartup(partup)}
                            </ListItem>
                        ))}
                    </List>
                    {(currentTab === 'partnerPartups' && this.state.loadingPartnerPartups ||
                      currentTab === 'supporterPartups' && this.state.loadingSupporterPartups) &&
                        <Spinner infiniteScroll />
                    }
                </Flex.Stretch>
            </Flex>
        );
    }

    requestMore(tab) {
        if (tab === 'partnerPartups') {

            if (this.state.loadingPartnerPartups || this.state.endPartnerPartups) return;
            this.setState({loadingPartnerPartups: true});

            const beforeAmount = this.props.partnerPartups.length;
            this.props.requestMorePartnerPartups(() => {
                if (beforeAmount === this.props.partnerPartups.length) {
                    this.setState({endPartnerPartups: true});
                }

                this.setState({loadingPartnerPartups: false});
            });

        } else if (tab === 'supporterPartups') {

            if (this.state.loadingSupporterPartups || this.state.endSupporterPartups) return;
            this.setState({loadingSupporterPartups: true});

            const beforeAmount = this.props.supporterPartups.length;
            this.props.requestMoreSupporterPartups(() => {
                if (beforeAmount === this.props.supporterPartups.length) {
                    this.setState({endSupporterPartups: true});
                }

                this.setState({loadingSupporterPartups: false});
            });

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
    requestMoreSupporterPartups: React.PropTypes.func.isRequired
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
