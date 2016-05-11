'use strict';

import meteorDataContainer from '/imports/services/meteorDataContainer';
import AboutView from './AboutView';
import Debug from '/imports/Debug';

export default meteorDataContainer(AboutView, (props) => {
    const {} = props;
    Debug.tracker('AboutContainer');

    return {
    };
});
