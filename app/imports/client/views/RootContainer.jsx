'use strict';

import { Meteor } from 'meteor/meteor';
import meteorDataContainer from '/imports/client/services/meteorDataContainer';
import RootViewManager from './RootViewManager';
import Debug from '/imports/client/Debug';
import '/imports/client/Connection';

export default meteorDataContainer(RootViewManager, (props) => {
    const {} = props;
    Debug.tracker('AppContainer');

    return {
        userId: Meteor.userId()
    };
});
