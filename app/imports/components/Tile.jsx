'use strict';

import React from 'react';

const Tile = class Tile extends React.Component {
    render() {
        return (
            <div className="pa-Tile">
                {this.props.children}
            </div>
        );
    }
};

Tile.Image = class TileImage extends React.Component {
    render() {
        return (
            <figure className="pa-Tile__Image" style={{
                backgroundImage: this.props.src && `url('${this.props.src}')`}}>
            </figure>
        );
    }
};

Tile.Stats = class TileStats extends React.Component {
    render() {
        return (
            <span className="pa-Tile__Stats">
                {this.props.children}
            </span>
        );
    }
};

Tile.Image.propTypes = {
    src: React.PropTypes.string,
    alt: React.PropTypes.string
};

export default Tile;
