import React, { Component } from 'react'
import { View, AsyncStorage } from 'react-native'
import { Textarea, Button, Input, Content, Body, Container, Header, Title, Card, CardItem, Right, Text, Left, Icon, Item, Thumbnail, Toast } from 'native-base';
import DatePicker from 'react-native-datepicker'
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles'

import axios from 'axios';

import Constant from "../../Constants/constants"
import FilePickerManager from 'react-native-file-picker';
import { NavigationEvents } from 'react-navigation';
class CreateTask extends Component {


    static navigationOptions = {
        title: "Create Task",

        drawerIcon: () => {
            return (
                <Icon name="ios-cog" />
            )
        }

    }


    constructor(props) {
        super(props)
        this.state = {
            employeeList: [],
            filterList: [],
            searchText: '',
            selectedEmployee: {},
            isEmpSelected: false,
            startDate: new Date(),
            endDate: new Date(),
            priorityId: 0,
            priority: [
                { name: 'HIGH', id: 1 },
                { name: 'MEDIUM', id: 2 },
                { name: 'LOW', id: 3 },
            ],

            taskTitle: '',
            taskDescription: '',
            fileAttachment: []

        }
        console.log(this.props)
    }



    componentWillMount() {

    }
    componentWillUnmount() {
        console.log('unmount')
    }


    openDrawer() {
        this.props.navigation.openDrawer()
    }






    searchEmp(text) {

        if (text.trim() === '') {
            this.setState({ filterList: [] })
            return;
        }



        console.log(text)
        var filter, i, txtValue;
        var temp = []
        filter = text.toUpperCase();

        for (i = 0; i < this.state.employeeList.length; i++) {
            txtValue = this.state.employeeList[i].name

            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                temp.push(this.state.employeeList[i])
            }
        }

