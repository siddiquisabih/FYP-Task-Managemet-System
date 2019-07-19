import React, { Component } from 'react'
import { View, AsyncStorage } from 'react-native'
import { Thumbnail, Content, Body, Container, Header, Title, Card, Right, Text, Left, Icon, Tab, Tabs, TabHeading, Toast, Spinner, Textarea } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';

import styles from './commStyles'
import { Actions } from 'react-native-router-flux';
import Constant from '../../Constants/constants';



class ChatRoom extends Component {

    constructor() {
        super()
        this.state = {
            allChats: [],
            isLoading: true,
            noRecord: false,
            isData: false,
            userId: '',
            chatMembers: [],
            chatMessage: [],
            message: ''

        }
    }


    componentWillMount() {

        this.getUserDetail()
        this.getChat()
    }

    goBack() {
        // this.props.navigation.openDrawer()
        Actions.pop()
    }

    getUserDetail() {
        AsyncStorage.getItem(Constant.USER_DETAIL_KEY)
            .then((res) => {
                if (res) {
                    var data = JSON.parse(res)
                    this.setState({ userId: data.employeeId, userDetail: data })
                }
            })
    }

    getChat() {
        this.setState({ isLoading: true })
        console.log(this.props.data)
        axios.get(Constant.BASE_URL + Constant.GET_CHAT_MESSAGES + this.props.data)
            .then((response) => {
                if (response.data.returnObj) {
                    console.log(response, 'Chat')
                    var data = response.data.returnObj
                    var createdByDetail = {
                        employeeId: data.createdByID,
                        employeeName: data.createdBy,
                        imageUrl: data.imageUrlCreatedBy,
                    }
                    data.chatMembers.unshift(createdByDetail)
                    this.setState({ chatMembers: data.chatMembers, chatMessage: data.message, isLoading: false })

                }

            })
            .catch(() => {
                this.setState({ isLoading: false })
                Toast.show({
                    text: 'Check your network',
                    position: 'bottom',
                    buttonText: 'Okay',
                    type: "danger",
                    duration: 3000
                })
            })
    }


    handleMemberList() {
        return (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {
                    this.state.chatMembers.map((m, v) => {
                        return (

                            // <Thumbnail key={v} style={styles.userImage} source={{ uri: Constant.BASE_URL + Constant.IMAGE_URL_PATH + m.imageUrl }} />
                            <View key={v}>
                                <Thumbnail style={styles.userTextImage} source={{ uri: Constant.BASE_URL + Constant.IMAGE_URL_PATH + m.imageUrl }} />
                                <Text style={styles.timeText} >{m.employeeName}</Text>
                            </View>
                        )


                    })
                }

            </View>
        )
    }


    handleChatMessages() {

        return (
            <View>
                {
                    this.state.chatMessage.map((m, v) => {


                        if (m.employeeId !== this.state.userId) {
                            return (
                                <View key={v} style={styles.otherHead}>
                                    <View>
                                        <Thumbnail style={styles.OtherImage} source={{ uri: Constant.BASE_URL + Constant.IMAGE_URL_PATH + m.imageUrl }} />

                                        <Text style={styles.timeText} >12:30 am</Text>
                                    </View>
                                    <Text style={styles.otherText} >{m.message}</Text>
                                </View>
                            )
                        }

                        if (m.employeeId === this.state.userId) {
                            return (
                                <View key={v} >
                                    <View style={styles.userHead}>
                                        <Text style={styles.userText} >{m.message} </Text>
                                        <View >
                                            <Thumbnail style={styles.userTextImage} source={{ uri: Constant.BASE_URL + Constant.IMAGE_URL_PATH + m.imageUrl }} />
                                            <Text style={styles.timeText} >{m.employeeName}</Text>
                                        </View>

                                    </View>
                                </View>
                            )
                        }




                    })
                }
            </View>
        )

    }



    sendMessage() {
        if (this.state.message.trim() == '') {
            Toast.show({
                text: 'Message Can not be empty',
                position: 'bottom',
                buttonText: 'Okay',
                type: "danger",
                duration: 3000
            })
        }



        this.setState({ isLoading: true })

        var data = {
            employeeId: this.state.userId,
            employeeName: this.state.userDetail.name,
            message: this.state.message,
            imageUrl: this.state.userDetail.imageUrl
        }
        console.log(data)

        axios.post(Constant.BASE_URL + Constant.SEND_MESSAGE + this.props.data, data)
            .then((res) => {
                console.log(res)
                this.setState({ message: '', isLoading: false })
                this.getChat()
            })
            .catch((err) => {
                this.setState({ isLoading: false })
                Toast.show({
                    text: 'Check your network',
                    position: 'bottom',
                    buttonText: 'Okay',
                    type: "danger",
                    duration: 3000
                })
            })

    }


    handleLoading() {
        if (this.state.isLoading) {
            return (
                <Spinner />
            )
        }
        else {
            return (
                <Icon onPress={this.sendMessage.bind(this)} name='send' style={{ color: 'white', alignSelf: 'center', paddingLeft: '5%' }} />
            )


        }


    }




    render() {
        return (
            <Container>
                <Header style={styles.header}>
                    <Left >
                        <Icon name="arrow-round-back" style={styles.iconColor} onPress={this.goBack.bind(this)} />
                    </Left>
                    <Body>
                        <Title>Chat Room</Title>
                    </Body>
                    <Right />
                </Header>
                <LinearGradient colors={['#b39ddb', '#b39ddb', '#7e57c2']} style={{ flex: 1 }}>










                    <Content>

                        <Card style={{ width: '90%', marginLeft: '5%', borderRadius: 10 }}>
                            {this.handleMemberList()}
                        </Card>



                        {this.handleChatMessages()}











                    </Content>



                    <View style={{
                        width: '90%',
                        marginLeft: "5%",
                        borderRadius: 20,
                        borderColor: 'white',
                        color: 'white',
                        marginBottom: 10,
                        flexDirection: 'row'
                    }}>

                        <Textarea style={styles.messageTextarea} rowSpan={2} bordered placeholder="write Message" value={this.state.message} placeholderTextColor='white' onChangeText={(text) => { this.setState({ message: text }) }} />

                        {this.handleLoading()}
                    </View>








                </LinearGradient>

            </Container >
        );
    }
}

export default ChatRoom;
