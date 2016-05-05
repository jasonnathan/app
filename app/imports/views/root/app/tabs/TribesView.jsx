'use strict';

import React from 'react';

import Tile from '/imports/components/Tile';
import List from '/imports/components/List';
import ListItem from '/imports/components/ListItem';

const TribesView = class TribesView extends React.Component {
    render() {
        return (
            <div>
                <List>
                    <ListItem>
                        <Tile
                            imageSrc="http://www.cssdesignawards.com/cdasites/2014/201411/20141114011332.jpg"
                            label="Lifely" />
                    </ListItem>
                    <ListItem>
                        <Tile
                            imageSrc="https://startupjuncture.com/wp-content/uploads/2015/04/Partup_logo2.png"
                            label="Part-up" />
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
