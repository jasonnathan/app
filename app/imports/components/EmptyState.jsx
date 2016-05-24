'use strict';

import React from 'react';

import Content from '/imports/components/Content';
import Paragraph from '/imports/components/Paragraph';

const EmptyState = class EmptyState extends React.Component {
    render() {
        const {type} = this.props;

        return (
            <div className="pa-EmptyState">
                <Content>
                    {type === 'notifications' &&
                        <Content.Text>
                            <img src="images/empty_states/notifications.png" />
                            <Paragraph>No notifications yet</Paragraph>
                        </Content.Text>
                    }

                    {type === 'chats' &&
                        <Content.Text>
                            <img src="images/empty_states/chats.png" />
                            <Paragraph>No chats yet</Paragraph>
                        </Content.Text>
                    }

                    {type === 'partups' &&
                        <Content.Text>
                            <img src="images/empty_states/partups.png" />
                            <Paragraph>No part-ups yet</Paragraph>
                        </Content.Text>
                    }

                    {type === 'tribes' &&
                        <Content.Text>
                            <img src="images/empty_states/tribes.png" />
                            <Paragraph>No tribes yet</Paragraph>
                        </Content.Text>
                    }
                </Content>
            </div>
        );
    }
}

EmptyState.propTypes = {
    type: React.PropTypes.oneOf(['notifications', 'partups', 'tribes'])
};

export default EmptyState;
