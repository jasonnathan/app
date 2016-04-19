'use strict';

import Connection from '/imports/Connection';
import Model from '/imports/classes/Model';
import linkCollection from '/imports/helpers/linkCollection';

export default class NotificationModel extends Model {

    /**
     * Search for current user
     *
     * @return {AccountsClient}
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
                limit: 2,
                sort: {
                    created_at: -1
                }
            }
        };
    }
}

linkCollection(NotificationModel, 'notifications');
