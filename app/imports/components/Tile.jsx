'use strict';

import React from 'react';

import Paragraph from '/imports/components/Paragraph';

const Tile = class Tile extends React.Component {
    render() {
        return (
            <div className="pa-Tile">
                <figure className="pa-Tile__Image" style={{
                    backgroundImage: this.props.imageSrc && `url('${this.props.imageSrc}')`}}>
                </figure>
                <Paragraph>{this.props.label}</Paragraph>
                {this.props.updatesCount &&
                    <span className="pa-Tile__Stats">
                        {this.props.updatesCount}
                    </span>
                }
            </div>
        );
    }
};

Tile.propTypes = {
    imageSrc: React.PropTypes.string,
    label: React.PropTypes.string.isRequired,
    updatesCount: React.PropTypes.number
};

export default Tile;
