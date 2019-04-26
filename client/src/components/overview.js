//import liraries
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Content, Body, Container, Header, Title, Card, CardItem, Right, Text, Left, Icon } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import ProgressCircle from 'react-native-progress-circle'

class Overview extends Component {

    static navigationOptions = {
        title: "Overview",

        drawerIcon: () => {
            return (
                <Icon name="ios-cog" />
            )
        }

    }
    render() {
        return (

            // <View style={styles.container}>
            //     <Text onPress={() => { this.props.navigation.openDrawer() }} >Welcome To Task Management</Text>
            // </View>



            <Container>
                <Header style={styles.header}>
                    <Left />
                    <Body>
                        <Title>Overview</Title>
                    </Body>
                    <Right />
                </Header>



                <LinearGradient colors={['#b3e5fc', '#03a9f4', '#039be5']} style={{ flex: 1 }}>
                    <Content>
                        <Card style={styles.mainCard}>
                            <Text style={styles.message}>Alert you have a dedline today</Text>
                            <Text note style={styles.date}>Assign by sabih on 23-Apr</Text>
                            <Text style={styles.description}>
                                fix all ui bugs
                                </Text>

                            <View style={{ marginLeft: 10, flexDirection: 'row' }}>


                                <ProgressCircle
                                    percent={50}
                                    radius={20}
                                    borderWidth={3}
                                    color="#3399FF"
                                    shadowColor="#999"
                                    bgColor="#fff"

                                >
                                    <Text style={{ fontSize: 12 }}>{'50%'}</Text>
                                </ProgressCircle>

                                <View style={{ marginLeft: 5, }}>

                                    <Text note>Deadline 23-April-2019  </Text>
                                    <Text note>Last updated on 11-April-2019</Text>
                                </View>

                            </View>



                            <Button rounded light small style={{ alignSelf: 'center', marginBottom: 15, marginTop: 15 }}>
                                <Text uppercase={false}>Update Now</Text>
                            </Button>

                        </Card>


                    </Content>











                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>


                        <Card style={styles.pendingCard}>
                            <LinearGradient style={styles.gradientBox} colors={['#f48fb1', '#f06292', '#ec407a']} >

                                <View style={{ flexDirection: 'column', justifyContent: 'center', height: '100%' }}>

                                    <Text style={styles.number}>01</Text>
                                    <Text style={styles.statusHeading}>pending</Text>
                                </View>

                            </LinearGradient>
                        </Card>

                        <Card style={styles.pendingCard}>


                            <LinearGradient style={styles.gradientBox} colors={['#9fa8da', '#7986cb', '#5c6bc0']} >

                                <View style={{ flexDirection: 'column', justifyContent: 'center', height: '100%' }}>

                                    <Text style={styles.number}>05</Text>
                                    <Text style={styles.statusHeading}>Over due</Text>
                                </View>

                            </LinearGradient>
                        </Card>


                        <Card style={styles.pendingCard}>
                            <LinearGradient style={styles.gradientBox} colors={['#80cbc4', '#4db6ac', '#26a69a']} >

                                <View style={{ flexDirection: 'column', justifyContent: 'center', height: '100%' }}>

                                    <Text style={styles.number}>25</Text>
                                    <Text style={styles.statusHeading}>Completed</Text>
                                </View>

                            </LinearGradient>
                        </Card>

                    </View>


                </LinearGradient>















            </Container>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        backgroundColor: "#039be5"
    },
    message: {
        paddingLeft: 10,
        paddingTop: 10,
        fontFamily: 'Cochin',
        // fontWeight: 'bold',
        color: 'red'
    },

    date: {
        paddingLeft: 10,
        fontFamily: 'Cochin',
    },
    description: {
        paddingLeft: 10,
        paddingTop: 15,
        paddingBottom: 15,
        fontFamily: 'Cochin',
        fontWeight: 'bold',

    },
    mainCard: {
        // marginLeft: 12,
        // marginRight: 12,
        // marginTop: 12,
        width: '90%',
        marginLeft: '5%',
        // marginTop: '5%',
        borderRadius: 10,
        // backgroundColor: '#e1bee7'

    },
    pendingCard: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        // marginLeft: '5%',
        marginTop: '5%',
        // borderRadius: 50,

    },
    statusHeading: {
        alignSelf: 'center',
        color: 'white'

    },
    number: {
        alignSelf: 'center',
        fontFamily: 'Cochin',
        fontWeight: 'bold',
        color: 'white'

    },
    gradientBox: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
    }


});

//make this component available to the app
export default Overview;