import React, { Component } from 'react'
import { BackHandler } from 'react-native'
import { Icon, Item, Input, Button, Text, Toast, Spinner } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios'
import Constant from '../../Constants/constants';
import { AsyncStorage } from "react-native"
import { Actions } from 'react-native-router-flux';
import RouteKey from '../../Constants/routesConstants';



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

    // static navigationOptions = {
    //     header: false
    // }

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


    Login() {

        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)) {

            const userEmailAndPassword = {
                email: this.state.email,
                password: this.state.password
            }
            if (userEmailAndPassword.email !== '' && userEmailAndPassword.password !== '') {
                this.setState({ loading: true })
                axios.post(Constant.BASE_URL + Constant.LOGIN, userEmailAndPassword)
                    .then((res) => {
                        console.log(res)
                        if (res.data.success === true) {

                            AsyncStorage.setItem(Constant.USER_DETAIL_KEY, JSON.stringify(res.data.returnObj))
                                .then(() => {
                                    this.setState({ loading: false })
                                    // this.props.navigation.navigate("DrawerRoute")
                                    Actions[RouteKey.DRAWER]()
                                })
                        }
                        else {
                            this.setState({ loading: false })
                            Toast.show({
                                text: res.data.message,
                                position: 'bottom',
                                buttonText: 'Okay',
                                type: "danger",
                                duration: 3000
                            })
                        }
                    })
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
        else {
            return Toast.show({
                text: 'Invalid Email!',
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

export default Login
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