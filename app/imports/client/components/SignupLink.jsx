'use strict';

import React from 'react';
import c from 'classnames';
import Button from '/imports/client/components/Button';
import openWeb from '/imports/client/services/openWeb';
import formatWebsiteUrl from '/imports/client/services/formatWebsiteUrl';

const SignupLink = class SignupLink extends React.Component {
    render() {
        return (
            <p className={c('pa-SignupLink')}>
                <Button text onClick={this.onSignupClick.bind(this)}>
                    Part-up is the marketplace for teamwork. The Part-up app is a notification and chat app for uppers. <u>Become an upper on part-up.com</u> or login to the Part-up App.
                </Button>
            </p>
        );
    }

    onSignupClick() {
        openWeb(formatWebsiteUrl({pathname: '/register'}), {inApp: true});
    }
};

export default SignupLink;
