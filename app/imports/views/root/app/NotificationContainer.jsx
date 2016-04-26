'use strict';

import { Meteor } from 'meteor/meteor';

import meteorDataContainer from '/imports/helpers/meteorDataContainer';
import NotificationView from './NotificationView';
import Debug from '/imports/Debug';

export default meteorDataContainer(NotificationView, (props) => {
    const {notification} = props;
    Debug.tracker('NotificationContainer');

    return {
        //
    };
});
