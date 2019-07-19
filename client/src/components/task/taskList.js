import React, { Component } from 'react'
import { View, AsyncStorage } from 'react-native'
import { Button, Content, Body, Container, Header, Title, Card, Right, Text, Left, Icon, Tab, Tabs, TabHeading, Toast, Spinner } from 'native-base';
import ProgressCircle from 'react-native-progress-circle'
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles'
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import Constant from '../../Constants/constants';
import Global from '../../Constants/globalFunc';
import RouteKey from '../../Constants/routesConstants';



class TaskList extends Component {
    // static navigationOptions = {
    //     title: "Task List",

    //     drawerIcon: () => {
    //         return (
    //             <Icon name="ios-cog" />
    //         )
    //     }
    // }

    openDrawer() {
        // this.props.navigation.openDrawer()
        Actions.drawerOpen()
    }

    constructor() {
        super()
        this.state = {
            allTasks: [],
            isLoading: true,
            noRecord: false,
            isData: false,

            allTasksByYou: [],
            isLoadingByYou: true,
            noRecordByYou: false,
            isDataByYou: false,


        }
    }


    gotoUpdateTask() {
        // this.props.navigation.navigate('updateTaskRoute')
    }



    componentWillMount() {
        this.getAllTask()
        this.getAllByYouTask()
    }


