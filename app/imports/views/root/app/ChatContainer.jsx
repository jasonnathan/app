'use strict';

import meteorDataContainer from '/imports/services/meteorDataContainer';
import ChatView from './ChatView';
import Debug from '/imports/Debug';
import Connection from '/imports/Connection';

export default meteorDataContainer(ChatView, (props) => {
    const {} = props;
    Debug.tracker('ChatContainer');

    return {
        //
    };
});
