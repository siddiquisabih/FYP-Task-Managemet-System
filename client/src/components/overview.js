//import liraries
import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Button, Content, Body, Container, Header, Title, Card, Right, Text, Left, Icon, Spinner } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import ProgressCircle from 'react-native-progress-circle'
import axios from 'axios';
import Constant from '../Constants/constants';





class Overview extends Component {

    static navigationOptions = {
        title: "Overview",

        drawerIcon: () => {
            return (
                <Icon name="ios-cog" />
            )
        }

    }

    constructor() {
        super()
        this.state = {
            allTasks: [],
            isLoading: true,
            noRecord: false,
            isData: false
        }
    }



    openDrawer() {
        this.props.navigation.openDrawer()
    }


    componentWillMount() {
        this.getAllTask()
    }


    handleLoading() {
        return (
            <Spinner
                color="white"
            />
        )
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
                            if (response.data.returnObj[0] !== undefined) {
                                this.setState({ allTasks: response.data.returnObj, noRecord: false, isLoading: false, isData: true })
                            }
                            else {
                                this.setState({ allTasks: [], noRecord: true, isLoading: false, isData: false })
                            }
                        })
                }
            })
    }



    handleData() {
        return (
            <Card style={styles.mainCard}>
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



                <Button rounded light small style={{ alignSelf: 'center', marginBottom: 15, marginTop: 15 }}>
                    <Text uppercase={false}>Update Now</Text>
                </Button>

            </Card>

        )
    }


    handleNoRecord() {
        return (
            <Container style={styles.noRecordStyle} >

                <Text style={styles.noRecordText} >
                    You have no task
            </Text>
            </Container>
        )
    }


    render() {


        return (

            // <View style={styles.container}>
            //     <Text onPress={() => { this.props.navigation.openDrawer() }} >Welcome To Task Management</Text>
            // </View>



            <Container>
                <Header style={styles.header}>
                    <Left >
                        <Icon name="menu" style={styles.iconColor} onPress={this.openDrawer.bind(this)} />
                    </Left>
                    <Body>
                        <Title>Overview</Title>
                    </Body>
                    <Right />
                </Header>



                <LinearGradient colors={['#b3e5fc', '#03a9f4', '#039be5']} style={{ flex: 1 }}>

                    {this.state.noRecord === true ? this.handleNoRecord() : null}

                    <Content>




                        {this.state.isData === true ? this.handleData() : null}
                        {this.state.isLoading === true ? this.handleLoading() : null}









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



                            <Button rounded light small style={{ alignSelf: 'center', marginBottom: 15, marginTop: 15 }}>
                                <Text uppercase={false}>Update Now</Text>
                            </Button>

                        </Card>

                        <Card style={styles.mainCard}>
                            <Text style={styles.message}>Alert! you have an overdue task</Text>
                            <Text note style={styles.date}>Assign by Umar on 19-Apr</Text>
                            <Text style={styles.description}>
                                Design chat screen UI on mock plus and develop. Apply validation on each textbox
                                </Text>

                            <View style={{ marginLeft: 10, flexDirection: 'row' }}>


                                <ProgressCircle
                                    percent={20}
                                    radius={20}
                                    borderWidth={3}
                                    color="#3399FF"
                                    shadowColor="#999"
                                    bgColor="#fff"

                                >
                                    <Text style={{ fontSize: 12 }}>{'20%'}</Text>
                                </ProgressCircle>

                                <View style={{ marginLeft: 5, }}>

                                    <Text note>Deadline 20-April-2019  </Text>
                                    <Text note>Last updated on 11-April-2019</Text>
                                </View>

                            </View>



                            <Button rounded light small style={{ alignSelf: 'center', marginBottom: 15, marginTop: 15 }}>
                                <Text uppercase={false}>Update Now</Text>
                            </Button>

                        </Card> */}

                    </Content>









{/* 

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>


                        <Card style={styles.pendingCard}>
                            <LinearGradient style={styles.gradientBox} colors={['#f48fb1', '#f06292', '#ec407a']} >

                                <View style={{ flexDirection: 'column', justifyContent: 'center', height: '100%' }}>

                                    <Text style={styles.number}>01</Text>
                                    <Text style={styles.statusHeading}>pending</Text>
                                </View>

                            </LinearGradient>
                        </Card>

                        <Card style={styles.pendingCard}>


                            <LinearGradient style={styles.gradientBox} colors={['#9fa8da', '#7986cb', '#5c6bc0']} >

                                <View style={{ flexDirection: 'column', justifyContent: 'center', height: '100%' }}>

                                    <Text style={styles.number}>01</Text>
                                    <Text style={styles.statusHeading}>Over due</Text>
                                </View>

                            </LinearGradient>
                        </Card>


                        <Card style={styles.pendingCard}>
                            <LinearGradient style={styles.gradientBox} colors={['#80cbc4', '#4db6ac', '#26a69a']} >

                                <View style={{ flexDirection: 'column', justifyContent: 'center', height: '100%' }}>

                                    <Text style={styles.number}>25</Text>
                                    <Text style={styles.statusHeading}>Completed</Text>
                                </View>

                            </LinearGradient>
                        </Card>

                    </View> */}


                </LinearGradient>















            </Container >
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        backgroundColor: "#039be5"
    },
    message: {
        paddingLeft: 10,
        paddingTop: 10,
        fontFamily: 'Cochin',
        // fontWeight: 'bold',
        color: 'red'
    },

    date: {
        paddingLeft: 10,
        fontFamily: 'Cochin',
    },
    description: {
        paddingLeft: 10,
        paddingTop: 15,
        paddingBottom: 15,
        fontFamily: 'Cochin',
        fontWeight: 'bold',

    },
    mainCard: {
        // marginLeft: 12,
        // marginRight: 12,
        // marginTop: 12,
        width: '90%',
        marginLeft: '5%',
        // marginTop: '5%',
        borderRadius: 10,
        // backgroundColor: '#e1bee7'

    },
    pendingCard: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        // marginLeft: '5%',
        marginTop: '5%',
        // borderRadius: 50,

    },
    statusHeading: {
        alignSelf: 'center',
        color: 'white'

    },
    number: {
        alignSelf: 'center',
        fontFamily: 'Cochin',
        fontWeight: 'bold',
        color: 'white'

    },
    gradientBox: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
    },
    iconColor: {
        color: 'white'
    },
    noRecordStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    noRecordText: {
        fontFamily: 'Cochin',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    }


});

export default Overview

