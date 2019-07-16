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



    goBack() {
        // this.props.navigation.pop()
        Actions.pop()
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
                        <Text style={styles.detailAns}>this is title   </Text>




                        <Text style={styles.headingDetail}>Task Description :</Text>
                        <Text style={styles.detailAns}>this is some descriptionthis is some description this is some   </Text>




                        <Text style={styles.headingDetail}>Starts Date :</Text>
                        <Text style={styles.detailAns}>20-july-2019   </Text>


                        <Text style={styles.headingDetail}>Deadline :</Text>
                        <Text style={styles.detailAns}>23-july-2019   </Text>


                        <Text style={styles.headingDetail}>Task Priority :</Text>
                        <Text style={styles.detailAns}> LOW   </Text>


                        <Text style={styles.headingDetail}>Current Progress :</Text>
                        <Text style={styles.detailAns}>20%</Text>


                        <Text style={styles.headingDetail}>Assign By :</Text>
                        <Text style={styles.detailAns}>Sabih siddiqui</Text>


                        <Text style={styles.headingDetail}>Assigned on :</Text>
                        <Text style={styles.detailAns}>12-feb-2018</Text>



                        <Text style={styles.headingDetail}>Attachments :</Text>



                        <ScrollView horizontal={true} contentContainerStyle={styles.contentContainer}>
                            <View style={styles.imageCardTaskDetail} >
                                <Image style={[styles.imageAttach]} source={require('../../images/doc.jpg')} />
                            </View>
                            <View style={styles.imageCardTaskDetail} >
                                <Image style={[styles.imageAttach]} source={require('../../images/doc.jpg')} />
                            </View>
                            <View style={styles.imageCardTaskDetail} >
                                <Image style={[styles.imageAttach]} source={require('../../images/doc.jpg')} />
                            </View>
                            <View style={styles.imageCardTaskDetail} >
                                <Image style={[styles.imageAttach]} source={require('../../images/doc.jpg')} />
                            </View>
                            <View style={styles.imageCardTaskDetail} >
                                <Image style={[styles.imageAttach]} source={require('../../images/doc.jpg')} />
                            </View>
                        </ScrollView>



                    </Content>


                </LinearGradient>






            </Container>




        )
    }



}

export default TaskDetail