        this.setState({ filterList: temp })
        // console.log(this.state.filterList)
        console.log(temp)

    }

    handleSearch() {
        // employeeList

        return (
            <View>
                <Item rounded style={styles.textbox}>
                    <Icon name="ios-search" color='white' />
                    <Input onChangeText={this.searchEmp.bind(this)} value={this.searchText} placeholder="Search" style={styles.inputText} placeholderTextColor='white' />
                </Item>

                <View >
                    {this.state.filterList.map((m, v) => {
                        return (
                            <Card style={{ width: '90%', marginLeft: '5%', }} key={v}>
                                <CardItem >
                                    <Left>
                                        {/* <Thumbnail source={{ uri: '../images/doc.jpg' }} /> */}
                                        <Thumbnail source={require('../../images/doc.jpg')} />
                                        <Text>{m.name}</Text>
                                    </Left>

                                    <Right>

                                        <Icon name="checkmark" onPress={this.selectEmp.bind(this, m)} />
                                    </Right>

                                </CardItem>
                            </Card>
                        )
                    })}



                </View>
            </View>
        )


    }

    selectEmp(data) {
        this.setState({ isEmpSelected: true, selectedEmployee: data, filterList: [] })
        console.log('click', this.state.selectedEmployee)
    }

    handleSelectedEmp() {
        return (
            <CardItem style={{ backgroundColor: 'transparent', borderWidth: 0, borderColor: 'transparent' }}>
                <Left>
                    {/* <Thumbnail source={{ uri: '../images/doc.jpg' }} /> */}
                    <Thumbnail source={require('../../images/doc.jpg')} />
                    <Text style={{ color: 'white' }}>{this.state.selectedEmployee.name}</Text>
                </Left>
                <Right>
                    <Icon name="checkmark" style={{ color: 'blue' }} />
                </Right>
            </CardItem>

        )
    }

    handlePriorty() {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

                {this.state.priority.map((m, v) => {
                    return (
                        <Button onPress={() => { this.setState({ priorityId: m.id }) }} iconLeft rounded small style={m.id === 1 ? styles.red : m.id === 2 ? styles.blue : m.id === 3 ? styles.green : null} key={v}>
                            {m.id === this.state.priorityId ? <Icon name='checkmark' /> : null}
                            <Text>{m.name}</Text>
                        </Button>
                    )
                })}
            </View>
        )
    }

    getAllEmployee() {
        console.log('call')
        AsyncStorage.getItem(Constant.USER_DETAIL_KEY)
            .then((response) => {
                if (response) {
                    var detail = JSON.parse(response)
                    var userId = detail.employeeId
                    console.log(Constant.BASE_URL + Constant.GET_ALL_EMPLOYEE + userId)
                    axios.get(Constant.BASE_URL + Constant.GET_ALL_EMPLOYEE + userId)
                        .then((res) => {
                            console.log(res)
                            if (res.data.success === true) {

                                if (res.data.returnObj[0] !== undefined) {
                                    this.setState({ employeeList: res.data.returnObj })
                                }
                                else {
                                    this.setState({ employeeList: [] })
                                }
                            }
                            else {
                                Toast.show({
                                    text: res.data.message,
                                    position: 'bottom',
                                    buttonText: 'Okay',
                                    type: "danger",
                                    duration: 3000
                                })
                            }
                        })
                }
            })
    }


    createTask() {
        console.log(this.state.fileAttachment)

        if (this.state.taskTitle.trim() == "") {
            return Toast.show({
                text: 'Enter Task Title',
                position: 'bottom',
                buttonText: 'Okay',
                type: "danger",
                duration: 3000
            })
        }
        if (this.state.taskDescription.trim() == "") {
            return Toast.show({
                text: 'Enter Task Description',
                position: 'bottom',
                buttonText: 'Okay',
                type: "danger",
                duration: 3000
            })
        }
        if (this.state.priorityId == 0) {
            return Toast.show({
                text: 'Select Task Priority',
                position: 'bottom',
                buttonText: 'Okay',
                type: "danger",
                duration: 3000
            })
        }
        if (this.state.isEmpSelected == false) {
            return Toast.show({
                text: 'Select Employee',
                position: 'bottom',
                buttonText: 'Okay',
                type: "danger",
                duration: 3000
            })
        }





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
                axios.post(Constant.BASE_URL + Constant.UPLOAD_FILE, formdata, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data',
                        'file': formdata
                    }
                })
                    .then((res) => {
                        this.state.fileAttachment.push(res.data.file)
                    })
            }
        });
    }




    render() {
        return (
            <Container>
                <Header style={styles.header}>
                    <Left >
                        <Icon name="menu" style={styles.iconColor} onPress={this.openDrawer.bind(this)} />
                    </Left>
                    <Body>
                        <Title>Create Task</Title>
                    </Body>
                    <Right />
                </Header>


                <NavigationEvents
                    onWillFocus={() => { this.getAllEmployee() }}

                />
                <LinearGradient colors={['#b39ddb', '#b39ddb', '#7e57c2']} style={{ flex: 1 }}>

                    <Content>



                        <Text style={styles.label}>Whom do you want to assign? </Text>

                        {this.handleSearch()}
                        {this.state.isEmpSelected === true ? this.handleSelectedEmp() : null}






                        <Text style={styles.label}>What will be task title?</Text>
                        <Item rounded style={styles.textbox}>
                            <Input onChangeText={(text) => { this.setState({ taskTitle: text }) }} placeholder='Task title' style={styles.inputText} placeholderTextColor='white' />
                        </Item>

                        <Text style={styles.label}>Task starts from</Text>




                        <DatePicker
                            style={styles.datePicker}
                            date={this.state.startDate}
                            mode="date"
                            placeholder="select date"
                            format="DD-MM-YYYY"
                            minDate={new Date()}
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
                            onDateChange={(date) => { this.setState({ startDate: date, endDate: date }) }}
                        />
                        <Text style={styles.label}>Task valid till</Text>




                        <DatePicker
                            style={styles.datePicker}
                            date={this.state.endDate}
                            mode="date"
                            placeholder="select date"
                            format="DD-MM-YYYY"
                            minDate={this.state.startDate}
                            // maxDate="2016-06-01"
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
                            onDateChange={(date) => { this.setState({ endDate: date }) }}
                        />



                        <Text style={styles.label}>What will task description? </Text>
                        <Textarea onChangeText={(text) => { this.setState({ taskDescription: text }) }} style={styles.textarea} rowSpan={5} bordered placeholder="write description" placeholderTextColor='white' />


                        <Text style={styles.label}>What will task priority? </Text>




                        {this.handlePriorty()}


                        <Text style={styles.label}>Add attchment (Optional) </Text>


                        <Button onPress={this.pickFile.bind(this)} iconLeft rounded small style={styles.attachButton} >
                            <Text>Pick File</Text>
                        </Button>

                        {this.state.fileAttachment.length > 0 ? <Text>{this.state.fileAttachment.length}</Text> : null}



                        <Item style={styles.buttonStyle}>

                            <Button success rounded onPress={this.createTask.bind(this)}>
                                <Text>Create</Text>
                            </Button>
                        </Item>



                    </Content>






                </LinearGradient>

            </Container >
        )
    }
}
export default CreateTask