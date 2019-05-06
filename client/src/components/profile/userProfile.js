import React, { Component } from 'react'
import { View } from 'react-native'
import { Button, Content, Body, Container, Header, Title, Card, Right, Text, Left, Icon, Tab, Tabs, TabHeading } from 'native-base';
import styles from './profileStyles'
class UserProfile extends Component {
    static navigationOptions = {
        title: "Profile",

        drawerIcon: () => {
            return (
                <Icon name="ios-cog" />
            )
        }
    }

    openDrawer() {
        this.props.navigation.openDrawer()
    }

    render() {
        return (
            <Container>
                <Header style={styles.header} hasTabs>
                    <Left >
                        <Icon name="menu" style={styles.iconColor} onPress={this.openDrawer.bind(this)} />
                    </Left>
                    <Body>
                        <Title>Profile</Title>
                    </Body>
                    <Right />
                </Header>

            </Container>
        )
    }
}

export default UserProfile