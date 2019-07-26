import React, { Component } from 'react'
import { View, AsyncStorage, Image } from 'react-native'
import { Textarea, Button, Input, Content, Body, Container, Header, Title, Card, CardItem, Right, Text, Left, Icon, Item, Thumbnail, Toast, Spinner } from 'native-base';
import DatePicker from 'react-native-datepicker'
import LinearGradient from 'react-native-linear-gradient';
import styles from './expenseStyle'

import axios from 'axios';

import Constant from "../../Constants/constants"
import FilePickerManager from 'react-native-file-picker';
import { Actions } from "react-native-router-flux"
import RouteKey from '../../Constants/routesConstants';



class CreateExpense extends Component {


    constructor(props) {
        super(props)
        this.state = {

            expenseTitle: '',
            expenseDescription: '',

            loginUserDetail: {},
            loading: false,
            expenseDate: '',
        }
    }



    componentWillMount() {
        this.initialDate()
        this.loginUser()
    }


    loginUser() {
        AsyncStorage.getItem(Constant.USER_DETAIL_KEY)
            .then((response) => {
                if (response) {
                    console.log('details ', response)
                    var detail = JSON.parse(response)
                    this.setState({ loginUserDetail: detail })
                }
            })
    }




    initialDate() {
        var current = new Date()
        var day = current.getDate()
        var month = current.getMonth() + 1
        var year = current.getFullYear()
        var monthString = month <= 9 ? '0' + month : month
        var dayString = day <= 9 ? '0' + day : day
        var format = dayString + '-' + monthString + '-' + year
        this.setState({
            expenseDate: format
        })
    }



    create() {

        if (this.state.expenseTitle.trim() == "") {
            return Toast.show({
                text: 'Enter Expense Title',
                position: 'bottom',
                buttonText: 'Okay',
                type: "danger",
                duration: 3000
            })
        }
        if (this.state.expenseDescription.trim() == "") {
            return Toast.show({
                text: 'Enter Expense Description',
                position: 'bottom',
                buttonText: 'Okay',
                type: "danger",
                duration: 3000
            })
        }




        var data = {
            title: this.state.expenseTitle,
            description: this.state.expenseDescription,
            createdByID: this.state.loginUserDetail.employeeId,
            createdBy: this.state.loginUserDetail.name,
            expenseAttachment: [],
            expenseDate: this.expenseDate,
            status: "pending"
        }

        // 

        console.log(data)

        this.setState({ loading: true })
        axios.post(Constant.BASE_URL + Constant.CREATE_EXPENSE, data)
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
                        Actions[RouteKey.EXPENSE_LIST]()
                    }, 1000);
                }
                else {
                    this.setState({ loading: false })
                    Toast.show({
                        text: 'Provide All Details',
                        position: 'bottom',
                        buttonText: 'Okay',
                        type: "danger",
                        duration: 3000
                    })
                }
            })
            .catch((err) => {
                this.setState({ loading: false })
                Toast.show({
                    text: 'Check your network',
                    position: 'bottom',
                    buttonText: 'Okay',
                    type: "danger",
                    duration: 3000
                })
            })
    }


    handleLoadingButton() {
        if (this.state.loading === true) {
            return (
                <Spinner />
            )
        }
        else {
            return (
                <Item style={styles.buttonStyle}>
                    <Button success rounded onPress={this.create.bind(this)}>
                        <Text>Create</Text>
                    </Button>
                </Item>
            )
        }
    }




    openDrawer() {
        Actions.drawerOpen()
    }


    render() {
        return (
            <Container>
                <Header style={styles.header}>
                    <Left >
                        <Icon name="menu" style={styles.iconColor} onPress={this.openDrawer.bind(this)} />
                    </Left>
                    <Body>
                        <Title>Create Expense</Title>
                    </Body>
                    <Right />
                </Header>


                <LinearGradient colors={['#b39ddb', '#b39ddb', '#7e57c2']} style={{ flex: 1 }}>

                    <Content>

                        <Text style={styles.label}>What will be expense title?</Text>
                        <Item rounded style={styles.textbox}>
                            <Input onChangeText={(text) => { this.setState({ expenseTitle: text }) }} placeholder='Task title' style={styles.inputText} placeholderTextColor='white' />
                        </Item>


                        <Text style={styles.label}>Expense Date</Text>



                        <DatePicker
                            style={styles.datePicker}
                            date={this.state.expenseDate}
                            mode="date"
                            placeholder="select date"
                            format="DD-MM-YYYY"
                            maxDate={new Date()}
                            // maxDate="2019-07-10"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            showIcon={false}
                            customStyles={{
                                dateInput: {
                                    borderRadius: 20,
                                    borderColor: 'white',
                                },
                                dateText: {
                                    color: 'white'
                                }
                            }}
                            onDateChange={(date) => { this.setState({ expenseDate: date }) }}
                        />


                        <Text style={styles.label}>What will expense description? </Text>
                        <Textarea onChangeText={(text) => { this.setState({ expenseDescription: text }) }} style={styles.textarea} rowSpan={5} bordered placeholder="write description" placeholderTextColor='white' />



                        {this.handleLoadingButton()}



                    </Content>






                </LinearGradient>

            </Container >
        )
    }
}
export default CreateExpense