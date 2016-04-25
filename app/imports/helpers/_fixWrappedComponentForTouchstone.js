'use strict';

/**
 * Pass statics required by touchstonejs
 */
export default function _fixWrappedComponentForTouchstone(Src, Dest) {
    Dest.navigationBar = Src.navigationBar;
    Dest.getNavigation = Src.getNavigation;
};
