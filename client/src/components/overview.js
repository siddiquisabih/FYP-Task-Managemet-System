//import liraries
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Content, Body, Container, Header, Title, Card, CardItem, Right, Text, Left, Icon } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

class Welcome extends Component {

    static navigationOptions = {
        title: "Welcome",

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


                            <Button rounded light small style={{ alignSelf: 'center', marginBottom: 12 }}>
                                <Text uppercase={false}>Update Now</Text>
                            </Button>

                        </Card>


                    </Content>
                </LinearGradient>












                <Card style={styles.pendingCard}>
                    <Text style={styles.message}>pending</Text>

                </Card>



















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
        marginTop: '5%',
        borderRadius: 10,
        // backgroundColor: '#e1bee7'

    },
    pendingCard: {
        width: '30%',
        height:'30%',
        marginLeft: '5%',
        marginTop: '5%',
        borderRadius: 50,

    }


});

//make this component available to the app
export default Welcome;
