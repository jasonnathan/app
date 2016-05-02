'use strict';

import React from 'react';
import c from 'classnames';

import Content from '/imports/components/Content';
import Paragraph from '/imports/components/Paragraph';
import PartupUpdateModel from '/imports/models/PartupUpdateModel';

const PartupUpdateComments = class PartupUpdateComments extends React.Component {
    render() {
        return (
            <div className={c('pa-PartupUpdateComments')}>
                <Content>
                    <Content.Text>
                        <Paragraph>{this.props.partupUpdate.comments_count}</Paragraph>
                    </Content.Text>
                </Content>
            </div>
        );
    }
};

PartupUpdateComments.propTypes = {
    partupUpdate: React.PropTypes.instanceOf(PartupUpdateModel).isRequired
};

export default PartupUpdateComments;
