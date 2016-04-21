'use strict';

import Model from '/imports/classes/Model';
import linkCollection from '/imports/helpers/linkCollection';

export default class NotificationModel extends Model {

    /**
     * Search for current user
     *
     * @return {Object} search query
     */
    static searchForCurrentUser() {
        return {
            selector: {
                for_upper_id: Meteor.userId(),
                grouped: {
                    $exists: false
                }
            },
            options: {
                limit: 20,
                sort: {
                    created_at: -1
                }
            }
        };
    }
}

linkCollection(NotificationModel, 'notifications');
