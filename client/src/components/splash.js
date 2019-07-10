import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import { Spinner, Text } from "native-base"
import LinearGradient from 'react-native-linear-gradient';
import { AsyncStorage } from "react-native"
import Constant from '../Constants/constants';
 


class Splash extends Component {

    static navigationOptions = {
        header: false
    }

    constructor() {
        super()
        this.state = {
            error: false,
            validUser: false,
        }
    }


    


    componentWillMount() {
        AsyncStorage.getItem(Constant.USER_DETAIL_KEY)
        .then((responce) => {
            console.log(responce)
                if (responce) {
                    this.setState({ validUser: true })
                    this.navigateUser()
                }
                else {
                    this.setState({ error: true })
                    this.navigateUser()
                }
            })
    }



    navigateUser() {
        if (this.state.error) {
            this.props.navigation.navigate("LoginRoute")
        }

        if (this.state.validUser) {
            this.props.navigation.navigate("welcomeRoute")
        }
    }


    render() {
        return (
            <LinearGradient colors={['#b3e5fc', '#03a9f4', '#039be5']} style={styles.container}>
                <StatusBar
                    backgroundColor="black" />
                <Spinner
                    color="white"
                />
                <Text style={styles.heading}>Task Management System</Text>

            </LinearGradient>
        )
    }
}
export default  Splash

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    spinner: {
        justifyContent: "center"
    },
    heading: {
        fontFamily: 'Cochin',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,

    }
}