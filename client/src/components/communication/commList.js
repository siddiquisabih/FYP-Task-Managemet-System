import React, { Component } from 'react'
import { View } from 'react-native'
import { Button, Content, Body, Container, Header, Title, Card, Right, Text, Left, Icon, Tab, Tabs, TabHeading } from 'native-base';
import ProgressCircle from 'react-native-progress-circle'
import LinearGradient from 'react-native-linear-gradient';

import styles from './commStyles'

class CommList extends Component {
    static navigationOptions = {
        title: "Chat List",

        drawerIcon: () => {
            return (
                <Icon name="ios-cog" />
            )
        }
    }
    openDrawer() {
        this.props.navigation.openDrawer()
    }


    goToChatRoom() {
        this.props.navigation.navigate('ChatRoomRoute')
    }


    render() {
        return (

            <Container>
                <Header style={styles.header} hasTabs>
                    <Left >
                        <Icon name="menu" style={styles.iconColor} onPress={this.openDrawer.bind(this)} />
                    </Left>
                    <Body>
                        <Title>Chat List</Title>
                    </Body>
                    <Right />
                </Header>


                <Tabs >
                    <Tab heading={<TabHeading style={{ backgroundColor: '#039be5' }}><Text>To You</Text></TabHeading>}>

                        <LinearGradient colors={['#b2dfdb', '#80cbc4', '#4db6ac']} style={{ flex: 1 }}>

                            <Content padder>

                                <Card style={styles.mainCard}>
                                    <Text style={styles.messageHeading}>Sabih started chat with you</Text>
                                    <Text note style={styles.date}> 23-Apr-2019</Text>
                                    <Text style={styles.descriptionCommText}>
                                        Party plan. let's go for summer camp
                                    </Text>



                                    <Button rounded light small style={styles.updateButton} onPress={this.goToChatRoom.bind(this)}>
                                        <Text uppercase={false}>Reply</Text>
                                    </Button>

                                </Card>


                            </Content>







                        </LinearGradient>

                    </Tab>



















                    <Tab heading={<TabHeading style={{ backgroundColor: '#039be5' }}><Text>By You</Text></TabHeading>}>



                        <LinearGradient colors={['#b2dfdb', '#80cbc4', '#4db6ac']} style={{ flex: 1 }}>

                            <Content padder>

                                <Card style={styles.mainCard}>
                                    <Text style={styles.messageHeading}>You started chat</Text>
                                    <Text note style={styles.date}> 23-Apr-2019</Text>
                                    <Text style={styles.descriptionCommText}>
                                        Party plan. let's go for summer camp
                                    </Text>


                                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                                        <Button rounded light small style={styles.updateButton} onPress={this.goToChatRoom.bind(this)}>
                                            <Text uppercase={false}>Reply</Text>
                                        </Button>
                                        <Button rounded light small style={styles.updateButton} >
                                            <Text uppercase={false}>Delete</Text>
                                        </Button>
                                    </View>

                                </Card>

                            </Content>

                        </LinearGradient>






                    </Tab>

                </Tabs>









            </Container>

        );
    }
}




export default CommList;
