import React, { Component } from 'react'
import { View } from 'react-native'
import { Textarea, Button, Input, Content, Body, Container, Header, Title, Card, CardItem, Right, Text, Left, Icon, Item, Thumbnail } from 'native-base';
import DatePicker from 'react-native-datepicker'
import LinearGradient from 'react-native-linear-gradient';
import styles from './commStyles'


class CreateComm extends Component {

    static navigationOptions = {
        title: "Create Chat",

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
                        <Title>Create Chat</Title>
                    </Body>
                    <Right />
                </Header>
                <LinearGradient colors={['#b39ddb', '#b39ddb', '#7e57c2']} style={{ flex: 1 }}>
                    <Content>
                        <Text style={styles.label}>What will be Communication title?</Text>
                        <Item rounded style={styles.textbox}>
                            <Input placeholder='Communication title' style={styles.inputText} placeholderTextColor='white' />
                        </Item>

                        <Text style={styles.label}>What will Communicatoin description? </Text>
                        <Textarea style={styles.textarea} rowSpan={5} bordered placeholder="write description" placeholderTextColor='white' />
                        <Text style={styles.label}>Whom do you want to chat with? </Text>

                        <Item rounded style={styles.textbox}>
                            <Icon name="ios-search" color='white' />
                            <Input placeholder="Search" style={styles.inputText} placeholderTextColor='white' />
                        </Item>

                        <View >

                            <Card style={{ width: '90%', marginLeft: '5%' }}>
                                <CardItem>
                                    <Left>
                                        {/* <Thumbnail source={{ uri: '../images/doc.jpg' }} /> */}
                                        <Thumbnail source={require('../../images/doc.jpg')} />
                                        <Text>Sabih Siddiqui</Text>
                                    </Left>

                                    <Right>

                                        <Icon name="checkmark" />
                                    </Right>

                                </CardItem>
                            </Card>


                        </View>


                        <Item style={styles.buttonStyle}>

                            <Button success rounded onPress={()=>{this.props.navigation.navigate("task")}}>
                                <Text>Create</Text>
                            </Button>
                        </Item>



                    </Content>






                </LinearGradient>

            </Container >
        );
    }
}


export default CreateComm;
