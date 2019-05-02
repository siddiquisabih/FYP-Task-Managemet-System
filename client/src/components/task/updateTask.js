import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Textarea, Button, Input, Content, Body, Container, Header, Title, Card, CardItem, Right, Text, Left, Icon, Item, Thumbnail, Tab, Tabs, TabHeading } from 'native-base';

import styles from './styles'
class UpdateTask extends Component {



    goBack() {
        this.props.navigation.pop()
    }


    render() {




        return (
            <Container>
                <Header style={styles.header} hasTabs>
                    <Left >
                        <Icon name="arrow-round-back" style={styles.iconColor} onPress={this.goBack.bind(this)} />
                    </Left>
                    <Body>
                        <Title>Update Task</Title>
                    </Body>
                    <Right />
                </Header>
            </Container>
        );
    }
}
export default UpdateTask;
