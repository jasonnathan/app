'use strict';

import React from 'react';
import c from 'classnames';

import Content from '/imports/components/Content';
import Paragraph from '/imports/components/Paragraph';

const PartupUpdateContentPreview = class PartupUpdateContentPreview extends React.Component {
    render() {
        return (
            <div className={c('pa-PartupUpdateContentPreview')}>
                <Content>
                    <Content.Text>
                        <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pretium pretium tempor. Ut eget imperdiet neque. In volutpat ante semper diam molestie, et aliquam erat laoreet.</Paragraph>
                    </Content.Text>
                </Content>
            </div>
        );
    }
};

PartupUpdateContentPreview.propTypes = {
    //
};

PartupUpdateContentPreview.defaultProps = {
    //
};

export default PartupUpdateContentPreview;
