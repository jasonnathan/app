'use strict';

import React from 'react';
import c from 'classnames';

import Content from '/imports/components/Content';
import Paragraph from '/imports/components/Paragraph';

const PartupUpdateContent = class PartupUpdateContent extends React.Component {
    render() {
        return (
            <div className={c('pa-PartupUpdateContent')}>
                <Content>
                    <Content.Text>
                        <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pretium pretium tempor. Ut eget imperdiet neque. In volutpat ante semper diam molestie, et aliquam erat laoreet.</Paragraph>
                    </Content.Text>
                </Content>
            </div>
        );
    }
};

PartupUpdateContent.propTypes = {
    update: React.PropTypes.object.isRequired
};

export default PartupUpdateContent;
