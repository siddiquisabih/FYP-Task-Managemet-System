import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import { Spinner, Text } from "native-base"
import Midware from "../../src/Store/Middleware/AuthMidware"
import { connect } from "react-redux"
import LinearGradient from 'react-native-linear-gradient';

function mapStateToProps(state) {
    console.log(state, 'state 321')
    return {
        authError: state.AuthReducer.userAuthError,
        userAuthentic: state.AuthReducer.userAuthentic
    }

}

function mapDispatchToProps(dispatch) {
    return {
        checkAuth: () => {
            dispatch(Midware.checkingForAuthentication())
        }
    }
}


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


    componentWillReceiveProps(prop) {
        if (prop.authError) {
            this.setState({ error: true })
        }

        if (prop.userAuthentic) {
            this.setState({ validUser: true })
        }
    }


    componentWillMount() {


        this.props.checkAuth()
        setTimeout(() => { this.navigateUser() }, 2000)

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
export default connect(mapStateToProps, mapDispatchToProps)(Splash)

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