import React, { Component, } from 'react';
import { Textarea, Button, Input, Content, Body, Container, Header, Title, Card, CardItem, Right, Text, Left, Icon, Item, Thumbnail, Toast, Spinner } from 'native-base';
import { View, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from './profileStyles'
import LinearGradient from 'react-native-linear-gradient';
import Constant from '../../Constants/constants';
import axios from 'axios';
import RouteKey from '../../Constants/routesConstants';




class ChangePass extends Component {

    constructor() {
        super()
        this.state = {
            oldPassword: '',
            newPassword: '',
            confirmPass: '',
            loading: false,
            loginUserDetail: {}

        }
    }


    componentWillMount() {
        this.getLoginUser()
    }

    goBack() {
        // this.props.navigation.pop()
        Actions.pop()
    }


    Change() {
        console.log(this.state)
        if (this.state.oldPassword.trim() == "") {
            return Toast.show({
                text: 'Invalid old password',
                position: 'bottom',
                buttonText: 'Okay',
                type: "danger",
                duration: 3000
            })
        }
        if (this.state.newPassword.trim() == "") {
            return Toast.show({
                text: 'Invalid new password',
                position: 'bottom',
                buttonText: 'Okay',
                type: "danger",
                duration: 3000
            })
        }
        if (this.state.confirmPass.trim() == "") {
            return Toast.show({
                text: 'Invalid confirm password',
                position: 'bottom',
                buttonText: 'Okay',
                type: "danger",
                duration: 3000
            })
        }

        if (this.state.confirmPass !== this.state.newPassword) {
            return Toast.show({
                text: 'Password did not match',
                position: 'bottom',
                buttonText: 'Okay',
                type: "danger",
                duration: 3000
            })
        }

        this.setState({ loading: true })

        var data = {
            oldPass: this.state.oldPassword,
            newPass: this.state.newPassword
        }
        var userId = this.state.loginUserDetail.employeeId
        axios.post(Constant.BASE_URL + Constant.CHANGE_PASSWORD + userId, data)
            .then((res) => {
                console.log(res)
                if (res.data.success === true) {
                    this.setState({ loading: false })

                    Toast.show({
                        text: res.data.message,
                        position: 'bottom',
                        buttonText: 'Okay',
                        type: "success",
                        duration: 3000
                    })
                    setTimeout(() => {
                        Actions.pop()
                    }, 1000);
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
            .catch((err) => {
                Toast.show({
                    text: 'Check your network',
                    position: 'bottom',
                    buttonText: 'Okay',
                    type: "danger",
                    duration: 3000
                })
            })
    }

    getLoginUser() {
        AsyncStorage.getItem(Constant.USER_DETAIL_KEY)
            .then((response) => {
                if (response) {
                    console.log('details ', response)
                    var detail = JSON.parse(response)
                    this.setState({ loginUserDetail: detail })
                }
            })
    }

    renderButton() {
        if (this.state.loading === true) {
            return (
                <Spinner />
            )
        }
        else {
            return (

                <Item style={styles.buttonStyle}>

                    <Button success rounded onPress={this.Change.bind(this)}>
                        <Text>Save</Text>
                    </Button>
                </Item>
            )
        }
    }


    render() {
        return (
            <Container>
                <Header style={styles.header} hasTabs>
                    <Left >
                        <Icon name="arrow-round-back" style={styles.iconColor} onPress={this.goBack.bind(this)} />
                    </Left>
                    <View style={{ width: '80%', alignSelf: 'center' }} >
                        <Title style={{ textAlign: 'left', paddingLeft: 15 }}>Change Password</Title>
                    </View>

                </Header>

                <LinearGradient colors={['#b39ddb', '#b39ddb', '#7e57c2']} style={{ flex: 1 }}>
                    <Content>


                        <Text style={styles.label}> What is your old password?</Text>
                        <Item rounded style={styles.textbox}>
                            <Input secureTextEntry onChangeText={(text) => { this.setState({ oldPassword: text }) }} placeholder='Old password' style={styles.inputText} placeholderTextColor='white' />
                        </Item>

                        <Text style={styles.label}> What will be your new password?</Text>
                        <Item rounded style={styles.textbox}>
                            <Input secureTextEntry onChangeText={(text) => { this.setState({ newPassword: text }) }} placeholder='New password' style={styles.inputText} placeholderTextColor='white' />
                        </Item>

                        <Text style={styles.label}> Confirm password</Text>
                        <Item rounded style={styles.textbox}>
                            <Input secureTextEntry onChangeText={(text) => { this.setState({ confirmPass: text }) }} placeholder='Confirm password' style={styles.inputText} placeholderTextColor='white' />
                        </Item>


                        {this.renderButton()}

                    </Content>
                </LinearGradient>



            </Container>
        );
    }
}


//make this component available to the app
export default ChangePass;
