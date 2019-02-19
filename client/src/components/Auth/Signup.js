import React, { Component } from 'react'
import { StatusBar, ImageBackground,View } from 'react-native'
import { Container, Header, Icon, Content, Item, Input, Button, Text, Toast, Spinner, Left, Body, Right, Title } from 'native-base';
import { connect } from "react-redux"
import Midware from "../../Store/Middleware/AuthMidware"

function mapStateToProps(state) {
    return {
        componentState: state,
        isSignup: state.AuthReducer.signup,
        isError: state.AuthReducer.signupError,
        errorMessage: state.AuthReducer.signupErrorMessage

    }
}

function mapDispatchToProps(dispatch) {
    return {
        signupUser: (data) => {
            dispatch(Midware.Signup(data))
        }
    }
}

class Signup extends Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: '',
            name: "",
            showToast: false,
            loading: false,

        }
    }

    static navigationOptions = {
        header: false
    }

    componentWillReceiveProps(prop) {
        if (prop.isError) {
            this.setState({ loading: false })
        }
        if (prop.isSignup) {
            prop.navigation.navigate("welcomeRoute")
        }
    }
    componentWillMount() {
        console.disableYellowBox = true

    }

    signup() {
        const userEmailAndPassword = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
        if (userEmailAndPassword.email !== '' && userEmailAndPassword.name !== '' && userEmailAndPassword.password !== '') {
            this.props.signupUser(userEmailAndPassword)
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
            <Button
                success
                onPress={this.signup.bind(this)}>
                <Text>Signup</Text>
            </Button>
        </Item>
    }

    render() {
        return (
            // <View>

            //  <ImageBackground
            //     // style={{
            //     //     flex: 1,
            //     //     width: null,
            //     //     height: null,
            //     //     resizeMode: "cover"
            //     // }}
                // style={{width: '100%', height: '100%',resizeMode: "cover", flex: 1,}}
                // source={require("../../images/doc.jpg")}>
                <Container >
                    <Header style={{ backgroundColor: "green" }}  >
                        <StatusBar
                            backgroundColor="black" />
                        <Left >
                            <Button transparent
                                onPress={() => this.props.navigation.goBack()}
                                >

                                <Icon name="arrow-back" />
                            </Button>


                        </Left>
                        <Body>
                            <Title>SIGNUP</Title>
                        </Body>
                        <Right />
                    </Header>
                    <Container style={style.containerStyle}>
                        <Content>
                            <Item>

                                <Icon name='person' />

                                <Input placeholder='Name' placeholderTextColor="green"
                                    onChangeText={(text) => { this.setState({ name: text }) }}
                                    value={this.state.name} />
                            </Item>
                            <Item >
                                <Icon name='at' />
                                <Input placeholder='Email Or UserName' placeholderTextColor="green"
                                    onChangeText={(text) => { this.setState({ email: text }) }}
                                    value={this.state.email} />
                            </Item>
                            <Item>
                                <Icon name='key' />
                                <Input placeholder='Password' secureTextEntry placeholderTextColor="green"
                                    onChangeText={(text) => { this.setState({ password: text }) }}
                                    value={this.state.password} />
                            </Item >
                            {this.handleSpinner()}
                            {this.handleError()}
                        </Content>
                    </Container>
                </Container>
            //  </ImageBackground>
            // </View>
                        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Signup)

const style = {
    buttonStyle: {
        justifyContent: 'center',
        borderBottomWidth: 0,
        marginTop: 30
    },
    containerStyle: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 200,
    },
    errorText: {
        color: "red",
        textAlign: "center",
        marginTop: 15,
    },
}