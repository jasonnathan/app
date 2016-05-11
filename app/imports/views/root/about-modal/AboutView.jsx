'use strict';

import React from 'react';
import { Container, UI } from 'touchstonejs';
import { translate } from 'react-i18next';

import UserModel from '/imports/models/UserModel';
import ImageModel from '/imports/models/ImageModel';
import transitionTo from '/imports/services/transitionTo';
import Debug from '/imports/Debug';
import NavButton from '/imports/components/NavButton';
import Content from '/imports/components/Content';
import Heading from '/imports/components/Heading';
import Paragraph from '/imports/components/Paragraph';
import UserCard from '/imports/components/UserCard';
import Avatar from '/imports/components/Avatar';
import UserInfo from '/imports/components/UserInfo';
import List from '/imports/components/List';
import ListItem from '/imports/components/ListItem';
import Stat from '/imports/components/Stat';
import Button from '/imports/components/Button';

const AboutView = class AboutView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loggingOut: false
        };
    }

    render() {
        const {t, loggedInUser: user, loggedInUserAvatar: userAvatar} = this.props;

        let partnerOfCount, supporterOfCount;
        if (user) {
            partnerOfCount = (user.upperOf || []).length;
            supporterOfCount = (user.supporterOf || []).length;
        }

        return (
            <Container fill scrollable>
                <Content>
                    <Content.Text>
                        <Paragraph>{t('about-intro')}</Paragraph>
                    </Content.Text>
                    <Content.Block>
                        {user &&
                            <UserCard>
                                <UserCard.UserDetails>
                                    <Avatar
                                        src={userAvatar && userAvatar.getUrl()}
                                        alt={user.profile.name}
                                        score={user.getScore()}>
                                    </Avatar>
                                    <UserInfo>
                                        <Heading level={2}>{user.profile.name}</Heading>
                                        <Paragraph>{user.profile.description}</Paragraph>
                                    </UserInfo>
                                    <List inline stats>
                                        <ListItem>
                                            <Stat number={20} label="Partups">
                                                <Paragraph>
                                                    <span className="pa-Stat__number">{partnerOfCount}</span>
                                                    <span className="pa-Stat__label">{partnerOfCount > 1 ? 'Partners' : 'Partner'}</span>
                                                </Paragraph>
                                            </Stat>
                                        </ListItem>
                                        <ListItem>
                                            <Stat number={2} label="supporters">
                                                <Paragraph>
                                                    <span className="pa-Stat__number">{supporterOfCount}</span>
                                                    <span className="pa-Stat__label">{supporterOfCount > 1 ? 'Supporters' : 'Supporter'}</span>
                                                </Paragraph>
                                            </Stat>
                                        </ListItem>
                                    </List>
                                </UserCard.UserDetails>
                                <UserCard.LogoutButton>
                                    <Button loading={this.state.loggingOut} onClick={this.onLogoutClick.bind(this)}>Log out</Button>
                                </UserCard.LogoutButton>
                            </UserCard>
                        }
                    </Content.Block>
                </Content>
            </Container>
        );
    }

    onLogoutClick(event) {
        event.preventDefault();
        this.setState({loggingOut: true});

        this.props.onLogout((err) => {
            this.setState({loggingOut: false});

            if (err) {
                Debug.methods(`Failed user logout`, err);
                window.alert('Logout failed');
                return;
            }

            transitionTo('root:login', {
                transition: 'reveal-from-bottom'
            });
        });
    }
};

AboutView.navigationBar = 'about-modal';
AboutView.getNavigation = (props, app) => {
    return {
        title: 'About the app',
        rightLabel: <NavButton right icon="icon_close" />,
        rightAction: () => {
            app.transitionTo('root:app', {
                transition: 'reveal-from-bottom'
            });
        },
    };
};

AboutView.propTypes = {
    onLogout: React.PropTypes.func.isRequired,
    loggedInUser: React.PropTypes.instanceOf(UserModel),
    loggedInUserAvatar: React.PropTypes.instanceOf(ImageModel)
};

export default translate()(AboutView);
