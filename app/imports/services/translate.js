'use strict';

import { translate as i18nextTanslate } from 'react-i18next';

import passPropsForTouchstone from '/imports/services/passPropsForTouchstone';

const translate = (...args) => {
    return (Component) => {
        return passPropsForTouchstone(
            i18nextTanslate.apply(null, args)(Component),
            Component
        )
    };
};

export default translate;
