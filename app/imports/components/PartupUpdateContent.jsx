'use strict';

import React from 'react';
import c from 'classnames';
import { contains } from 'mout/array';
import { get } from 'mout/object';
import { stripHtmlTags } from 'mout/string';
import translate from '/imports/services/translate';

import Button from '/imports/components/Button';
import parseMentions from '/imports/services/parseMentions';
import { ActivityModel, ImageModel, UserModel, PartupModel } from '/imports/models';
import Content from '/imports/components/Content';
import Paragraph from '/imports/components/Paragraph';
import Heading from '/imports/components/Heading';
import Avatar from '/imports/components/Avatar';
import autolink from '/imports/services/autolink';

const PartupUpdateContent = class PartupUpdateContent extends React.Component {
    render() {
        const content = this.renderContent();

        return (
            <div className={c('pa-PartupUpdateContent')}>
                {content}
            </div>
        );
    }

    renderContent() {
        const {t, update: u, updateData: d} = this.props;


        if (contains(['partups_message_added'], u.type)) {
            const textParts = autolink(parseMentions(stripHtmlTags(u.type_data.new_value).replace(/\n/g, '<br />')));

            if (!d.user || !d.partup) return;

            const image = d.user.getAvatarImage();

            return (
                <Content>

                    {/* Message looks like notification */}
                    <div className='pa-Notification pa-Notification--detail'>
                        <div className="pa-Notification__content">
                            <div key="avatar">
                                <Avatar src={image && image.getUrl('360x360')} />
                            </div>
                            <div key="content">
                                <Heading>{d.user.getFirstname()} added a message</Heading>
                                <Paragraph meta>{u.getMetaText(t, new Date())}</Paragraph>
                            </div>
                        </div>
                    </div>

                    <Content.Text>
                        <Paragraph>{textParts}</Paragraph>
                    </Content.Text>
                </Content>
            );
        }

        if (u.isActivityRelated()) {
            return (
                <Content>
                    <Content.Text>
                        <Heading>{get(d, 'activity.name')}</Heading>
                    </Content.Text>
                </Content>
            );
        }
    }
};

PartupUpdateContent.propTypes = {
    update: React.PropTypes.object.isRequired,
    updateData: React.PropTypes.shape({
        activity: React.PropTypes.instanceOf(ActivityModel),
        user: React.PropTypes.instanceOf(UserModel),
        partup: React.PropTypes.instanceOf(PartupModel)
    }).isRequired,
};

export default translate()(PartupUpdateContent);
