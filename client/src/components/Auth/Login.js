import React, { Component } from 'react'
import { StatusBar, ImageBackground, BackHandler } from 'react-native'
import { Container, Header, Icon, Content, Item, Input, Button, Text, Toast, Spinner, Left, Body, Right, Title } from 'native-base';
import { connect } from "react-redux"
import Midware from "../../Store/Middleware/AuthMidware"
import LinearGradient from 'react-native-linear-gradient';

function mapStateToProps(state) {
    return {
        componentState: state,
        isLogin: state.AuthReducer.login,
        isError: state.AuthReducer.loginError,
        errorMessage: state.AuthReducer.loginErrorMessage,

    }
}

function mapDispatchToProps(dispatch) {
    return {
        loginUser: (data) => {
            dispatch(Midware.Login(data))
        }

    }
}

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            showToast: false,
            loading: false,
        }
    }

    static navigationOptions = {
        header: false
    }

    componentWillMount() {
        console.disableYellowBox = true
        BackHandler.addEventListener('backPress'
            ,
            () => {
                BackHandler.exitApp()
            }
        );


    }

    componentWillUnmount() {
        BackHandler.removeEventListener('backPress');
    }
    componentWillReceiveProps(prop) {
        if (prop.isError) {
            this.setState({ loading: false })
        }

        if (prop.isLogin) {
            prop.navigation.navigate("welcomeRoute")
        }


    }

    Login() {
        const userEmailAndPassword = {
            email: this.state.email,
            password: this.state.password
        }
        if (userEmailAndPassword.email !== '' && userEmailAndPassword.password !== '') {

            this.props.loginUser(userEmailAndPassword)
            this.setState({ loading: true })
        }
        else {
            Toast.show({
                text: 'Fill All Boxes!',
                position: 'bottom',
                buttonText: 'Okay',
                type: "danger",
                duration: 1000
            })
        }
    }

    handleError() {
        if (this.props.isError) {
            return <Text note style={style.errorText}>{this.props.errorMessage}</Text>
        }
    }

    handleSpinner() {
        if (this.state.loading) {
            return <Spinner />
        }
        return <Item style={style.buttonStyle}>

            <Button light rounded onPress={this.Login.bind(this)}>
                <Text>Login</Text>
            </Button>
        </Item>
    }



    render() {
        return (

            <LinearGradient colors={['#b3e5fc', '#03a9f4', '#039be5']} style={style.container}>

                <Text style={style.loginText}> Task Management System</Text>
                <Item style={style.itemEmail}>
                    <Icon name='at' />


                    <Input placeholder='Email' placeholderTextColor="white"
                        onChangeText={(text) => { this.setState({ email: text }) }}
                        value={this.state.email}
                    />

                </Item>

                <Item style={style.item}>
                    <Icon name='key' />

                    <Input placeholder='Password' secureTextEntry placeholderTextColor="white"
                        onChangeText={(text) => { this.setState({ password: text }) }}
                        value={this.state.password} />
                </Item >

                {this.handleSpinner()}
                {this.handleError()}





            </LinearGradient>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
const style = {
    buttonStyle: {
        justifyContent: 'center',
        borderBottomWidth: 0,
        marginTop: 30
    },
    errorText: {
        color: "red",
        textAlign: "center",
        marginTop: 15,
    },
    container: {
        flex: 1,
        // paddingTop:200
    },
    item: {
        marginRight: 20,
        marginLeft: 20,
        // paddingTop :200

    },
    itemEmail: {
        marginRight: 20,
        marginLeft: 20,
        paddingTop: 100
    },
    loginText: {
        // justifyContent: 'center',
        textAlign: 'center',
        paddingTop: 100,
        fontFamily: 'Cochin',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    }
}