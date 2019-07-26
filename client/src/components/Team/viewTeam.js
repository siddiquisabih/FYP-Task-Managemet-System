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

export default class ViewTeam extends Component {



    constructor() {
        super()
        this.state = {
            loginUserDetail: {},
            employeeList: [],
            isLoading: true,
            noRecord: false,
            isData: false
        }
    }




    componentWillMount() {
        this.getAllMemberList()
    }

    getAllMemberList() {
        this.setState({ isLoading: true })

        console.log(this.props.data)
        axios.get(Constant.BASE_URL + Constant.GET_MEMBER_LIST + this.props.data)
            .then((res) => {
                console.log(res)
                if (res.data.success === true) {
                    if (res.data.returnObject) {
                        this.setState({ employeeList: res.data.returnObject, isLoading: false, noRecord: false, isData: true })
                    }
                    else {
                        this.setState({ employeeList: [], isLoading: false, noRecord: true, isData: false })
                    }
                }
            })
            .catch((err) => {
                console.log(err.message)
                this.setState({ employeeList: [], isLoading: false, noRecord: true, isData: false })
                Toast.show({
                    text: 'Check your network',
                    position: 'bottom',
                    buttonText: 'Okay',
                    type: "danger",
                    duration: 3000
                })
            })
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
                                    <Text style={{ color: 'black' }}>{m.employeeName}</Text>
                                </Left>
                                <Right />
                            </CardItem>
                        </Card>

                    )
                })}
            </View>
        )


    }

    handleTeamName() {
        return (
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 25, margin: 10 }}>
                {this.props.userName} 's Team
        </Text>
        )
    }

    handleNoRecord() {
        return (
            <Container style={styles.noRecordStyle} >

                <Text style={styles.noRecordText} >
                    No Members Found
            </Text>
            </Container>
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
                        <Title>Team Members</Title>
                    </Body>
                    <Right />
                </Header>


                <LinearGradient colors={['#b39ddb', '#b39ddb', '#7e57c2']} style={{ flex: 1 }}>
                    {this.state.noRecord === true ? this.handleNoRecord() : null}
                    <Content>

                        {this.state.isData === true ? this.handleTeamName() : null}
                        {this.state.isData === true ? this.handleUserList() : null}

                    </Content>






                </LinearGradient>

            </Container >
        )
    }
}
