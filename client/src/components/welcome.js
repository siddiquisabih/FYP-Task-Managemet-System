//import liraries
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon } from 'native-base';

class Welcome extends Component {

    static navigationOptions = {
        title: "Welcome",

        drawerIcon: () => {
            return (
                <Icon name="ios-cog" />
            )
        }

    }

    render() {
        return (

            <View style={styles.container}>
                <Text onPress={() => { this.props.navigation.openDrawer() }} >Welcome To Task Management</Text>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

//make this component available to the app
export default Welcome;
