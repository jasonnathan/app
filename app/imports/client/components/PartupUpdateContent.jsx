'use strict';

import React from 'react';
import c from 'classnames';
import { contains } from 'mout/array';
import { get } from 'mout/object';
import { stripHtmlTags } from 'mout/string';
import translate from '/imports/client/services/translate';
import marked from 'marked';
import highlightJs from 'highlight.js';

import Button from '/imports/client/components/Button';
import parseMentions from '/imports/client/services/parseMentions';
import { ActivityModel, ImageModel, UserModel, PartupModel } from '/imports/client/models';
import Content from '/imports/client/components/Content';
import Paragraph from '/imports/client/components/Paragraph';
import Heading from '/imports/client/components/Heading';
import Avatar from '/imports/client/components/Avatar';
import autolink from '/imports/client/services/autolink';

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
            let renderer = new marked.Renderer();
            renderer.paragraph = function(text) {
                return '<p class="pa-Paragraph">' + text + '</p>';
            };

            marked.setOptions({
                renderer: renderer,
                highlight: function(code) {
                    return highlightJs.highlightAuto(code).value;
                }
            });

            const textParts = autolink(
                parseMentions(
                    marked(
                        stripHtmlTags(u.type_data.new_value)
                    ).replace(/\n/g, '<br />')
                )
            );

            const text = u.type_data.new_value;

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
                        {textParts}
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
