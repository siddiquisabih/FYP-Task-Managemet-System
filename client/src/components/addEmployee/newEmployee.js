import React, { Component } from 'react'
import { View, AsyncStorage, Image } from 'react-native'
import { Textarea, Button, Input, Content, Body, Container, Header, Title, Card, CardItem, Right, Text, Left, Icon, Item, Thumbnail, Toast, Spinner } from 'native-base';
import DatePicker from 'react-native-datepicker'
import LinearGradient from 'react-native-linear-gradient';
import styles from './employeeStyle'

import axios from 'axios';

import Constant from "../../Constants/constants"
import FilePickerManager from 'react-native-file-picker';
import { Actions } from "react-native-router-flux"
import RouteKey from '../../Constants/routesConstants';
import Global from '../../Constants/globalFunc';



class AddEmployee extends Component {


    // static navigationOptions = {
    //     title: "Create Task",

    //     drawerIcon: () => {
    //         return (
    //             <Icon name="ios-cog" />
    //         )
    //     }

    // }


    constructor(props) {
        super(props)
        this.state = {

            fileAttachment: [],
            loginUserDetail: {},
            loading: false,
            // new states
            isAttachmet: false,
            firstName: '',
            lastName: '',
            fullName: '',
            joiningDate: '',
            dob: '',
            salary: '',
            designation: '',
            email: '',


            loginUserDetail: {},

        }
        console.log(this.props)
    }



    componentWillMount() {
        this.getLoginUser()
        this.initialDate()
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

    initialDate() {


        var current = new Date()

        var day = current.getDate()
        var month = current.getMonth() + 1
        var year = current.getFullYear()
        var monthString = month <= 9 ? '0' + month : month
        var dayString = day <= 9 ? '0' + day : day
        var format = dayString + '-' + monthString + '-' + year
        this.setState({
            dob: format,
            joiningDate: format
        })


    }




     

    createEmployee() {
        console.log(this.state.fileAttachment[0].filename)

        if (this.state.firstName.trim() == "") {
            return Toast.show({
                text: 'Enter First Name',
                position: 'bottom',
                buttonText: 'Okay',
                type: "danger",
                duration: 3000
            })
        }
        if (this.state.lastName.trim() == "") {
            return Toast.show({
                text: 'Enter Last Name',
                position: 'bottom',
                buttonText: 'Okay',
                type: "danger",
                duration: 3000
            })
        }
        if (this.state.fullName.trim() == "") {
            return Toast.show({
                text: 'Enter Full Name',
                position: 'bottom',
                buttonText: 'Okay',
                type: "danger",
                duration: 3000
            })
        }
        if (this.state.salary.trim() == "") {
            return Toast.show({
                text: 'Enter Salary',
                position: 'bottom',
                buttonText: 'Okay',
                type: "danger",
                duration: 3000
            })
        }
        if (parseInt(this.state.salary) === 0) {
            return Toast.show({
                text: 'Enter Valid Salary',
                position: 'bottom',
                buttonText: 'Okay',
                type: "danger",
                duration: 3000
            })
        }
        if (this.state.designation.trim() == "") {
            return Toast.show({
                text: 'Enter Designation',
                position: 'bottom',
                buttonText: 'Okay',
                type: "danger",
                duration: 3000
            })
        }
        if (this.state.email.trim() == "") {
            return Toast.show({
                text: 'Enter Email',
                position: 'bottom',
                buttonText: 'Okay',
                type: "danger",
                duration: 3000
            })
        }
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email) !== true) {
            return Toast.show({
                text: 'Enter Valid Email',
                position: 'bottom',
                buttonText: 'Okay',
                type: "danger",
                duration: 3000
            })
        }
        if (this.state.isAttachmet === false) {
            return Toast.show({
                text: 'Select Image',
                position: 'bottom',
                buttonText: 'Okay',
                type: "danger",
                duration: 3000
            })
        }


        var data = {

            createdByID: this.state.loginUserDetail.employeeId,
            createdBy: this.state.loginUserDetail.name,
            imageUrl: this.state.fileAttachment[0].filename,
            email: this.state.email,
            salary: this.state.salary,
            dateOfBirth: this.state.dob,
            joinedDate: this.state.joiningDate,
            name: this.state.firstName,
            fullName: this.state.fullName,
            lastName: this.state.lastName,
            designation: this.state.designation,
            isAdmin: false,
            password: ''
        }


        console.log(data)
        console.log(JSON.stringify(data, undefined, 2))

