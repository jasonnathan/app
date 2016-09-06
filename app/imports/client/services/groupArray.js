'use strict';

export default function(items, compare) {
    let groups = [];
    let currentGroup = [];

    items.forEach((item, index) => {
        const push = () => currentGroup.push(item);
        const cut = () => {
            if (currentGroup.length > 0) {
                groups.push(currentGroup);
                currentGroup = [];
            }
        };

        const isLastItem = index === items.length - 1;
        const previousItem = items[index - 1];
        const shouldBeGrouped = !previousItem || compare(previousItem, item);

        if (!shouldBeGrouped) {
            cut();
            push();

            if (isLastItem) {
                cut();
            }
        } else if (isLastItem) {
            push();
            cut();
        } else {
            push();
        }
    });

    return groups;
};
