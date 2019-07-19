import React, { Component } from 'react'
import { View, Image, AsyncStorage } from 'react-native'
import { Button, Content, Body, Container, Header, Title, Card, Right, Text, Left, Icon, Tab, Tabs, TabHeading } from 'native-base';
import styles from './profileStyles'
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
import Constant from '../../Constants/constants';




class UserProfile extends Component {



    constructor() {
        super()
        this.state = {
            userDetail: {}
        }
    }

    componentWillMount() {
        this.getUserDetail()
    }
    openDrawer() {
        // this.props.navigation.openDrawer()
        Actions.drawerOpen()
    }





    getUserDetail() {
        AsyncStorage.getItem(Constant.USER_DETAIL_KEY)
            .then((res) => {
                if (res) {
                    var data = JSON.parse(res)
                    console.log(data)
                    this.setState({ userDetail: data })
                }
            })
    }
    render() {
        return (
            <Container>
                <Header style={styles.header} hasTabs>
                    <Left >
                        <Icon name="menu" style={styles.iconColor} onPress={this.openDrawer.bind(this)} />
                    </Left>
                    <Body>
                        <Title>Profile</Title>
                    </Body>
                    <Right />
                </Header>

                <LinearGradient colors={['#b3e5fc', '#03a9f4', '#039be5']} style={{ flex: 1 }}>

                    <Content>






                        {/* <Image style={{ width: '20%', height: "20%" }} source={require("../../images/copy.jpg")} /> */}


                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>



                            <Card style={styles.pendingCard}>
                                <View style={styles.gradientBox}  >
                                    <Image style={styles.userImage} source={{ uri: Constant.BASE_URL + Constant.IMAGE_URL_PATH + this.state.userDetail.imageUrl }} />
                                </View>
                            </Card>
                        </View>


                        <View><Text style={styles.userName} >{this.state.userDetail.fullname}</Text></View>
                        <View><Text style={styles.userName} >{this.state.userDetail.designation}</Text></View>






                        <View
                            style={styles.gridCol}>
                            <View style={styles.gridCell}>
                                <Text style={styles.gridText} >Email</Text>
                            </View>
                            <View style={styles.gridCellValue}>
                                <Text style={styles.gridTextvalue} >{this.state.userDetail.email}</Text>
                            </View>


                        </View>

                        <View
                            style={styles.gridCol}>
                            <View style={styles.gridCell}>
                                <Text style={styles.gridText} >Status</Text>
                            </View>
                            <View style={styles.gridCellValue}>
                                <Text style={styles.gridTextvalue} >{this.state.userDetail.status}</Text>
                            </View>


                        </View>

                        <View
                            style={styles.gridCol}>
                            <View style={styles.gridCell}>
                                <Text style={styles.gridText} >Joining</Text>
                            </View>
                            <View style={styles.gridCellValue}>
                                <Text style={styles.gridTextvalue} >24-May-2018</Text>
                            </View>
                        </View>

                        <View
                            style={styles.gridCol}>
                            <View style={styles.gridCell}>
                                <Text style={styles.gridText} >Salary</Text>
                            </View>
                            <View style={styles.gridCellValue}>
                                <Text style={styles.gridTextvalue} >{this.state.userDetail.salary}</Text>
                            </View>


                        </View>










                    </Content>
                </LinearGradient>


            </Container>
        )
    }
}

export default UserProfile