        this.setState({ loading: true })
        axios.post(Constant.BASE_URL + Constant.CREATE_EMPLOYEE, data)
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
                        Actions[RouteKey.OVERVIEW]()
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
                    <Button success rounded onPress={this.createEmployee.bind(this)}>
                        <Text>Create</Text>
                    </Button>
                </Item>
            )
        }
    }




    openDrawer() {
        Actions.drawerOpen()
    }

    countFile() {
        console.log('yai chala')
        // return (
        // <Text style={{ marginLeft: 5, alignSelf: 'center', color: 'white' }}>{this.state.fileCount}</Text>

        this.state.fileAttachment.map((m, v) => {
            return (
                < Image src={Constant.IMAGE_URL_PATH + m.fileName} style={{ width: 15 }} />

            )
        })


        // )
    }



    deleteImage(index) {
        var temp = this.state.fileAttachment
        temp.splice(index, 1)
        this.setState({ fileAttachment: temp, isAttachmet: false })
    }


    pickFile() {
        FilePickerManager.showFilePicker(null, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled file picker');
            }
            else if (response.error) {
                console.log('FilePickerManager Error: ', response.error);
            }
            else {

                var formdata = new FormData()
                formdata.append('name', 'avatar');
                formdata.append('file', {
                    uri: response.uri,
                    type: response.type,
                    name: response.fileName
                })
                console.log(Constant.BASE_URL, Constant.UPLOAD_FILE)
                this.setState({ loading: true })
                axios.post(Constant.BASE_URL + Constant.UPLOAD_FILE, formdata, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data',
                        'file': formdata
                    }
                })
                    .then((res) => {
                        this.state.fileAttachment.push(res.data.file)
                        this.setState({ isAttachmet: true, loading: false })
                        console.log(res)
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
        });
    }

    renderAttachImages() {
        console.log(this.state.fileAttachment)

        return (
            <View style={styles.imageDeleteView}>
                {
                    this.state.fileAttachment.map((m, v) => {
                        return (
                            < View style={styles.imageDeleteView} key={v}>
                                < Image source={{ uri: Constant.BASE_URL + Constant.IMAGE_URL_PATH + m.filename }} style={styles.attachImage} />
                                <Icon name='trash' style={styles.deleteImageIcon} onPress={this.deleteImage.bind(this, v)} />
                            </View >

                        )
                    })
                }
            </View>
        )



    }


    handleAttachButton() {
        return (
            <View style={{ flexDirection: 'row' }}>

                <Button onPress={this.pickFile.bind(this)} iconLeft rounded small style={styles.attachButton} >
                    <Text>Pick File</Text>
                </Button>
            </View>
        )

    }


    render() {
        return (
            <Container>
                <Header style={styles.header}>
                    <Left >
                        <Icon name="menu" style={styles.iconColor} onPress={this.openDrawer.bind(this)} />
                    </Left>
                    <Body>
                        <Title>New Employee</Title>
                    </Body>
                    <Right />
                </Header>


                <LinearGradient colors={['#b39ddb', '#b39ddb', '#7e57c2']} style={{ flex: 1 }}>

                    <Content>



                        <Text style={styles.label}>First Name </Text>
                        <Item rounded style={styles.textbox}>
                            <Input onChangeText={(text) => { this.setState({ firstName: text }) }} placeholder='First name' style={styles.inputText} placeholderTextColor='white' />
                        </Item>





                        <Text style={styles.label}>Last Name</Text>
                        <Item rounded style={styles.textbox}>
                            <Input onChangeText={(text) => { this.setState({ lastName: text }) }} placeholder='Last name' style={styles.inputText} placeholderTextColor='white' />
                        </Item>




                        <Text style={styles.label}>Full Name</Text>
                        <Item rounded style={styles.textbox}>
                            <Input onChangeText={(text) => { this.setState({ fullName: text }) }} placeholder='Full name' style={styles.inputText} placeholderTextColor='white' />
                        </Item>

                        <Text style={styles.label}>Joining Date</Text>


                        <DatePicker
                            style={styles.datePicker}
                            date={this.state.joiningDate}
                            mode="date"
                            placeholder="select date"
                            format="DD-MM-YYYY"
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
                            onDateChange={(date) => { this.setState({ joiningDate: date }) }}
                        />



                        <Text style={styles.label}>Date Of Birth</Text>




                        <DatePicker
                            style={styles.datePicker}
                            date={this.state.dob}
                            mode="date"
                            placeholder="select date"
                            format="DD-MM-YYYY"
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
                            onDateChange={(date) => { this.setState({ dob: date }) }}
                        />


                        <Text style={styles.label}>Salary</Text>
                        <Item rounded style={styles.textbox}>
                            <Input maxLength={7} keyboardType='numeric' onChangeText={(text) => { this.setState({ salary: text }) }} placeholder='Salary' style={styles.inputText} placeholderTextColor='white' />
                        </Item>



                        <Text style={styles.label}>Designation </Text>
                        <Item rounded style={styles.textbox}>
                            <Input onChangeText={(text) => { this.setState({ designation: text }) }} placeholder='Designation' style={styles.inputText} placeholderTextColor='white' />
                        </Item>


                        <Text style={styles.label}>Email </Text>
                        <Item rounded style={styles.textbox}>
                            <Input onChangeText={(text) => { this.setState({ email: text }) }} placeholder='Email' style={styles.inputText} placeholderTextColor='white' />
                        </Item>






                        <Text style={styles.label}> {this.state.isAttachmet === false ? ' Add Image' : 'Image Added'} </Text>



                        {this.state.isAttachmet === false ? this.handleAttachButton() : null}






                        {this.renderAttachImages()}


                        {this.handleLoadingButton()}



                    </Content>






                </LinearGradient>

            </Container >
        )
    }
}
export default AddEmployee