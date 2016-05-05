'use strict';

import React from 'react';

import Paragraph from '/imports/components/Paragraph';

const Tile = class Tile extends React.Component {
    render() {
        if (this.props.onClick) {
            return (
                <a onClick={this.onClick.bind(this)} className="pa-Tile">
                    {this.renderContent()}
                </a>
            );
        }

        return (
            <div className="pa-Tile">
                {this.renderContent()}
            </div>
        );
    }

    renderContent() {
        return (
            <div>
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

    onClick(event) {
        event.preventDefault();
        this.props.onClick();
    }
};

Tile.propTypes = {
    imageSrc: React.PropTypes.string,
    label: React.PropTypes.string.isRequired,
    updatesCount: React.PropTypes.number,
    onClick: React.PropTypes.func
};

export default Tile;
