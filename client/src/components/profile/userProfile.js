import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { Button, Content, Body, Container, Header, Title, Card, Right, Text, Left, Icon, Tab, Tabs, TabHeading } from 'native-base';
import styles from './profileStyles'
import LinearGradient from 'react-native-linear-gradient';

class UserProfile extends Component {
    static navigationOptions = {
        title: "Profile",

        drawerIcon: () => {
            return (
                <Icon name="ios-cog" />
            )
        }
    }

    openDrawer() {
        this.props.navigation.openDrawer()
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
                                    <Image style={styles.userImage} source={require("../../images/copy.jpg")} />
                                </View>
                            </Card>
                        </View>


                        <View><Text style={styles.userName} >Sabih Siddiqui</Text></View>
                        <View><Text style={styles.userName} >Application Developer</Text></View>






                        <View
                            style={styles.gridCol}>
                            <View style={styles.gridCell}>
                                <Text style={styles.gridText} >Email</Text>
                            </View>
                            <View style={styles.gridCellValue}>
                                <Text style={styles.gridTextvalue} >SiddiquiSabih94@gmail.com</Text>
                            </View>


                        </View>
                       
                        <View
                            style={styles.gridCol}>
                            <View style={styles.gridCell}>
                                <Text style={styles.gridText} >Status</Text>
                            </View>
                            <View style={styles.gridCellValue}>
                                <Text style={styles.gridTextvalue} >Intern</Text>
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
                                <Text style={styles.gridTextvalue} >65,000</Text>
                            </View>


                        </View>










                    </Content>
                </LinearGradient>


            </Container>
        )
    }
}

export default UserProfile