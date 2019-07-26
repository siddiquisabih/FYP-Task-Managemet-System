import React, { Component } from 'react'
import { View, AsyncStorage, Image } from 'react-native'
import { Button, Content, Body, Container, Header, Title, Card, Right, Text, Left, Icon, Tab, Tabs, TabHeading, Toast, Spinner } from 'native-base';
import ProgressCircle from 'react-native-progress-circle'
import LinearGradient from 'react-native-linear-gradient';

import styles from './expenseStyle'
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import Constant from '../../Constants/constants';
import Global from '../../Constants/globalFunc';
import RouteKey from '../../Constants/routesConstants';



export default class UpdateExpense extends Component {


    openDrawer() {
        // this.props.navigation.openDrawer()
        Actions.drawerOpen()
    }

    constructor() {
        super()
        this.state = {
            expenseList: [],
            isLoading: true,
            noRecord: false,
            isData: false,

        }
    }


    componentWillMount() {
        this.getAllExpense()
    }

    getAllExpense() {
        this.setState({ isLoading: true })

        axios.get(Constant.BASE_URL + Constant.GET_ALL_EXPENSE)
            .then((response) => {
                console.log(response)
                if (response.data.returnObj[0] !== undefined) {

                    var temp = []
                    // convertServerDate
                    response.data.returnObj.map((m, v) => {
                        if (m.createdDate && m.status == 'pending') {
                            m.createdDateCustom = Global.convertServerDate(m.createdDate)
                            temp.push(m)
                        }
                    })
                    if (temp[0] !== undefined) {
                        this.setState({ expenseList: temp, noRecord: false, isLoading: false, isData: true })
                    }
                    else {
                        this.setState({ expenseList: [], noRecord: true, isLoading: false, isData: false })
                    }
                }
                else {
                    this.setState({ expenseList: [], noRecord: true, isLoading: false, isData: false })
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





    handleNoRecord() {
        return (
            <Container style={styles.noRecordStyle} >

                <Text style={styles.noRecordText} >
                    No expense for approval
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




    updateExpense(data, status) {

        this.setState({ isLoading: true, isData: false })
        var dataToSend = data
        dataToSend.status = status
        console.log(dataToSend)


        axios.post(Constant.BASE_URL + Constant.EXPENSE_APPROVAL, dataToSend)
            .then((res) => {

                if (res) {
                    Toast.show({
                        text: 'Expense Updated',
                        position: 'bottom',
                        buttonText: 'Okay',
                        type: "danger",
                        duration: 3000
                    })

                    this.getAllExpense()
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



    handleData() {
        return (
            <View>
                {
                    this.state.expenseList.map((m, v) => {
                        return (


                            <Card style={styles.mainCard} key={v}>
                                <Text style={styles.message}>Pending expense for approval</Text>
                                <Text note style={styles.date}>Created by {m.createdBy} on {m.createdDateCustom}</Text>
                                <Text style={styles.description}>
                                    {m.title}
                                </Text>
                                <Text style={styles.descriptionText}>
                                    {m.description}
                                </Text>


                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                                    <Button onPress={this.updateExpense.bind(this, m, 'Approved')} rounded light small style={{ alignSelf: 'center', marginBottom: 15, marginTop: 15, marginRight: 15, }} >
                                        <Text uppercase={false}>Approve</Text>
                                    </Button>

                                    <Button onPress={this.updateExpense.bind(this, m, 'Rejected')} rounded light small style={{ alignSelf: 'center', marginBottom: 15, marginTop: 15, }} >
                                        <Text uppercase={false}>Reject</Text>
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

                    <View style={{ width: '80%', alignSelf: 'center' }} >
                        <Title style={{ textAlign: 'left', paddingLeft: 20 }}>Expense Approval</Title>
                    </View>

                    {/* <Body>
                        <Title>Expense Approval</Title>
                    </Body>
                    <Right /> */}
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