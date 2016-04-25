'use strict';

import { check } from 'meteor/check';
import moment from 'moment';

import Model from '/imports/classes/Model';
import linkCollection from '/imports/helpers/linkCollection';
import ImageModel from '/imports/models/ImageModel';

export default class NotificationModel extends Model {
    constructor(props) {
        super(props);

        this.image = ImageModel.query()
            .search(m => m.searchForNotification(this))
            .findOne();
    }

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
     * Get notification image id
     *
     * @return {String}
     */
    getImageId() {
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
            'partups_user_mentioned': () => this.type_data.mentioning_upper.image
        })[this.type]();
    }

    /**
     * Get notification text replace options for i18next
     *
     * @param {Function} t - i18next's translator function
     */
    getText(t) {
        let key = `notification-${this.type}`;
        let replace = ({
            'partups_networks_accepted': () => ({network: this.type_data.network.name}),
            'partups_networks_invited': () => ({inviter: this.type_data.inviter.name}),
            'partups_networks_upper_left': () => ({upper: this.type_data.upper.name, network: this.type_data.network.name}),
            'partups_networks_new_upper': () => ({upper: this.type_data.upper.name, network: this.type_data.network.name}),
            'partups_networks_new_pending_upper': () => ({network: this.type_data.network.name, pending_upper: this.type_data.pending_upper.name}),
            'partup_created_in_network': () => ({partup: this.type_data.partup.name, network: this.type_data.network.name, creator: this.type_data.creator.name}),
            'partup_activities_invited': () => ({inviter: this.type_data.inviter.name, activity: this.type_data.activity.name}),
            'partup_archived_by_upper': () => ({partup: this.type_data.partup.name, archiver: this.type_data.archiver.name}),
            'partups_contributions_accepted': () => ({accepter: this.type_data.accepter.name, activity: this.type_data.activity.name}),
            'contributions_ratings_inserted': () => ({rater: this.type_data.rater.name}),
            'partups_contributions_rejected': () => ({rejecter: this.type_data.rejecter.name, activity: this.type_data.activity.name}),
            'multiple_comments_in_conversation_since_visit': () => ({upper: this.type_data.latest_upper.name, others_count: this.type_data.others_count}),
            'partups_multiple_updates_since_visit': () => ({upper: this.type_data.latest_upper.name, others_count: this.type_data.others_count}),
            'networks_multiple_new_uppers_since_visit': () => ({upper: this.type_data.latest_upper.name, others_count: this.type_data.others_count, network: this.type_data.network.name}),
            'partups_activities_inserted': () => ({creator: this.type_data.creator.name}),
            'partups_new_comment_in_involved_conversation': () => ({commenter: this.type_data.commenter.name}),
            'partups_contributions_proposed': () => ({creator: this.type_data.creator.name}),
            'partups_contributions_inserted': () => ({creator: this.type_data.creator.name}),
            'partups_messages_inserted': () => ({creator: this.type_data.creator.name}),
            'partups_ratings_reminder': () => ({partup: this.type_data.partup.name}),
            'partups_supporters_added': () => ({supporter: this.type_data.supporter.name}),
            'partup_unarchived_by_upper': () => ({partup: this.type_data.partup.name, unarchiver: this.type_data.unarchiver.name}),
            'updates_first_comment': () => ({commenter: this.type_data.commenter.name}),
            'invite_upper_to_partup': () => ({inviter: this.type_data.inviter.name, partup: this.type_data.partup.name}),
            'partups_user_mentioned': () => ({partup: this.type_data.partup.name, mentioning_upper: this.type_data.mentioning_upper.name})
        })[this.type]();

        // Exception for partups_multiple_updates_since_visit
        if (this.type === 'partups_multiple_updates_since_visit' &&
            this.type_data.others_count === 0) {
            key = partups_multiple_updates_since_visit_single_person;
            replace = {
                upper: this.type_data.latest_upper.name
            };
        }

        return t(key, {replace});
    }

    /**
     * Get meta text for notification (date and possible location)
     *
     * @param {Function} t - i18next's translator function
     */
    getMetaText(t, nowDate) {
        check(t, Function);
        check(nowDate, Date);

        let metaText = [];

        const RELATIVE_TIME_THRESHOLD = 7 * 24 * 60 * 60 * 1000; // <-- 1 week
        const notificationMoment = moment(this.created_at);
        const nowMoment = moment(nowDate);
        if (nowMoment.diff(notificationMoment) < RELATIVE_TIME_THRESHOLD) { // <-- less than 1 week ago
            metaText.push(notificationMoment.fromNow(true));
        } else if (notificationMoment.year() === nowMoment.year()) { // <-- less than a year ago
            metaText.push(notificationMoment.format('dd, MMMM D [at] h:mm A'));
        } else { // <-- more than a year ago
            metaText.push(notificationMoment.format('MMMM D YYYY [at] h:mm A'));
        }

        const location = ({
            'partups_networks_accepted': () => undefined,
            'partups_networks_invited': () => this.type_data.network.name,
            'partups_networks_upper_left': () => undefined,
            'partups_networks_new_upper': () => undefined,
            'partups_networks_new_pending_upper': () => undefined,
            'partup_created_in_network': () => undefined,
            'partup_activities_invited': () => this.type_data.partup.name,
            'partup_archived_by_upper': () => undefined,
            'partups_contributions_accepted': () => this.type_data.partup.name,
            'contributions_ratings_inserted': () => this.type_data.partup.name,
            'partups_contributions_rejected': () => this.type_data.partup.name,
            'multiple_comments_in_conversation_since_visit': () => this.type_data.partup.name,
            'partups_multiple_updates_since_visit': () => this.type_data.partup.name,
            'networks_multiple_new_uppers_since_visit': () => undefined,
            'partups_activities_inserted': () => this.type_data.partup.name,
            'partups_new_comment_in_involved_conversation': () => this.type_data.partup.name,
            'partups_contributions_proposed': () => this.type_data.partup.name,
            'partups_contributions_inserted': () => this.type_data.partup.name,
            'partups_messages_inserted': () => this.type_data.partup.name,
            'partups_ratings_reminder': () => undefined,
            'partups_supporters_added': () => this.type_data.partup.name,
            'partup_unarchived_by_upper': () => undefined,
            'updates_first_comment': () => this.type_data.partup.name,
            'invite_upper_to_partup': () => this.type_data.partup.name,
            'partups_user_mentioned': () => this.type_data.partup.name
        })[this.type]();

        const locationString = location && t('notification-location', {location});
        if (location) {
            metaText.push(t('notification-location', {location}));
        }

        return metaText.join(' ');
    }

}

linkCollection(NotificationModel, 'notifications');
