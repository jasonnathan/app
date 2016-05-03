'use strict';

import React from 'react';

const PartupTile = class PartupTile extends React.Component {
    render() {
        return (
            <div className="pa-PartupTile">
                {this.props.children}
            </div>
        );
    }
};

PartupTile.Image = class PartupTileImage extends React.Component {
    render() {
        return (
            <figure className="pa-PartupTile__Image" style={{
                backgroundImage: this.props.src && `url('${this.props.src}')`}}>
            </figure>
        );
    }
};

PartupTile.Stats = class PartupTileStats extends React.Component {
    render() {
        return (
            <section className="pa-PartupTile__Stats">
                {this.props.children}
            </section>
        );
    }
};

PartupTile.Image.propTypes = {
    src: React.PropTypes.string,
    alt: React.PropTypes.string
};

export default PartupTile;
