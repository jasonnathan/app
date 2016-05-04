'use strict';

import React from 'react';

import Content from '/imports/components/Content';
import Paragraph from '/imports/components/Paragraph';
import ButtonGroup from '/imports/components/ButtonGroup';
import Button from '/imports/components/Button';
import Tile from '/imports/components/Tile';
import List from '/imports/components/List';
import ListItem from '/imports/components/ListItem';

const TribesView = class TribesView extends React.Component {
    render() {
        return (
            <div>

                <ButtonGroup>
                    <Button switch>Partners</Button>
                    <Button switch switchActive>Supporters</Button>
                </ButtonGroup>

                <List>
                    <ListItem>
                        <Tile>
                            <Tile.Image
                                src="http://media02.hongkiat.com/ww-flower-wallpapers/roundflower.jpg"
                                alt="Flower">
                            </Tile.Image>
                            <Paragraph>
                                Develop UX/design for Part-up apps
                            </Paragraph>
                            <Tile.Stats>
                                17
                            </Tile.Stats>
                        </Tile>
                    </ListItem>
                    <ListItem>
                        <Tile>
                            <Tile.Image
                                src="https://www.allaboutbirds.org/guide/bbimages/aab/images/blue-winged-warbler.jpg"
                                alt="Bird">
                            </Tile.Image>
                            <Paragraph>
                                Tribes: the next level
                            </Paragraph>
                        </Tile>
                    </ListItem>
                </List>

            </div>
        );
    }
};

TribesView.propTypes = {};

TribesView.navigationBar = 'app';
TribesView.getNavigation = () => {
    return {
        title: 'Tribes'
    };
};

export default TribesView;
