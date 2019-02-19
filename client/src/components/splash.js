import React, { Component } from 'react'
import { Image , StatusBar , ImageBackground} from 'react-native'
import { Container, Spinner , Text } from "native-base"
import Midware from "../../src/Store/Middleware/AuthMidware"
import { connect } from "react-redux"

function mapStateToProps(state) {
    console.log(state , 'state 321')
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
            <ImageBackground
                source={require("../images/main.jpg")}
                style={styles.imageBackground}
            >
            <StatusBar
                            backgroundColor="black" />
                <Container style={styles.spinner} >
                    <Spinner
                        color="red"
                    />

                </Container>
            </ImageBackground>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Splash)

const styles = {
    imageBackground: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: "cover"
    },
    spinner: {
        justifyContent: "center"
    }
}