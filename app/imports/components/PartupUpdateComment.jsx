'use strict';

import React from 'react';
import c from 'classnames';
import moment from 'moment';
import { translate } from 'react-i18next';
import { formatDate } from 'part-up-js-helpers';
import { stripHtmlTags } from 'mout/string';

import parseMentions from '/imports/services/parseMentions';
import Avatar from '/imports/components/Avatar';
import Heading from '/imports/components/Heading';
import Paragraph from '/imports/components/Paragraph';
import { UserModel } from '/imports/models';
import autolink from '/imports/services/autolink';

const PartupUpdateComment = class PartupUpdateComment extends React.Component {
    render() {
        const {type, author, content, createdAt} = this.props;
        const avatarImage = author.getAvatarImage();

        const className = c('pa-PartupUpdateComment', {
            //
        });

        const readableCreatedAt = formatDate.relativeWithThreshold(createdAt);

        const text = autolink(parseMentions(stripHtmlTags(content).replace(/\n/g, '<br />')));

        return (
            <section className={className}>
                <div>
                    <Avatar src={avatarImage && avatarImage.getUrl('360x360')} />
                </div>
                <div>
                    <Paragraph>
                        <strong>{author.profile.name}</strong>
                        {text}
                    </Paragraph>
                    <Paragraph meta>{readableCreatedAt}</Paragraph>
                </div>
            </section>
        );
    }

    onMentionClick(userIds, groupType) {
        console.log(`clicked ${userIds.join(', ')} with grouptype ${groupType}`);
    }
};

PartupUpdateComment.propTypes = {
    type: React.PropTypes.string,
    author: React.PropTypes.instanceOf(UserModel).isRequired,
    content: React.PropTypes.string.isRequired,
    createdAt: React.PropTypes.instanceOf(Date).isRequired
};

export default PartupUpdateComment;
