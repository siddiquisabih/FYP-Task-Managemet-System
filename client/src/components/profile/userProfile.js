import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { Button, Content, Body, Container, Header, Title, Card, Right, Text, Left, Icon, Tab, Tabs, TabHeading } from 'native-base';
import styles from './profileStyles'
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


                <Content>






                    {/* <Image style={{ width: '20%', height: "20%" }} source={require("../../images/copy.jpg")} /> */}


                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>



                        <Card style={styles.pendingCard}>
                            <View style={styles.gradientBox}  >

                                {/* <Image  source={require("../../images/copy.jpg")} /> */}
                                <View style={{ justifyContent: 'center' }}>
                                    <Text>asd</Text>
                                </View>

                            </View>
                        </Card>



                    </View>













                </Content>



            </Container>
        )
    }
}

export default UserProfile