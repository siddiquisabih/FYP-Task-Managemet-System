import React, { Component } from 'react'
import { View, AsyncStorage, Image } from 'react-native'
import { Textarea, Button, Input, Content, Body, Container, Header, Title, Card, CardItem, Right, Text, Left, Icon, Item, Thumbnail, Toast, Spinner } from 'native-base';
import DatePicker from 'react-native-datepicker'
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles'
import { Actions } from 'react-native-router-flux';
import Constant from '../../Constants/constants';
import axios from 'axios';
import Global from '../../Constants/globalFunc';
import FilePickerManager from 'react-native-file-picker';
import RouteKey from '../../Constants/routesConstants';




class EditTask extends Component {



    goBack() {
        // this.props.navigation.pop()
        Actions.pop()
    }


    constructor() {
        super()
        this.state = {


            priorityId: 0,
            priority: [
                { name: 'HIGH', id: 1 },
                { name: 'MEDIUM', id: 2 },
                { name: 'LOW', id: 3 },
            ],
            taskTitle: '',
            taskDescription: '',
            startDate: new Date(),
            endDate: new Date(),
            minDate: '',
            fileAttachment: [],
            loading: false

        }
    }




    componentWillMount() {
        console.log(this.props.data)

        if (this.props.data !== undefined) {
            var dataToUpdate = this.props.data
            this.setState({

                priorityId: dataToUpdate.priority,
                taskTitle: dataToUpdate.taskTitle,
                taskDescription: dataToUpdate.description,
                startDate: dataToUpdate.startDate,
                endDate: dataToUpdate.endDate,
                minDate: dataToUpdate.startDate,
                fileAttachment: dataToUpdate.taskAttachment,
            })
        }
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



    deleteImage(index) {
        var temp = this.state.fileAttachment
        temp.splice(index, 1)
        this.setState({ fileAttachment: temp })
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
                        this.setState({ loading: false })
                        var temp = this.state.fileAttachment
                        temp.unshift(res.data.file)
                        this.setState({ fileAttachment: temp })


                    })
                    .catch(() => {
                        this.setState({ loading: false })
                        Toast.show({
                            text: "Can't upload file",
                            position: 'bottom',
                            buttonText: 'Okay',
                            type: "danger",
                            duration: 3000
                        })
                    })
            }
        });
    }




    renderButton() {
        if (this.state.loading === true) {
            return (
                <Spinner />
            )
        }
        else {
            return (

                <Item style={styles.buttonStyle}>

                    <Button success rounded onPress={this.saveTask.bind(this)}>
                        <Text>Save</Text>
                    </Button>
                </Item>
            )
        }
    }


    saveTask() {


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


        var dataToSend = this.props.data

        dataToSend.taskTitle = this.state.taskTitle
        dataToSend.description = this.state.taskDescription
        dataToSend.taskAttachment = this.state.fileAttachment
        dataToSend.priority = this.state.priorityId
        dataToSend.startDate = this.state.startDate
        dataToSend.endDate = this.state.endDate


        console.log(dataToSend, 'new data')

        this.setState({ loading: true })
        axios.post(Constant.BASE_URL + Constant.UPDATE_TASK, dataToSend)
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
                        Actions[RouteKey.DRAWER]()
                    }, 3000);
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



    render() {
        return (
            <Container>
                <Header style={styles.header} hasTabs>
                    <Left >
                        <Icon name="arrow-round-back" style={styles.iconColor} onPress={this.goBack.bind(this)} />
                    </Left>
                    <Body>
                        <Title>Edit Task</Title>
                    </Body>
                    <Right />
                </Header>



                <LinearGradient colors={['#b39ddb', '#b39ddb', '#7e57c2']} style={{ flex: 1 }}>

                    <Content>
                        <Text style={styles.label}>What will be task title?</Text>
                        <Item rounded style={styles.textbox}>
                            <Input onChangeText={(text) => { this.setState({ taskTitle: text }) }} value={this.state.taskTitle} placeholder='Task title' style={styles.inputText} placeholderTextColor='white' />
                        </Item>

                        <Text style={styles.label}>Task starts from</Text>




                        <DatePicker
                            style={styles.datePicker}
                            date={this.state.startDate}
                            mode="date"
                            placeholder="select date"
                            format="DD-MM-YYYY"
                            minDate={this.state.minDate}
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
                        <Textarea onChangeText={(text) => { this.setState({ taskDescription: text }) }} value={this.state.taskDescription} style={styles.textarea} rowSpan={5} bordered placeholder="write description" placeholderTextColor='white' />


                        <Text style={styles.label}>What will task priority? </Text>

                        {this.handlePriorty()}





                        <Text style={styles.label}>Add attchment (Optional) </Text>


                        <View style={{ flexDirection: 'row' }}>
                            <Button onPress={this.pickFile.bind(this)} iconLeft rounded small style={styles.attachButton} >
                                <Text>Pick File</Text>
                            </Button>
                        </View>


                        {this.renderAttachImages()}







                        {this.renderButton()}




                    </Content>






                </LinearGradient>

            </Container >
        )
    }
}
export default EditTask