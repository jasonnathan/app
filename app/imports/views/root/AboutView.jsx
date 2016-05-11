'use strict';

import React from 'react';
import { Container, UI } from 'touchstonejs';

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
    render() {
        return (
            <Container>
                <UI.NavigationBar name="about" />
                <Container fill scrollable>
                    <Content>
                        <Content.Text>
                            <Paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, esse. A aperiam quidem reprehenderit repellendus, facilis optio eligendi harum totam dicta maxime error expedita, quibusdam alias ipsa illum animi ullam.</Paragraph>
                        </Content.Text>
                        <Content.Block>
                            <UserCard>
                                <UserCard.UserDetails>
                                    <Avatar
                                        src="https://upload.wikimedia.org/wikipedia/commons/f/fc/Ryan_Gosling_2_Cannes_2011_(cropped).jpg"
                                        alt="Ryan">
                                    </Avatar>
                                    <UserInfo>
                                        <Heading level={2}>Ralph Boeije</Heading>
                                        <Paragraph>Founder at Part-up. Tribe lead for the App, Development and Data (matching) tribes of Part-up. Living...</Paragraph>
                                    </UserInfo>
                                    <List inline stats>
                                        <ListItem>
                                            <Stat number={20} label="Partups">
                                                <Paragraph>
                                                    <span className="pa-Stat__number">46</span>
                                                    <span className="pa-Stat__label">Part-ups</span>
                                                </Paragraph>
                                            </Stat>
                                        </ListItem>
                                        <ListItem>
                                            <Stat number={2} label="supporters">
                                                <Paragraph>
                                                    <span className="pa-Stat__number">19</span>
                                                    <span className="pa-Stat__label">Supporters</span>
                                                </Paragraph>
                                            </Stat>
                                        </ListItem>
                                    </List>
                                </UserCard.UserDetails>
                                <UserCard.LogoutButton>
                                    <Button>Log out</Button>
                                </UserCard.LogoutButton>
                            </UserCard>
                        </Content.Block>
                    </Content>
                </Container>
            </Container>
        );
    }
};

AboutView.navigationBar = 'about';
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
    //
};

export default AboutView;
