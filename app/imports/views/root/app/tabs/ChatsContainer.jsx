'use strict';

import meteorDataContainer from '/imports/services/meteorDataContainer';
import ChatsView from './ChatsView';
import Debug from '/imports/Debug';

export default meteorDataContainer(ChatsView, (props) => {
    const {} = props;
    Debug.tracker('ChatsContainer');

    return {
    };
});
