import React, { Component } from 'react'
import { View } from 'react-native'
import { Button, Content, Body, Container, Header, Title, Card, Right, Text, Left, Icon, Tab, Tabs, TabHeading } from 'native-base';
import ProgressCircle from 'react-native-progress-circle'
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles'

class TaskList extends Component {
    static navigationOptions = {
        title: "Task List",

        drawerIcon: () => {
            return (
                <Icon name="ios-cog" />
            )
        }
    }
    openDrawer() {
        this.props.navigation.openDrawer()
    }



    gotoUpdateTask() {
        this.props.navigation.navigate('updateTaskRoute')
    }


    render() {
        return (
            <Container>
                <Header style={styles.header} hasTabs>
                    <Left >
                        <Icon name="menu" style={styles.iconColor} onPress={this.openDrawer.bind(this)} />
                    </Left>
                    <Body>
                        <Title>Task List</Title>
                    </Body>
                    <Right />
                </Header>




                <Tabs >
                    <Tab heading={<TabHeading style={{ backgroundColor: '#039be5' }}><Text>To You</Text></TabHeading>}>

                        <LinearGradient colors={['#b2dfdb', '#80cbc4', '#4db6ac']} style={{ flex: 1 }}>


                            <Content padder>

                                <Card style={styles.mainCard}>
                                    <Text style={styles.message}>Alert! you have a dedline today</Text>
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

                                            <Text note>Deadline 25-April-2019  </Text>
                                            <Text note>Last updated on 11-April-2019</Text>
                                        </View>

                                    </View>



                                    <Button rounded light small style={styles.updateButton} onPress={this.gotoUpdateTask.bind(this)}>
                                        <Text uppercase={false}>Update Now</Text>
                                    </Button>

                                </Card>
                                <Card style={styles.mainCard}>
                                    <Text style={styles.message}>Alert! you have a dedline today</Text>
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

                                            <Text note>Deadline 25-April-2019  </Text>
                                            <Text note>Last updated on 11-April-2019</Text>
                                        </View>

                                    </View>



                                    <Button rounded light small style={styles.updateButton}>
                                        <Text uppercase={false}>Update Now</Text>
                                    </Button>

                                </Card>
                                <Card style={styles.mainCard}>
                                    <Text style={styles.message}>Alert! you have a dedline today</Text>
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

                                            <Text note>Deadline 25-April-2019  </Text>
                                            <Text note>Last updated on 11-April-2019</Text>
                                        </View>

                                    </View>



                                    <Button rounded light small style={styles.updateButton}>
                                        <Text uppercase={false}>Update Now</Text>
                                    </Button>

                                </Card>

                            </Content>







                        </LinearGradient>

                    </Tab>



















                    <Tab heading={<TabHeading style={{ backgroundColor: '#039be5' }}><Text>By You</Text></TabHeading>}>



                        <LinearGradient colors={['#b2dfdb', '#80cbc4', '#4db6ac']} style={{ flex: 1 }}>

                            <Content padder>

                                <Card style={styles.mainCard}>
                                    <Text style={styles.message}>Alert! you have a dedline today</Text>
                                    <Text note style={styles.date}>Assign by sabih on 23-Apr</Text>
                                    <Text style={styles.description}>
                                        complete main ui home page
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

                                            <Text note>Deadline 25-April-2019  </Text>
                                            <Text note>Last updated on 11-April-2019</Text>
                                        </View>

                                    </View>



                                    <Button rounded light small style={styles.updateButton} onPress={() => { this.props.navigation.navigate('editTaskRoute') }}>
                                        <Text uppercase={false} >Edit Now</Text>
                                    </Button>

                                </Card>

                            </Content>

                        </LinearGradient>






                    </Tab>

                </Tabs>









            </Container>
        )
    }
}
export default TaskList

