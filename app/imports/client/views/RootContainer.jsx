'use strict';

import { Meteor } from 'meteor/meteor';
import { contains } from 'mout/array';
import meteorDataContainer from '/imports/client/services/meteorDataContainer';
import RootViewManager from './RootViewManager';
import Debug from '/imports/client/Debug';
import transitionTo from '/imports/client/services/transitionTo';
import '/imports/client/Connection';
import TabsViewManager from '/imports/client/views/root/app/TabsViewManager.jsx';

Meteor.startup(() => {
    if ('ThreeDeeTouch' in window) {
        ThreeDeeTouch.isAvailable((avail) => {
            if (avail) {
                ThreeDeeTouch.enableLinkPreview();
                ThreeDeeTouch.configureQuickActions([
                    {
                        type: 'notifications',
                        title: 'Notifications',
                        // subtitle: '',
                        iconType: 'Time'
                    },
                    {
                        type: 'chats',
                        title: 'Chats',
                        // subtitle: '',
                        iconType: 'Message'
                    },
                    {
                        type: 'partups',
                        title: 'Part-ups'
                    },
                    {
                        type: 'tribes',
                        title: 'Tribes'
                    }
                ]);

                ThreeDeeTouch.onHomeIconPressed = (payload) => {
                    const TABS = [
                        'notifications',
                        'chats',
                        'partups',
                        'tribes'
                    ];

                    // Open tab
                    if (contains(TABS, payload.type)) {
                        TabsViewManager.lastSelectedTab = payload.type;
                        transitionTo(`root:app:tabs:${payload.type}`, {
                            transition: 'fade'
                        });
                    }
                };
            }
        });

    }
});

export default meteorDataContainer(RootViewManager, (props) => {
    const {} = props;
    Debug.tracker('AppContainer');

    return {
        userId: Meteor.userId()
    };
});

