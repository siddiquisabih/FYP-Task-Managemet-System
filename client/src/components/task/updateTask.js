import React, { Component } from 'react';
import { View, Image, Slider, ScrollView } from 'react-native';
import { Textarea, Button, Input, Content, Body, Container, Header, Title, Card, CardItem, Right, Text, Left, Icon, Item, Thumbnail, Tab, Tabs, TabHeading, Toast, Spinner } from 'native-base';
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import { Actions } from 'react-native-router-flux';
import Constant from '../../Constants/constants';
import axios from 'axios';
import RouteKey from '../../Constants/routesConstants';
import FilePickerManager from 'react-native-file-picker';



class UpdateTask extends Component {


    constructor(props) {
        super()
        this.state = {
            percentage: 0,
            taskDetail: {},
            attachments: [],
            description: '',
            loading: false
        }
    }

    goBack() {
        // this.props.navigation.pop()
        Actions.pop()
    }


    componentDidMount() {
        console.log(this.props.data)

        this.setState({ fileUploaded: true, fileCount: this.state.fileAttachment })
        this.setState({ taskDetail: this.props.data, percentage: this.props.data.progress, attachments: this.props.data.taskAttachment })
    }




    show() {
        var options = {
            title: 'Select Attachment',

            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        }


        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                console.log(response.uri)
                console.log(response.height)
                console.log(response.width)

            }
        });


    }



    updateTask() {

        if (this.state.description.trim() == "") {
            return Toast.show({
                text: 'Enter task description',
                position: 'bottom',
                buttonText: 'Okay',
                type: "danger",
                duration: 3000
            })
        }


        this.setState({ loading: true })

        var data = this.state.taskDetail
        data.taskAttachment = this.state.attachments
        data.progress = this.state.percentage
        data.description = this.state.description
        console.log(data)

        axios.post(Constant.BASE_URL + Constant.UPDATE_TASK, data)
            .then((res) => {
                console.log(res)
                if (res.data.success === true) {
                    Toast.show({
                        text: 'Task updated successfully',
                        position: 'bottom',
                        buttonText: 'Okay',
                        type: "success",
                        duration: 3000
                    })
                    setTimeout(() => {
                        Actions[RouteKey.DRAWER]()
                    }, 3000);
                    this.setState({ loading: false })
                }
                else {
                    this.setState({ loading: false })

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


    renderButton() {
        if (this.state.loading === true) {
            return (
                <Spinner />
            )
        }
        else {
            return (
                <Item style={styles.buttonStyle}>
                    <Button info rounded onPress={this.updateTask.bind(this)} >
                        <Text>update</Text>
                    </Button>
                </Item>
            )
        }
    }


    deleteImage(index) {
        var temp = this.state.attachments
        temp.splice(index, 1)
        this.setState({ attachments: temp })
    }




    pickFile() {
        console.log('click')
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

                        var temp = this.state.attachments
                        temp.unshift(res.data.file)
                        this.setState({ attachments: temp })
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










    showAttachments() {

        return (
            <ScrollView horizontal={true} contentContainerStyle={styles.contentContainer}>


                <View style={[styles.imageCard, { marginLeft: 10 }]} >
                    <Text onPress={this.pickFile.bind(this)} style={[styles.number, { fontSize: 20, fontWeight: 'bold' }]}>+</Text>
                </View>
                {

                    this.state.attachments.map((m, v) => {
                        return (
                            <View key={v}>

                                <View style={[styles.imageCard]} >
                                    <Image style={[styles.imageAttach]} source={{ uri: Constant.BASE_URL + Constant.IMAGE_URL_PATH + m.filename }} />
                                </View>
                                <Text style={{ textAlign: 'center', color: 'red' }} onPress={this.deleteImage.bind(this, v)}> Delete</Text>
                            </View>
                        )
                    })
                }

            </ScrollView>





        )


    }




    render() {




        return (
            <Container>
                <Header style={styles.header} hasTabs>
                    <Left >
                        <Icon name="arrow-round-back" style={styles.iconColor} onPress={this.goBack.bind(this)} />
                    </Left>
                    <Body>
                        <Title>Update Task</Title>
                    </Body>
                    <Right />
                </Header>


                <LinearGradient colors={['#b39ddb', '#b39ddb', '#7e57c2']} style={{ flex: 1 }}>

                    <Content>

                        <Text style={styles.label}>Description about progress </Text>
                        <Textarea onChangeText={(text) => { this.setState({ description: text }) }} style={styles.textarea} rowSpan={5} bordered placeholder="write description" placeholderTextColor='white' />

                        <Text style={styles.label}>What is your task progress? </Text>
                        <Text style={styles.label}>{this.state.percentage}% updated </Text>

                        <Slider
                            maximumValue={100}
                            step={5}
                            onValueChange={(value) => { this.setState({ percentage: value }) }}
                            value={this.state.percentage}
                        />




                        <Text style={styles.label}>Attachment (optional) </Text>

                        {/* <ScrollView horizontal={true} contentContainerStyle={styles.contentContainer}>


                            <View style={[styles.imageCard, { marginLeft: 10 }]} onPress={this.show.bind(this)}>
                                <Text style={[styles.number, { fontSize: 20, fontWeight: 'bold' }]}>+</Text>
                            </View>


                            <View style={[styles.imageCard]} >
                                <Image style={[styles.imageAttach]} source={require('../../images/doc1.jpg')} />
                            </View> */}

                        {this.showAttachments()}


                        {/* </ScrollView> */}


                        {this.renderButton()}

                    </Content>
                </LinearGradient>
            </Container >
        );
    }
}
export default UpdateTask;
