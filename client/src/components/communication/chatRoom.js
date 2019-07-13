import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { Textarea, Button, Input, Content, Body, Container, Header, Title, Card, CardItem, Right, Text, Left, Icon, Item, Thumbnail } from 'native-base';

import LinearGradient from 'react-native-linear-gradient';
import styles from './commStyles'



class ChatRoom extends Component {


    static navigationOptions = {
        title: "Chat Room",

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
                <Header style={styles.header}>
                    <Left >
                        <Icon name="menu" style={styles.iconColor} onPress={this.openDrawer.bind(this)} />
                    </Left>
                    <Body>
                        <Title>Chat Room</Title>
                    </Body>
                    <Right />
                </Header>
                <LinearGradient colors={['#b39ddb', '#b39ddb', '#7e57c2']} style={{ flex: 1 }}>





                    {/* <Card style={{ width: '90%', marginLeft: '5%' }}> */}


                    {/* <CardItem> */}
                    {/* </CardItem> */}
                    {/* </Card> */}




                    <Content>

                        <Card style={{ width: '90%', marginLeft: '5%', borderRadius: 10 }}>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                <Thumbnail style={styles.userImage} source={require('../../images/doc.jpg')} />
                                <Thumbnail style={styles.userImage} source={require('../../images/doc.jpg')} />
                                <Thumbnail style={styles.userImage} source={require('../../images/doc.jpg')} />
                                <Thumbnail style={styles.userImage} source={require('../../images/doc.jpg')} />
                            </View>
                        </Card>

                        <View style={styles.otherHead}>
                            <View>
                                <Thumbnail style={styles.OtherImage} source={require('../../images/doc.jpg')} />

                                <Text style={styles.timeText} >12:30 am</Text>
                            </View>
                            <Text style={styles.otherText} >asdasdasdasdasda asdasdasdasdasda asdasdasdasdasda sdasdasdas dasdasdasdasdasdasdasd asdasdasdasdasdasd</Text>
                        </View>




                        <View style={styles.userHead}>
                            <Text style={styles.userText} >asdasdasdasdasda asdasdasdasdasda asdasdasdasdasda sdasdasdas dasdasdasdasdasdasdasd asdasdasdasdasdas </Text>
                            <View>
                                <Thumbnail style={styles.userTextImage} source={require('../../images/doc.jpg')} />
                                <Text style={styles.timeText} >12:30 am</Text>
                            </View>

                        </View>











                    </Content>



                    <View style={{
                        width: '90%',
                        marginLeft: "5%",
                        borderRadius: 20,
                        borderColor: 'white',
                        color: 'white',
                        marginBottom: 10,
                        flexDirection: 'row'
                    }}>

                        <Textarea style={styles.messageTextarea} rowSpan={2} bordered placeholder="write Message" placeholderTextColor='white' />

                        <Icon name='send' style={{ color: 'white', alignSelf: 'center', paddingLeft: '5%' }} />

                    </View>








                </LinearGradient>

            </Container >
        );
    }
}

export default ChatRoom;
