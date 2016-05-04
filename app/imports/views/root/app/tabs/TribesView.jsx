'use strict';

import React from 'react';

import Content from '/imports/components/Content';
import Paragraph from '/imports/components/Paragraph';
import Tile from '/imports/components/Tile';
import List from '/imports/components/List';
import ListItem from '/imports/components/ListItem';

const TribesView = class TribesView extends React.Component {
    render() {
        return (
            <div>
                <List>
                    <ListItem>
                        <Tile>
                            <Tile.Image
                                src="http://www.cssdesignawards.com/cdasites/2014/201411/20141114011332.jpg"
                                alt="Lifely">
                            </Tile.Image>
                            <Paragraph>
                                Lifely
                            </Paragraph>
                            <Tile.Stats>
                                17
                            </Tile.Stats>
                        </Tile>
                    </ListItem>
                    <ListItem>
                        <Tile>
                            <Tile.Image
                                src="https://startupjuncture.com/wp-content/uploads/2015/04/Partup_logo2.png"
                                alt="Part-up">
                            </Tile.Image>
                            <Paragraph>
                                Part-up
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
