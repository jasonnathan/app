'use strict';

import React from 'react';

import Paragraph from '/imports/client/components/Paragraph';

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
                <div className="pa-Tile__Image">
                    <figure style={{
                        backgroundImage: this.props.imageSrc && `url('${this.props.imageSrc}')`}}>
                    </figure>
                </div>
                <div className="pa-Tile__Label">
                    <Paragraph>{this.props.label}</Paragraph>
                </div>
                {!!this.props.updatesCount &&
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
