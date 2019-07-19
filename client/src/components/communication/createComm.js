import React, { Component } from 'react'
import { View, AsyncStorage, Image } from 'react-native'
import { Textarea, Button, Input, Content, Body, Container, Header, Title, Card, CardItem, Right, Text, Left, Icon, Item, Thumbnail, Toast, Spinner } from 'native-base';
import DatePicker from 'react-native-datepicker'
import LinearGradient from 'react-native-linear-gradient';
import styles from './commStyles'
import { Actions } from 'react-native-router-flux';
import Constant from '../../Constants/constants';
import axios from 'axios'
import FilePickerManager from 'react-native-file-picker';
import RouteKey from '../../Constants/routesConstants';


class CreateComm extends Component {


    constructor(props) {
        super(props)
        this.state = {
            employeeList: [],
            filterList: [],
            searchText: '',
            selectedEmployee: [],
            isEmpSelected: false,
            chatTitle: '',
            chatDescription: '',
            message: '',
            fileAttachment: [],
            loginUserDetail: {},
            loading: false

        }
        console.log(this.props)
    }



    openDrawer() {
        Actions.drawerOpen()
    }

    componentWillMount() {
        this.getAllEmployee()
    }


    getAllEmployee() {
        console.log('call')
        AsyncStorage.getItem(Constant.USER_DETAIL_KEY)
            .then((response) => {
                if (response) {
                    console.log('details ', response)
                    var detail = JSON.parse(response)
                    var userId = detail.employeeId
                    this.setState({ loginUserDetail: detail })

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


    selectEmp(data) {
        var empList = this.state.selectedEmployee
        var tempData = []
        if (empList[0] !== undefined) {
            Promise.all(
                empList.map((m, v) => {
                    if (m.employeeId === data.employeeId) {
                        empList.splice(v, 1)
                    }
                })
            ).then(() => {
                var toBepush = {
                    employeeId: data.employeeId,
                    employeeName: data.name,
                    imageUrl: data.imageUrl
                }
                empList.push(toBepush)

                this.setState({ isEmpSelected: true, selectedEmployee: empList, filterList: [] })

            })

        }
        else {

            var toBepushed = {
                employeeId: data.employeeId,
                employeeName: data.name,
                imageUrl: data.imageUrl
            }
            tempData.push(toBepushed)
            console.log('this is pushing', tempData)
            this.setState({ isEmpSelected: true, selectedEmployee: tempData, filterList: [] })
        }
    }


    handleSearch() {
        return (
            <View>
                <Item rounded style={styles.textbox}>
                    <Icon name="ios-search" color='white' />
                    <Input onChangeText={this.searchEmp.bind(this)} value={this.searchText} placeholder="Search" style={styles.inputText} placeholderTextColor='white' />
                </Item>

                <View >
                    {this.state.filterList.map((m, v) => {
                        return (
                            <Card style={{ width: '90%', marginLeft: '5%', }} key={v} >
                                <CardItem >
                                    <Left>
                                        {/* <Thumbnail source={{ uri: '../images/doc.jpg' }} /> */}
                                        <Thumbnail source={{ uri: Constant.BASE_URL + Constant.IMAGE_URL_PATH + m.imageUrl }} />
                                        <Text>{m.name}</Text>
                                    </Left>
                                    <Right >
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

    handleSelectedEmp() {
        return (
            <View>
                {
                    this.state.selectedEmployee.map((m, v) => {
                        return (
                            <CardItem key={v} style={{ backgroundColor: 'transparent', borderWidth: 0, borderColor: 'transparent' }}>
                                <Left>
                                    {/* <Thumbnail source={{ uri: '../images/doc.jpg' }} /> */}
                                    <Thumbnail source={{ uri: Constant.BASE_URL + Constant.IMAGE_URL_PATH + m.imageUrl }} />
                                    <Text style={{ color: 'white' }}>{m.employeeName}</Text>
                                </Left>
                                <Right>
                                    <Icon name="trash" style={{ color: 'red' }} onPress={this.deleteEmp.bind(this, v)} />
                                </Right>
                            </CardItem>
                        )
                    })
                }


            </View>

        )
    }

    deleteEmp(index) {
        var temp = this.state.selectedEmployee
        temp.splice(index, 1)
        if (temp[0] !== undefined) {
            this.setState({ isEmpSelected: true, selectedEmployee: temp, filterList: [] })
        }
        else {
            this.setState({ isEmpSelected: false, selectedEmployee: temp, filterList: [] })
        }
    }


    createChat() {
        if (this.state.chatTitle.trim() == "") {
            return Toast.show({
                text: 'Enter Chat Title',
                position: 'bottom',
                buttonText: 'Okay',
                type: "danger",
                duration: 3000
            })
        }
        if (this.state.chatDescription.trim() == "") {
            return Toast.show({
                text: 'Enter Chat Description',
                position: 'bottom',
                buttonText: 'Okay',
                type: "danger",
                duration: 3000
            })
        }
        if (this.state.message.trim() == "") {
            return Toast.show({
                text: 'Enter Chat Message',
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


        this.setState({ loading: true })
        var data = {
            title: this.state.chatTitle,
            description: this.state.chatDescription,
            createdByID: this.state.loginUserDetail.employeeId,
            createdBy: this.state.loginUserDetail.name,
            isActive: true,
            isDelete: false,
            isBlocked: false,
            imageUrlCreatedBy: this.state.loginUserDetail.imageUrl,
            GUID: "",
            message: this.state.message,
            chatMembers: this.state.selectedEmployee
        }
        console.log(data)
        axios.post(Constant.BASE_URL + Constant.CREATE_CHAT, data)
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
                        Actions[RouteKey.COMM_LIST]()
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
                    <Button success rounded onPress={this.createChat.bind(this)}>
                        <Text>Create</Text>
                    </Button>
                </Item>
            )
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
                axios.post(Constant.BASE_URL + Constant.UPLOAD_FILE, formdata, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data',
                        'file': formdata
                    }
                })
                    .then((res) => {
                        var temp = this.state.fileAttachment
                        temp.push(res.data.file)
                        this.setState({ fileAttachment: temp })
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

    deleteImage(index) {
        var temp = this.state.fileAttachment
        temp.splice(index, 1)
        this.setState({ fileAttachment: temp })
    }

    render() {
        return (
            <Container>
                <Header style={styles.header}>
                    <Left >
                        <Icon name="menu" style={styles.iconColor} onPress={this.openDrawer.bind(this)} />
                    </Left>
                    <Body>
                        <Title>Create Chat</Title>
                    </Body>
                    <Right />
                </Header>


                <LinearGradient colors={['#b39ddb', '#b39ddb', '#7e57c2']} style={{ flex: 1 }}>
                    <Content>

                        <Text style={styles.label}>Whom do you want to chat with? </Text>


                        {this.handleSearch()}
                        {this.state.isEmpSelected === true ? this.handleSelectedEmp() : null}






                        <Text style={styles.label}>What will be chat title?</Text>
                        <Item rounded style={styles.textbox}>
                            <Input placeholder='Chat title' style={styles.inputText} placeholderTextColor='white' onChangeText={(text) => { this.setState({ chatTitle: text }) }} />
                        </Item>

                        <Text style={styles.label}>What will be chat description? </Text>
                        <Textarea style={styles.textarea} rowSpan={5} bordered placeholder="write description" placeholderTextColor='white' onChangeText={(text) => { this.setState({ chatDescription: text }) }} />


                        <Text style={styles.label}>What will be first message? </Text>
                        <Textarea style={styles.textarea} rowSpan={5} bordered placeholder="write message" placeholderTextColor='white' onChangeText={(text) => { this.setState({ message: text }) }} />



                        <Text style={styles.label}>Add attchment (Optional) </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Button onPress={this.pickFile.bind(this)} iconLeft rounded small style={styles.attachButton} >
                                <Text>Pick File</Text>
                            </Button>
                        </View>


                        {this.renderAttachImages()}



                        {this.handleLoadingButton()}



                    </Content>






                </LinearGradient>

            </Container>
        );
    }
}


export default CreateComm;
