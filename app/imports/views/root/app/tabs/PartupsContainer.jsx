'use strict';

import { Meteor } from 'meteor/meteor';

import meteorDataContainer from '/imports/helpers/meteorDataContainer';
import PartupsView from './PartupsView';
import Debug from '/imports/Debug';

export default meteorDataContainer(PartupsView, (props) => {
    const {} = props;
    Debug.tracker('PartupsContainer');

    return {
        //
    };
});
