'use strict';

import { Meteor } from 'meteor/meteor';
import meteorDataContainer from '/imports/services/meteorDataContainer';
import RootViewManager from './RootViewManager';
import Debug from '/imports/Debug';
import '/imports/Connection';

export default meteorDataContainer(RootViewManager, (props) => {
    const {} = props;
    Debug.tracker('AppContainer');

    return {
        userId: Meteor.userId()
    };
});
