import React, { Component } from 'react'
import { View, AsyncStorage, Image, ScrollView } from 'react-native'
import { Textarea, Button, Input, Content, Body, Container, Header, Title, Card, CardItem, Right, Text, Left, Icon, Item, Thumbnail, Toast, Spinner } from 'native-base';
import DatePicker from 'react-native-datepicker'
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles'

import axios from 'axios';

import Constant from "../../Constants/constants"
import FilePickerManager from 'react-native-file-picker';
import { Actions } from "react-native-router-flux"
import RouteKey from '../../Constants/routesConstants';



class TaskDetail extends Component {


    constructor() {
        super()
        this.state = {
            detailData: {},
            attachments: [],
            isAttachment: false,

        }
    }


    goBack() {
        // this.props.navigation.pop()
        Actions.pop()
    }



    componentWillMount() {
        console.log(this.props.data)

        if (this.props.data.taskAttachment[0] !== undefined) {

            this.setState({ detailData: this.props.data, attachments: this.props.data.taskAttachment, isAttachment: true })
        }
        else {

            this.setState({ detailData: this.props.data, attachments: this.props.data.taskAttachment, isAttachment: false })
        }


    }

    showAttachments() {

        return (
            <ScrollView horizontal={true} contentContainerStyle={styles.contentContainer}>
                {

                    this.state.attachments.map((m, v) => {
                        return (
                            <View key={v}>
                                <View style={styles.imageCardTaskDetail} >
                                    <Image style={[styles.imageAttach]} source={{ uri: Constant.BASE_URL + Constant.IMAGE_URL_PATH + m.filename }} />
                                </View>
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

                <Header style={styles.header}>
                    <Left >
                        <Icon name="arrow-round-back" style={styles.iconColor} onPress={this.goBack.bind(this)} />
                    </Left>
                    <Body>
                        <Title>Task Detail</Title>
                    </Body>
                    <Right />
                </Header>



                <LinearGradient colors={['#b3e5fc', '#03a9f4', '#039be5']} style={{ flex: 1 }}>
                    <Content>



                        <Text style={styles.headingDetail}>Task Title :</Text>
                        <Text style={styles.detailAns}>{this.state.detailData.taskTitle} </Text>




                        <Text style={styles.headingDetail}>Task Description :</Text>
                        <Text style={styles.detailAns}>{this.state.detailData.description}   </Text>




                        <Text style={styles.headingDetail}>Starts Date :</Text>
                        <Text style={styles.detailAns}>{this.state.detailData.startDateCustom}   </Text>


                        <Text style={styles.headingDetail}>Deadline :</Text>
                        <Text style={styles.detailAns}>{this.state.detailData.endDateCustom}   </Text>


                        <Text style={styles.headingDetail}>Task Priority :</Text>
                        <Text style={styles.detailAns}>
                            {this.state.detailData.priority === 1 ? 'High'
                                : this.state.detailData.priority === 2 ? 'Medium'
                                    : this.state.detailData.priority === 3 ? 'Low' : null
                            }
                        </Text>


                        <Text style={styles.headingDetail}>Current Progress :</Text>
                        <Text style={styles.detailAns}>{this.state.detailData.progress}%</Text>


                        <Text style={styles.headingDetail}>Assign By :</Text>
                        <Text style={styles.detailAns}>{this.state.detailData.createdBy}</Text>


                        <Text style={styles.headingDetail}>Assign To :</Text>
                        <Text style={styles.detailAns}>{this.state.detailData.employeeName}</Text>


                        <Text style={styles.headingDetail}>Assigned on :</Text>
                        <Text style={styles.detailAns}>{this.state.detailData.createdDateCustom}</Text>



                        <Text style={styles.headingDetail}>Attachments :</Text>


                        {this.state.isAttachment === true ? this.showAttachments() : <Text style={styles.detailAns}>No attachment available</Text>}



                    </Content>


                </LinearGradient>






            </Container>




        )
    }



}

export default TaskDetail