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

    /**
     * Get notification image
     *
     * @return {String}
     */
    getImage() {
        return ({
            'partups_networks_accepted': () => this.type_data.network.image,
            'partups_networks_invited': () => this.type_data.inviter.image,
            'partups_networks_upper_left': () => this.type_data.upper.image,
            'partups_networks_new_upper': () => this.type_data.upper.image,
            'partups_networks_new_pending_upper': () => this.type_data.pending_upper.image,
            'partup_created_in_network': () => this.type_data.creator.image,
            'partup_activities_invited': () => this.type_data.inviter.image,
            'partup_archived_by_upper': () => this.type_data.archiver.image,
            'partups_contributions_accepted': () => this.type_data.accepter.image,
            'contributions_ratings_inserted': () => this.type_data.rater.image,
            'partups_contributions_rejected': () => this.type_data.rejecter.image,
            'multiple_comments_in_conversation_since_visit': () => this.type_data.latest_upper.image,
            'partups_multiple_updates_since_visit': () => this.type_data.latest_upper.image,
            'networks_multiple_new_uppers_since_visit': () => this.type_data.network.image,
            'partups_activities_inserted': () => this.type_data.creator.image,
            'partups_new_comment_in_involved_conversation': () => this.type_data.commenter.image,
            'partups_contributions_proposed': () => this.type_data.creator.image,
            'partups_contributions_inserted': () => this.type_data.creator.image,
            'partups_messages_inserted': () => this.type_data.creator.image,
            'partups_ratings_reminder': () => undefined,
            'partups_supporters_added': () => this.type_data.supporter.image,
            'partup_unarchived_by_upper': () => this.type_data.unarchiver.image,
            'updates_first_comment': () => this.type_data.commenter.image,
            'invite_upper_to_partup': () => this.type_data.inviter.image,
            'partups_user_mentioned': () => this.type_data.mentioning_upper.image,
        })[this.type]();
    }
}

linkCollection(NotificationModel, 'notifications');
