'use strict';

import React from 'react';

import Content from '/imports/components/Content';
import Paragraph from '/imports/components/Paragraph';
import Button from '/imports/components/Button';
import PartupTile from '/imports/components/PartupTile';
import List from '/imports/components/List';
import ListItem from '/imports/components/ListItem';

const TribesView = class TribesView extends React.Component {
    render() {
        return (
            <Content>
                <Content.Block>
                    <Button>Tribes</Button>
                    <Button>Tribes</Button>
                </Content.Block>
                <Content.Block>
                    <List>
                        <ListItem>
                            <PartupTile>
                                <PartupTile.Image
                                    src="http://media02.hongkiat.com/ww-flower-wallpapers/roundflower.jpg"
                                    alt="Flower">
                                </PartupTile.Image>
                                <Paragraph>
                                    Some text to make an example...
                                </Paragraph>
                                <PartupTile.Stats>
                                    7
                                </PartupTile.Stats>
                            </PartupTile>
                        </ListItem>
                    </List>
                </Content.Block>
            </Content>
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
