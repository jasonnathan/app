'use strict';

import React from 'react';
import c from 'classnames';
import { contains } from 'mout/array';
import { get } from 'mout/object';
import { stripHtmlTags } from 'mout/string';

import Button from '/imports/components/Button';
import parseMentions from '/imports/services/parseMentions';
import { ActivityModel } from '/imports/models';
import Content from '/imports/components/Content';
import Paragraph from '/imports/components/Paragraph';
import Heading from '/imports/components/Heading';
import autolink from '/imports/services/autolink';

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

        const textParts = autolink(parseMentions(stripHtmlTags(u.type_data.new_value).replace(/\n/g, '<br />')));

        if (contains(['partups_message_added'], u.type)) {
            return (
                <Content.Text>
                    <Paragraph>{textParts}</Paragraph>
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
