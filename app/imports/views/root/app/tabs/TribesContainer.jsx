'use strict';

import { Meteor } from 'meteor/meteor';

import meteorDataContainer from '/imports/helpers/meteorDataContainer';
import TribesView from './TribesView';
import Debug from '/imports/Debug';

export default meteorDataContainer(TribesView, (props) => {
    const {} = props;
    Debug.tracker('TribesContainer');

    return {
        //
    };
});
