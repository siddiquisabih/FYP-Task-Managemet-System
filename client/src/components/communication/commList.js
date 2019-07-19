import React, { Component } from 'react'
import { View, AsyncStorage } from 'react-native'
import { Button, Content, Body, Container, Header, Title, Card, Right, Text, Left, Icon, Tab, Tabs, TabHeading, Toast, Spinner } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import styles from './commStyles'
import { Actions } from 'react-native-router-flux';
import RouteKey from '../../Constants/routesConstants';
import Constant from '../../Constants/constants';
import Global from '../../Constants/globalFunc';



class CommList extends Component {



    constructor() {
        super()
        this.state = {
            allChatsToYOu: [],
            isLoading: true,
            noRecord: false,
            isData: false,

            allChatsByYou: [],
            isLoadingByYou: true,
            noRecordByYou: false,
            isDataByYou: false,


        }
    }



    openDrawer() {

        Actions.drawerOpen()
    }


    goToChatRoom(tranId) {
        Actions[RouteKey.CHAT_ROOM]({ data: tranId })
    }

    componentWillMount() {
        this.getAllToYou()
        this.getAllByYouChat()
    }







    getAllByYouChat() {
        // 

        this.setState({ isLoadingByYou: true })
        AsyncStorage.getItem(Constant.USER_DETAIL_KEY)
            .then((res) => {
                if (res) {
                    var data = JSON.parse(res)
                    var userId = data.employeeId
                    axios.get(Constant.BASE_URL + Constant.GET_CHAT_BTY_YOU + userId)
                        .then((response) => {
                            console.log(response, 'byYou Data')
                            if (response.data.returnObj[0] !== undefined) {

                                var tempData = []
                                // convertServerDate
                                response.data.returnObj.map((m, v) => {

                                    if (m.createdDate) {
                                        // m.lastUpdateCustom = Global.convertServerDate(m.lastUpdate)
                                        m.createdDateCustom = Global.convertServerDate(m.createdDate)
                                        // m.endDateCustom = Global.convertUserDate(m.endDate)
                                        tempData.push(m)

                                    }
                                })

                                if (tempData[0] !== undefined) {
                                    this.setState({ allChatsByYou: tempData, noRecordByYou: false, isLoadingByYou: false, isDataByYou: true })
                                }
                                else {
                                    this.setState({ allChatsByYou: [], noRecordByYou: true, isLoadingByYou: false, isDataByYou: false })
                                }
                            }
                            else {
                                this.setState({ allChatsByYou: [], noRecordByYou: true, isLoadingByYou: false, isDataByYou: false })
                                console.log('call')
                            }
                        })
                        .catch(() => {
                            Toast.show({
                                text: 'Check your network',
                                position: 'bottom',
                                buttonText: 'Okay',
                                type: "danger",
                                duration: 3000
                            })
                        })
                }
            })



    }




    getAllToYou() {
        this.setState({ isLoading: true })
        AsyncStorage.getItem(Constant.USER_DETAIL_KEY)
            .then((res) => {
                if (res) {
                    var data = JSON.parse(res)
                    var userId = data.employeeId
                    axios.get(Constant.BASE_URL + Constant.GET_CHAT_TO_YOU + userId)
                        .then((response) => {
                            console.log(response)
                            if (response.data.returnObj[0] !== undefined) {
                                var temp = []
                                // convertServerDate
                                response.data.returnObj.map((m, v) => {
                                    if (m.createdDate) {
                                        // m.lastUpdateCustom = Global.convertServerDate(m.lastUpdate)
                                        m.createdDateCustom = Global.convertServerDate(m.createdDate)
                                        // m.endDateCustom = Global.convertUserDate(m.endDate)
                                        temp.push(m)
                                    }

                                })

                                if (temp[0] !== undefined) {
                                    this.setState({ allChatsToYOu: temp, noRecord: false, isLoading: false, isData: true })
                                }
                                else {
                                    this.setState({ allChatsToYOu: [], noRecord: true, isLoading: false, isData: false })
                                }
                            }
                            else {
                                this.setState({ allChatsToYOu: [], noRecord: true, isLoading: false, isData: false })
                            }
                        })
                        .catch(() => {
                            Toast.show({
                                text: 'Check your network',
                                position: 'bottom',
                                buttonText: 'Okay',
                                type: "danger",
                                duration: 3000
                            })
                        })
                }
            })
    }




