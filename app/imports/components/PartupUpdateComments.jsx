'use strict';

import React from 'react';
import c from 'classnames';

import PartupUpdateModel from '/imports/models/PartupUpdateModel';
import List from '/imports/components/List';
import ListItem from '/imports/components/ListItem';
import PartupUpdateComment from '/imports/components/PartupUpdateComment';

const PartupUpdateComments = class PartupUpdateComments extends React.Component {
    render() {
        return (
            <div className={c('pa-PartupUpdateComments')}>
                <List partupUpdateComments>
                    {this.props.partupUpdate.comments.map((comment, index) => {
                        const author = PartupUpdateModel.getUserForComment(comment);

                        return (
                            <ListItem key={index}>
                                <PartupUpdateComment
                                    type={comment.type}
                                    author={author}
                                    content={comment.content}
                                    createdAt={comment.created_at} />
                            </ListItem>
                        );
                    })}
                </List>
            </div>
        );
    }
};

PartupUpdateComments.propTypes = {
    partupUpdate: React.PropTypes.instanceOf(PartupUpdateModel).isRequired
};

export default PartupUpdateComments;
