'use strict';

import React from 'react';

import Content from '/imports/components/Content';
import Paragraph from '/imports/components/Paragraph';

const EmptyState = class EmptyState extends React.Component {
    render() {
        const {type} = this.props;

        return (
            <Content>
                <Content.Text>
                    {type === 'notifications' &&
                        <Paragraph>No notifications yet</Paragraph>
                    }

                    {type === 'partups' &&
                        <Paragraph>No part-ups yet</Paragraph>
                    }

                    {type === 'tribes' &&
                        <Paragraph>No tribes yet</Paragraph>
                    }

                </Content.Text>
            </Content>
        );
    }
}

EmptyState.propTypes = {
    type: React.PropTypes.oneOf(['notifications', 'partups', 'tribes'])
};

export default EmptyState;
