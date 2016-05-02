'use strict';

import React from 'react';
import c from 'classnames';
import moment from 'moment';
import { translate } from 'react-i18next';

import Avatar from '/imports/components/Avatar';
import Heading from '/imports/components/Heading';
import Paragraph from '/imports/components/Paragraph';
import UserModel from '/imports/models/UserModel';

const PartupUpdateComment = class PartupUpdateComment extends React.Component {
    render() {
        const {type, author, content, createdAt} = this.props;
        const avatarImage = author.getAvatarImage();

        const className = c('pa-PartupUpdateComment', {
            //
        });

        const readableCreatedAt = moment(createdAt).format('LLL');

        return (
            <section className={className}>
                <div>
                    <Avatar src={avatarImage && avatarImage.getUrl('360x360')} />
                </div>
                <div>
                    <Paragraph>
                        <strong>{author.profile.name}</strong>
                        {content}
                    </Paragraph>
                    <Paragraph meta>{readableCreatedAt}</Paragraph>
                </div>
            </section>
        );
    }
};

PartupUpdateComment.propTypes = {
    type: React.PropTypes.string,
    author: React.PropTypes.instanceOf(UserModel).isRequired,
    content: React.PropTypes.string.isRequired,
    createdAt: React.PropTypes.instanceOf(Date).isRequired
};

export default PartupUpdateComment;
