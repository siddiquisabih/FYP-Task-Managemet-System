import React, { Component } from 'react'
import { View, AsyncStorage, Image } from 'react-native'
import { Textarea, Button, Input, Content, Body, Container, Header, Title, Card, CardItem, Right, Text, Left, Icon, Item, Thumbnail, Toast, Spinner } from 'native-base';

import LinearGradient from 'react-native-linear-gradient';
import styles from './teamStyles'
import axios from 'axios';
import Constant from "../../Constants/constants"
import { Actions } from "react-native-router-flux"
import RouteKey from '../../Constants/routesConstants';
import Global from '../../Constants/globalFunc';

export default class AddTeam extends Component {



    constructor() {
        super()
        this.state = {
            loginUserDetail: {},
            employeeList: [],
            isLoading: true,
            noRecord: false,
        }
    }



    componentWillMount() {
        this.getAllEmployee()
    }

    getAllEmployee() {
        this.setState({ isLoading: true })
        console.log('call')
        AsyncStorage.getItem(Constant.USER_DETAIL_KEY)
            .then((response) => {
                if (response) {
                    console.log('details ', response)
                    var detail = JSON.parse(response)
                    var userId = detail.employeeId
                    this.setState({ loginUserDetail: detail })

                    console.log(Constant.BASE_URL + Constant.GET_ALL_EMPLOYEE_FOR_TEAM + userId)
                    axios.get(Constant.BASE_URL + Constant.GET_ALL_EMPLOYEE_FOR_TEAM + userId)
                        .then((res) => {
                            console.log(res)
                            if (res.data.success === true) {
                                if (res.data.returnObj[0] !== undefined) {
                                    var temp = []
                                    res.data.returnObj.map((m) => {
                                        if (m.employeeId !== this.props.data) {
                                            temp.push(m)
                                        }
                                    })

                                    if (temp[0] !== undefined) {
                                        this.setState({ employeeList: temp, isLoading: false, noRecord: false })
                                    }
                                    else {
                                        this.setState({ employeeList: [], isLoading: false, noRecord: true })
                                    }
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
                        .catch((err) => {
                            this.setState({ employeeList: [], isLoading: false, noRecord: true })

                            Toast.show({
                                text: 'Check your network',
                                position: 'bottom',
                                buttonText: 'Okay',
                                type: "danger",
                                duration: 3000
                            })
                        })
                }
            })
    }


    goToViewTeam(id, name) {
        Actions[RouteKey.VIEW_TEAM]({ data: id, userName: name })
    }


    addMember(data) {
        var assignTo = this.props.data

        console.log(assignTo, data)

        var teamMembers = [{
            employeeId: data.employeeId,
            employeeName: data.name,
            imageUrl: data.imageUrl

        }]
        var data = { teamMembers }
        this.setState({ isLoading: true })

        console.log(Constant.BASE_URL + Constant.ADD_TEAM_MEMBER + assignTo)
        axios.post(Constant.BASE_URL + Constant.ADD_TEAM_MEMBER + assignTo, data)
            .then((res) => {
                console.log(res)
                if (res.data.returnObject) {
                    Toast.show({
                        text: 'Check your network',
                        position: 'bottom',
                        buttonText: 'Okay',
                        type: "danger",
                        duration: 3000
                    })

                    this.getAllEmployee()
                }
            })

            .catch((err) => {
                console.log(err)
                Toast.show({
                    text: 'Check your network',
                    position: 'bottom',
                    buttonText: 'Okay',
                    type: "danger",
                    duration: 3000
                })
            })



        // console.log(this.props.data)
    }

    handleUserList() {
        return (
            <View style={{ width: '90%', marginLeft: '5%', }}>
                {this.state.employeeList.map((m, v) => {
                    return (
                        <Card key={v}>
                            <CardItem style={{ backgroundColor: 'transparent', borderWidth: 0, borderColor: 'transparent' }}>
                                <Left>
                                    <Thumbnail source={{ uri: Constant.BASE_URL + Constant.IMAGE_URL_PATH + m.imageUrl }} />
                                    <Text style={{ color: 'black' }}>{m.name}</Text>
                                </Left>
                                <Right>
                                    <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'flex-end', width: '100%' }}>
                                        <Icon name="add" style={{ color: 'gray', fontSize: 25, }} onPress={this.addMember.bind(this, m)} />
                                    </View>
                                </Right>
                            </CardItem>
                        </Card>

                    )
                })}
            </View>
        )


    }

    handleNoRecord() {
        return (
            <Container style={styles.noRecordStyle} >
                <Text style={styles.noRecordText} >
                    No Employee Found
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


    render() {
        return (
            <Container>
                <Header style={styles.header}>
                    <Left >
                        <Icon name="arrow-round-back" style={styles.iconColor} onPress={() => { Actions.pop() }} />
                    </Left>
                    <Body>
                        <Title>Add Members</Title>
                    </Body>
                    <Right />
                </Header>


                <LinearGradient colors={['#b39ddb', '#b39ddb', '#7e57c2']} style={{ flex: 1 }}>

                    {this.state.noRecord === true ? this.handleNoRecord() : null}

                    <Content>

                        {this.handleUserList()}
                        {this.state.isLoading === true ? this.handleLoading() : null}

                    </Content>






                </LinearGradient>

            </Container >
        )
    }
}
