'use strict';

import React from 'react';
import c from 'classnames';
import { contains } from 'mout/array';
import { get } from 'mout/object';
import { stripHtmlTags } from 'mout/string';
import translate from '/imports/client/services/translate';
import marked from 'marked';
import highlightJs from 'highlight.js';
import Connection from '/imports/client/Connection';

import Button from '/imports/client/components/Button';
import parseMentions from '/imports/client/services/parseMentions';
import { ActivityModel, ImageModel, UserModel, PartupModel } from '/imports/client/models';
import Content from '/imports/client/components/Content';
import Paragraph from '/imports/client/components/Paragraph';
import Heading from '/imports/client/components/Heading';
import Avatar from '/imports/client/components/Avatar';
import List from '/imports/client/components/List';
import ListItem from '/imports/client/components/ListItem';
import autolink from '/imports/client/services/autolink';
import openWeb from '/imports/client/services/openWeb';
import getSvgForDocument from '/imports/client/services/getSvgForDocument';

const PartupUpdateContent = class PartupUpdateContent extends React.Component {
  componentWillReceiveProps(nextProps) {
    this.checkDocuments(nextProps.update);
  }

  checkDocuments({ type_data = {} }) {
    const documentIds = (type_data.documents || []).filter((d) => typeof d === 'string');

    if (documentIds.length > 0) {
      Connection.call('files.get', documentIds, (e, r) => {
        if (!e && Array.isArray(r)) {
          this.setState({
            documents: r,
          });
        }
      });
    } else {
      this.setState({
        documents: type_data.documents || [],
      })
    }
  }

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

            // Partup update images
            const imageIds = u.type_data.images || [];
            const images = imageIds.map((imageId) => ImageModel.findOne(imageId));
            const imageUrls = images.map((image) => image.getUrl());

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

                    {imageUrls.length > 0 &&
                        <Content.Block>
                            <List inline partupUpdateImages>
                                {imageUrls.map((url, index) => (
                                    <ListItem key={index}>
                                        <a href='' onClick={(event) => {
                                            event.preventDefault();
                                            openWeb(url);
                                        }} style={{
                                            backgroundImage: `url('${url}')`
                                        }} />
                                    </ListItem>
                                ))}
                            </List>
                        </Content.Block>
                    }

                    {this.state.documents.length > 0 &&
                        <Content.Block>
                            <List inline partupUpdateDocuments>
                                {this.state.documents.map((doc, index) => (
                                    <ListItem key={index}>
                                        <a href='' onClick={(event) => {
                                            event.preventDefault();
                                            openWeb(doc.link);
                                        }}>
                                            <img src={getSvgForDocument(doc)} />
                                            <span>{doc.name}</span>
                                        </a>
                                    </ListItem>
                                ))}
                            </List>
                        </Content.Block>
                    }
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