    getAllByYouTask() {
        // 

        this.setState({ isLoadingByYou: true })
        AsyncStorage.getItem(Constant.USER_DETAIL_KEY)
            .then((res) => {
                if (res) {
                    var data = JSON.parse(res)
                    var userId = data.employeeId
                    axios.get(Constant.BASE_URL + Constant.GET_ALL_TASK_BY_YOU + userId)
                        .then((response) => {
                            console.log(response, 'byYou Data')
                            if (response.data.returnObj[0] !== undefined) {

                                var tempData = []
                                // convertServerDate
                                response.data.returnObj.map((m, v) => {
                                    if (m.progress < 100) {
                                        if (m.lastUpdate) {
                                            m.lastUpdateCustom = Global.convertServerDate(m.lastUpdate)
                                            m.createdDateCustom = Global.convertServerDate(m.createdDate)
                                            m.endDateCustom = Global.convertUserDate(m.endDate)
                                            m.startDateCustom = Global.convertUserDate(m.startDate)
                                            tempData.push(m)
                                        }
                                    }
                                })

                                if (tempData[0] !== undefined) {
                                    this.setState({ allTasksByYou: tempData, noRecordByYou: false, isLoadingByYou: false, isDataByYou: true })
                                }
                                else {
                                    this.setState({ allTasksByYou: [], noRecordByYou: true, isLoadingByYou: false, isDataByYou: false })
                                }
                            }
                            else {
                                this.setState({ allTasksByYou: [], noRecordByYou: true, isLoadingByYou: false, isDataByYou: false })
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



    getAllTask() {
        this.setState({ isLoading: true })
        AsyncStorage.getItem(Constant.USER_DETAIL_KEY)
            .then((res) => {
                if (res) {
                    var data = JSON.parse(res)
                    var userId = data.employeeId
                    axios.get(Constant.BASE_URL + Constant.GET_ALL_TASK_BY_ID + userId)
                        .then((response) => {
                            console.log(response)
                            if (response.data.returnObj[0] !== undefined) {

                                var temp = []
                                // convertServerDate
                                response.data.returnObj.map((m, v) => {
                                    if (m.progress < 100) {
                                        if (m.lastUpdate) {
                                            m.lastUpdateCustom = Global.convertServerDate(m.lastUpdate)
                                            m.createdDateCustom = Global.convertServerDate(m.createdDate)
                                            m.endDateCustom = Global.convertUserDate(m.endDate)
                                            m.startDateCustom = Global.convertUserDate(m.startDate)
                                            temp.push(m)
                                        }
                                    }
                                })

                                if (temp[0] !== undefined) {
                                    this.setState({ allTasks: temp, noRecord: false, isLoading: false, isData: true })
                                }
                                else {
                                    this.setState({ allTasks: [], noRecord: true, isLoading: false, isData: false })
                                }
                            }
                            else {
                                this.setState({ allTasks: [], noRecord: true, isLoading: false, isData: false })
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

    updateTask(data) {
        console.log(data)
        Actions[RouteKey.UPDATE_TASK]({ data: data })
    }


    taskDetail(data) {
        console.log(data)
        Actions[RouteKey.TASK_DETAIL]({ data: data })
    }

    eidtTask(data) {

        console.log(JSON.stringify(data, undefined, 2))

        Actions[RouteKey.EDIT_TASK]({ data: data })
    }


    handleData() {

        return (
            <View>
                {
                    this.state.allTasks.map((m, v) => {
                        return (


                            <Card style={styles.mainCard} key={v}>
                                <Text style={styles.message}>Alert! you have a pending task</Text>
                                <Text note style={styles.date}>Assign by {m.createdBy} on {m.createdDateCustom}</Text>
                                <Text style={styles.description}>
                                    {m.taskTitle}
                                </Text>

                                <View style={{ marginLeft: 10, flexDirection: 'row' }}>


                                    <ProgressCircle
                                        percent={m.progress}
                                        radius={20}
                                        borderWidth={3}
                                        color="#3399FF"
                                        shadowColor="#999"
                                        bgColor="#fff"

                                    >
                                        <Text style={{ fontSize: 12 }}>{m.progress + '%'}</Text>
                                    </ProgressCircle>

                                    <View style={{ marginLeft: 5, }}>

                                        <Text note>Deadline {m.endDateCustom}  </Text>
                                        <Text note>Last updated on {m.lastUpdateCustom}</Text>
                                    </View>

                                </View>


                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                                    <Button rounded light small style={{ alignSelf: 'center', marginBottom: 15, marginTop: 15, marginRight: 15, }} onPress={this.updateTask.bind(this, m)}>
                                        <Text uppercase={false}>Update Now</Text>
                                    </Button>
                                    <Button rounded light small style={{ alignSelf: 'center', marginBottom: 15, marginTop: 15, }} onPress={this.taskDetail.bind(this, m)}>
                                        <Text uppercase={false}>Detail</Text>
                                    </Button>
                                </View>

                            </Card>

                        )
                    })
                }
            </View>
        )
    }

    handleNoRecord() {
        return (
            <Container style={styles.noRecordStyle} >

                <Text style={styles.noRecordText} >
                    You have no task updates
            </Text>
            </Container>
        )
    }



    handleNoRecordByYou() {
        return (
            <Container style={styles.noRecordStyle} >

                <Text style={styles.noRecordText} >
                    You did't assign task yet
            </Text>
            </Container>
        )
    }


    handleLoading() {
        return (
            <Spinner
                color="white"
            />
        )
    }



    handleByYouData() {

        return (
            <View>
                {
                    this.state.allTasksByYou.map((m, v) => {
                        return (


                            <Card style={styles.mainCard} key={v}>
                                <Text style={styles.messageByYou}>You assign a new task</Text>
                                <Text note style={styles.date}>Assigned to {m.employeeName} on {m.createdDateCustom}</Text>
                                <Text style={styles.description}>
                                    {m.taskTitle}
                                </Text>

                                <View style={{ marginLeft: 10, flexDirection: 'row' }}>


                                    <ProgressCircle
                                        percent={m.progress}
                                        radius={20}
                                        borderWidth={3}
                                        color="#3399FF"
                                        shadowColor="#999"
                                        bgColor="#fff"

                                    >
                                        <Text style={{ fontSize: 12 }}>{m.progress + '%'}</Text>
                                    </ProgressCircle>

                                    <View style={{ marginLeft: 5, }}>

                                        <Text note>Deadline {m.endDateCustom}  </Text>
                                        <Text note>Last updated on {m.lastUpdateCustom}</Text>
                                    </View>

                                </View>




                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                                    <Button rounded light small style={{ alignSelf: 'center', marginBottom: 15, marginTop: 15, marginRight: 15 }} onPress={this.eidtTask.bind(this, m)}>
                                        <Text uppercase={false}>Edit Now</Text>
                                    </Button>

                                    <Button rounded light small style={{ alignSelf: 'center', marginBottom: 15, marginTop: 15 }} onPress={this.taskDetail.bind(this, m)}>
                                        <Text uppercase={false}>Detail</Text>
                                    </Button>
                                </View>
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
                        <Title>Task List</Title>
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




                            </Content>

                        </LinearGradient>






                    </Tab>

                </Tabs>









            </Container>
        )
    }
}
export default TaskList




{/* <Card style={styles.mainCard}>
<Text style={styles.message}>Alert! you have a dedline today</Text>
<Text note style={styles.date}>Assign by sabih on 23-Apr</Text>
<Text style={styles.description}>
    fix all ui bugs
</Text>

<View style={{ marginLeft: 10, flexDirection: 'row' }}>


    <ProgressCircle
        percent={50}
        radius={20}
        borderWidth={3}
        color="#3399FF"
        shadowColor="#999"
        bgColor="#fff"

    >
        <Text style={{ fontSize: 12 }}>{'50%'}</Text>
    </ProgressCircle>

    <View style={{ marginLeft: 5, }}>

        <Text note>Deadline 25-April-2019  </Text>
        <Text note>Last updated on 11-April-2019</Text>
    </View>

</View>



<Button rounded light small style={styles.updateButton} onPress={this.gotoUpdateTask.bind(this)}>
    <Text uppercase={false}>Update Now</Text>
</Button>

</Card> */}