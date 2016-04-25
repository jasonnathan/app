'use strict';

import React from 'react';
import c from 'classnames';
import { translate } from 'react-i18next';

import NotificationModel from '/imports/models/NotificationModel';
import ImageModel from '/imports/models/ImageModel';
import List from '/imports/components/List';
import ListItem from '/imports/components/ListItem';
import Avatar from '/imports/components/Avatar';
import Paragraph from '/imports/components/Paragraph';

const NotificationTile = class NotificationTile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nowDate: new Date()
        };
    }

    componentDidMount() {
        this.nowInterval = setInterval(this.updateNowDate.bind(this), 5000);
    }

    componentWillUnmount() {
        if (this.nowInterval) {
            clearInterval(this.nowInterval);
            delete this.nowInterval;
        }
    }

    updateNowDate() {
        this.setState({
            nowDate: new Date()
        });
    }

    onClick(event) {
        event.preventDefault();
        this.props.onClick();
    }

    render() {
        const {t, notification: n} = this.props;
        const {nowDate} = this.state;

        return (
            <a href="" onClick={this.onClick.bind(this)} className={c('pa-NotificationTile', {
                'pa-NotificationTile--new': n.new,
                'pa-NotificationTile--clicked': n.clicked
            })}>
                <div>
                    <Avatar notification src={n.getImage().getUrl('360x360')} />
                </div>
                <div>
                    <Paragraph><strong>{n.getText(t)}</strong></Paragraph>
                    <Paragraph meta>{n.getMetaText(t, nowDate)}</Paragraph>
                </div>
            </a>
        );
    }
};

NotificationTile.propTypes = {
    notification: React.PropTypes.instanceOf(NotificationModel).isRequired,
    onClick: React.PropTypes.func.isRequired
};

export default translate()(NotificationTile);
