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




export default class TeamTask extends Component {


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



    componentWillMount() {
        this.getAllTask()
    }


    getAllTask() {
        this.setState({ isLoading: true })



        axios.get(Constant.BASE_URL + Constant.GET_ALL_TASK_BY_ID + this.props.empId)
            .then((response) => {
                console.log(response)
                if (response.data.returnObj[0] !== undefined) {

                    var temp = []
                    // convertServerDate
                    response.data.returnObj.map((m, v) => {
                        // if (m.progress < 100) {
                        if (m.lastUpdate) {
                            m.lastUpdateCustom = Global.convertServerDate(m.lastUpdate)
                            m.createdDateCustom = Global.convertServerDate(m.createdDate)
                            m.endDateCustom = Global.convertUserDate(m.endDate)
                            m.startDateCustom = Global.convertUserDate(m.startDate)
                            temp.push(m)
                        }
                        // }
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



    taskDetail(data) {
        console.log(data)
        Actions[RouteKey.TASK_DETAIL]({ data: data })
    }

    handleData() {

        return (
            <View>
                {
                    this.state.allTasks.map((m, v) => {
                        return (


                            <Card style={styles.mainCard} key={v}>
                                {/* <Text style={styles.message}>Alert! you have a pending task</Text> */}
                                <Text note style={styles.date}>Assign by {m.createdBy} on {m.createdDateCustom}</Text>
                                <Text style={styles.description}>
                                    {m.taskTitle}
                                </Text>

                                <View style={{ marginLeft: 10, flexDirection: 'row', paddingBottom: 10 }}>


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
                    {this.props.EmpName} have no task
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


    render() {
        return (

            <Container>
                <Header style={styles.header} hasTabs>
                    <Left >
                        <Icon name="arrow-round-back" style={styles.iconColor} onPress={() => { Actions.pop() }} />
                    </Left>
                    <Body>
                        <Title> {this.props.EmpName} 's Task</Title>
                    </Body>
                    <Right />
                </Header>


                <LinearGradient colors={['#b2dfdb', '#80cbc4', '#4db6ac']} style={{ flex: 1 }}>

                    {this.state.noRecord === true ? this.handleNoRecord() : null}

                    <Content padder>


                        {this.state.isData === true ? this.handleData() : null}
                        {this.state.isLoading === true ? this.handleLoading() : null}


                    </Content>







                </LinearGradient>







            </Container>




        )
    }
}