//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
class Welcome extends Component {
   
    static navigationOptions = {
        title: "Welcome",
       

    }
   
    render() {
        return (
            <View style={styles.container}>
                <Text>Welcome To Task Management</Text>
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
        // backgroundColor: '',
    },
});

//make this component available to the app
export default Welcome;
