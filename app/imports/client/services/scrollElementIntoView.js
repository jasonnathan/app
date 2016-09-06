'use strict';

const OFFSET = 15;

export default (element) => {
    const $element = $(element);
    const $offsetParent = $element.offsetParent();

    const elementTop = $element.position().top;
    const elementHeight = $element.outerHeight();
    const viewTop = $offsetParent.scrollTop();
    const viewHeight = $offsetParent.outerHeight();

    if (elementTop < OFFSET) {

        // The element is above the view
        // so animate to the top
        $offsetParent.animate({
            scrollTop: elementTop + viewTop - OFFSET
        });

    } else if (elementTop + elementHeight > viewHeight - OFFSET) {

        // The element is below the view
        // so animate to the bottom
        $offsetParent.animate({
            scrollTop: elementTop + viewTop - viewHeight + elementHeight + OFFSET
        });

    }
};
