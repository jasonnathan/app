'use strict';

import Container from 'react-container';
import React from 'react';
import { Link, UI } from '/imports/touchstonejs/lib';

module.exports = React.createClass({
    statics: {
        navigationBar: 'tabs',
        getNavigation() {
            return {
                title: 'Lists!!'
            };
        }
    },

    render: () => {
        return (
            <Container scrollable>
                <UI.Group>
                    <UI.GroupHeader>GroupHeader</UI.GroupHeader>
                    <UI.GroupBody>
                        <UI.GroupInner>
                            <p>Use groups to contain content or lists. Where appropriate a Group should be accompanied by a GroupHeading and optionally a GroupFooter.</p>
                            GroupBody will apply the background for content inside groups.
                        </UI.GroupInner>
                    </UI.GroupBody>
                    <UI.GroupFooter>GroupFooter: useful for a detailed explanation to express the intentions of the Group. Try to be concise - remember that users are likely to read the text in your UI many times.</UI.GroupFooter>
                </UI.Group>
                <UI.Group>
                    <UI.GroupHeader>Actions</UI.GroupHeader>
                    <UI.GroupBody>
                        <Link to="root:login" transition="reveal-from-right">
                            <UI.Item>
                                <UI.ItemInner>
                                    Log out
                                </UI.ItemInner>
                            </UI.Item>
                        </Link>
                    </UI.GroupBody>
                </UI.Group>
            </Container>
        );
    }
});