    handleData() {

        return (
            <View>
                {
                    this.state.allChatsToYOu.map((m, v) => {
                        return (
                            <Card key={v} style={styles.mainCard}>
                                <Text style={styles.messageHeading}>{m.createdBy} started chat with you</Text>
                                <Text note style={styles.date}> {m.createdDateCustom}</Text>
                                <Text style={styles.descriptionCommText}>
                                    {m.title}
                                </Text>
                                <Button rounded light small style={styles.updateButton} onPress={this.goToChatRoom.bind(this, m.tranID)} >
                                    <Text uppercase={false}>Reply</Text>
                                </Button>
                            </Card>
                        )
                    })
                }
            </View>
        )
    }


    handleLoading() {
        return (
            <Spinner
                color="white"
            />
        )
    }

    handleNoRecord() {
        return (
            <Container style={styles.noRecordStyle} >

                <Text style={styles.noRecordText} >
                    You have no chat
            </Text>
            </Container>
        )
    }




    handleNoRecordByYou() {
        return (
            <Container style={styles.noRecordStyle} >

                <Text style={styles.noRecordText} >
                    No chat created
            </Text>
            </Container>
        )
    }



    handleByYouData() {

        return (
            <View>
                {
                    this.state.allChatsByYou.map((m, v) => {
                        return (
                            <Card key={v} style={styles.mainCard}>
                                <Text style={styles.messageHeading}>You started chat</Text>
                                <Text note style={styles.date}> {m.createdDateCustom}</Text>
                                <Text style={styles.descriptionCommText}>
                                    {m.title}
                                </Text>
                                <Button rounded light small style={styles.updateButton} onPress={this.goToChatRoom.bind(this, m.tranID)} >
                                    <Text uppercase={false}>Reply</Text>
                                </Button>
                            </Card>
                        )
                    })
                }
            </View>
        )
    }



    render() {
        return (

            <Container>
                <Header style={styles.header} hasTabs>
                    <Left >
                        <Icon name="menu" style={styles.iconColor} onPress={this.openDrawer.bind(this)} />
                    </Left>
                    <Body>
                        <Title>Chat List</Title>
                    </Body>
                    <Right />
                </Header>


                <Tabs >
                    <Tab heading={<TabHeading style={{ backgroundColor: '#039be5' }}><Text>To You</Text></TabHeading>}>

                        <LinearGradient colors={['#b2dfdb', '#80cbc4', '#4db6ac']} style={{ flex: 1 }}>
                            {this.state.noRecord === true ? this.handleNoRecord() : null}

                            <Content padder>


                                {this.state.isData === true ? this.handleData() : null}
                                {this.state.isLoading === true ? this.handleLoading() : null}


                            </Content>







                        </LinearGradient>

                    </Tab>



















                    <Tab heading={<TabHeading style={{ backgroundColor: '#039be5' }}><Text>By You</Text></TabHeading>}>



                        <LinearGradient colors={['#b2dfdb', '#80cbc4', '#4db6ac']} style={{ flex: 1 }}>
                            {this.state.noRecordByYou === true ? this.handleNoRecordByYou() : null}

                            <Content padder>


                                {this.state.isDataByYou === true ? this.handleByYouData() : null}
                                {this.state.isLoadingByYou === true ? this.handleLoading() : null}



                                {/* <Card style={styles.mainCard}>
                                    <Text style={styles.messageHeading}>You started chat</Text>
                                    <Text note style={styles.date}> 23-Apr-2019</Text>
                                    <Text style={styles.descriptionCommText}>
                                        Party plan. let's go for summer camp
                                    </Text>


                                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                                        <Button rounded light small style={styles.updateButton} onPress={this.goToChatRoom.bind(this)}>
                                            <Text uppercase={false}>Reply</Text>
                                        </Button>
                                        <Button rounded light small style={styles.updateButton} >
                                            <Text uppercase={false}>Delete</Text>
                                        </Button>
                                    </View>

                                </Card> */}

                            </Content>

                        </LinearGradient>






                    </Tab>

                </Tabs>









            </Container>

        );
    }
}




export default CommList;
