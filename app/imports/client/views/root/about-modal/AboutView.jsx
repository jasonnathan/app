'use strict';

import React from 'react';

import { Container, UI } from '/imports/client/touchstonejs/lib';
import translate from '/imports/client/services/translate';
import transitionTo from '/imports/client/services/transitionTo';
import { UserModel, ImageModel } from '/imports/client/models';
import Debug from '/imports/client/Debug';
import NavButton from '/imports/client/components/NavButton';
import Content from '/imports/client/components/Content';
import Heading from '/imports/client/components/Heading';
import Paragraph from '/imports/client/components/Paragraph';
import UserCard from '/imports/client/components/UserCard';
import Avatar from '/imports/client/components/Avatar';
import UserInfo from '/imports/client/components/UserInfo';
import List from '/imports/client/components/List';
import ListItem from '/imports/client/components/ListItem';
import Stat from '/imports/client/components/Stat';
import Button from '/imports/client/components/Button';
import setCurrentBackbuttonHandler from '/imports/client/services/setCurrentBackbuttonHandler';

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
                Debug.methodResult(`Failed user logout`, err);
                window.alert('Logout failed');
                return;
            }

            window.localStorage.clear();

            transitionTo('root:login', {
                transition: 'reveal-from-bottom'
            });
        });
    }
};

AboutView.navigationBar = 'about-modal';
AboutView.getNavigation = (props, app) => {
    const back = () => {
        app.transitionTo('root:app', {
            transition: 'reveal-from-bottom'
        });
    };

    setCurrentBackbuttonHandler(back);

    return {
        title: 'About the app',
        rightLabel: <NavButton right icon="icon_close" />,
        rightAction: back,
    };
};

AboutView.propTypes = {
    onLogout: React.PropTypes.func.isRequired,
    loggedInUser: React.PropTypes.instanceOf(UserModel),
    loggedInUserAvatar: React.PropTypes.instanceOf(ImageModel)
};

export default translate()(AboutView);
