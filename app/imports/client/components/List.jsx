'use strict';

import React from 'react';
import c from 'classnames';

const List = class List extends React.Component {
    render() {
        return (
            <ul className={c('pa-List', {
                'pa-List--buttons': this.props.buttons,
                'pa-List--notifications': this.props.notifications,
                'pa-List--partup-update-comments': this.props.partupUpdateComments,
                'pa-List--partup-update-images': this.props.partupUpdateImages,
                'pa-List--partup-update-documents': this.props.partupUpdateDocuments,
                'pa-List--inline': this.props.inline,
                'pa-List--stats': this.props.stats,
                'pa-List--tiles': this.props.tiles
            })}>
                {this.props.children}
            </ul>
        );
    }
};

List.propTypes = {
    buttons: React.PropTypes.bool,
    notifications: React.PropTypes.bool,
    partupUpdateComments: React.PropTypes.bool,
    partupUpdateImages: React.PropTypes.bool,
    partupUpdateDocuments: React.PropTypes.bool
};

List.defaultProps = {
    buttons: false,
    notifications: false,
    partupUpdateComments: false
};

export default List;
