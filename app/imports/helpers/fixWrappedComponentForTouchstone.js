'use strict';

/**
 * Pass statics required by touchstonejs
 */
export default function fixWrappedComponentForTouchstone(Src, Dest) {
    Dest.navigationBar = Src.navigationBar;
    Dest.getNavigation = Src.getNavigation;
};
