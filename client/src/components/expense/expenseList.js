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



export default class ExpenseList extends Component {


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
            loginUserDetail: {},

        }
    }


    componentWillMount() {
        this.loginUser()
    }



    loginUser() {
        AsyncStorage.getItem(Constant.USER_DETAIL_KEY)
            .then((response) => {
                if (response) {
                    var detail = JSON.parse(response)
                    this.setState({ loginUserDetail: detail })
                    this.getAllExpense()

                }
            })
    }

    getAllExpense() {
        this.setState({ isLoading: true })
        console.log(Constant.BASE_URL + Constant.GET_EXPENSE_BY_ID + this.state.loginUserDetail.employeeId)
        axios.get(Constant.BASE_URL + Constant.GET_EXPENSE_BY_ID + this.state.loginUserDetail.employeeId)
            .then((response) => {
                console.log(response)
                if (response.data.returnObj[0] !== undefined) {

                    var temp = []
                    // convertServerDate
                    response.data.returnObj.map((m, v) => {
                        if (m.createdDate) {
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
                    No expense found
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






    handleData() {
        return (
            <View>
                {
                    this.state.expenseList.map((m, v) => {
                        return (


                            <Card style={styles.mainCard} key={v}>
                                <Text style={styles.message}>You created an expense </Text>
                                <Text note style={styles.date}>Created by you on {m.createdDateCustom}</Text>
                                <Text style={styles.description}>
                                    {m.title}
                                </Text>
                                <Text style={styles.descriptionText}>
                                    {m.description}
                                </Text>

                                <Text style={styles.statusText}>
                                    {m.status}
                                </Text>


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
                        <Title style={{ textAlign: 'left', paddingLeft: 20 }}>Expense List</Title>
                    </View>
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