'use strict';

import React from 'react';

import Content from '/imports/components/Content';
import PartupModel from '/imports/models/PartupModel';
import ButtonGroup from '/imports/components/ButtonGroup';
import Tile from '/imports/components/Tile';
import List from '/imports/components/List';
import ListItem from '/imports/components/ListItem';

const PartupsView = class PartupsView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTab: 'partnerPartups'
        };
    }
    render() {
        const {currentTab} = this.state;

        return (
            <div>
                <ButtonGroup buttons={[
                    {key: 'partnerPartups', label: <span>Partners</span>},
                    {key: 'supporterPartups', label: <span>Supporters</span>}
                ]} activeTab={currentTab} onClick={this.onTabClick.bind(this)} />

                <List>
                    {this.props[currentTab].map((partup, index) => (
                        <ListItem key={index}>
                            {this.renderPartup(partup)}
                        </ListItem>
                    ))}
                </List>
            </div>
        );
    }

    renderPartup(partup) {
        const partupImage = partup.getImage();

        return (
            <Tile
                imageSrc={partupImage && partupImage.getUrl('80x80')}
                label={partup.name}
                updatesCount={partup.getNewUpdatesCount()}
                onClick={this.onPartupClick.bind(this, partup)} />
        );
    }

    onTabClick(tab) {
        this.setState({currentTab: tab});
    }

    onPartupClick(partup) {
        window.location = partup.getWebsiteUrl();
    }
};

PartupsView.propTypes = {
    supporterPartups: React.PropTypes.arrayOf(React.PropTypes.instanceOf(PartupModel)).isRequired,
    partnerPartups: React.PropTypes.arrayOf(React.PropTypes.instanceOf(PartupModel)).isRequired
};

PartupsView.navigationBar = 'app';
PartupsView.getNavigation = () => {
    return {
        title: 'Part-ups'
    };
};

export default PartupsView;
