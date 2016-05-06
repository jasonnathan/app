'use strict';

import React from 'react';
import c from 'classnames';
import { contains } from 'mout/array';
import { get } from 'mout/object';

import ActivityModel from '/imports/models/ActivityModel';
import Content from '/imports/components/Content';
import Paragraph from '/imports/components/Paragraph';
import Heading from '/imports/components/Heading';

const PartupUpdateContent = class PartupUpdateContent extends React.Component {
    render() {
        const content = this.renderContent();

        return (
            <div className={c('pa-PartupUpdateContent')}>
                {content &&
                    <Content>{content}</Content>
                }
            </div>
        );
    }

    renderContent() {
        const {update: u, updateData: d} = this.props;

        if (contains(['partups_message_added'], u.type)) {
            return (
                <Content.Text>
                    <Paragraph>{u.type_data.new_value}</Paragraph>
                </Content.Text>
            );
        }

        if (u.isActivityRelated()) {
            return (
                <Content.Text>
                    <Heading>{get(d, 'activity.name')}</Heading>
                </Content.Text>
            );
        }
    }
};

PartupUpdateContent.propTypes = {
    update: React.PropTypes.object.isRequired,
    updateData: React.PropTypes.shape({
        activity: React.PropTypes.instanceOf(ActivityModel)
    }).isRequired,
};

export default PartupUpdateContent;
