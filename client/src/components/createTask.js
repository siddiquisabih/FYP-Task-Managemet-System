import React, { Component } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Textarea, Button, Input, Content, Body, Container, Header, Title, Card, CardItem, Right, Text, Left, Icon, Item, Thumbnail } from 'native-base';
import DatePicker from 'react-native-datepicker'
import LinearGradient from 'react-native-linear-gradient';

class CreateTask extends Component {


    static navigationOptions = {
        title: "Create Task",

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
                        <Title>Create Task</Title>
                    </Body>
                    <Right />
                </Header>



                <LinearGradient colors={['#b39ddb', '#b39ddb', '#7e57c2']} style={{ flex: 1 }}>

                    <Content>
                        <Text style={styles.label}>What will be task title?</Text>
                        <Item rounded style={styles.textbox}>
                            <Input placeholder='Task title' style={styles.inputText} placeholderTextColor='white' />
                        </Item>

                        <Text style={styles.label}>Task starts from</Text>




                        <DatePicker
                            style={styles.datePicker}
                            date="2016-05-15"
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate="2016-05-01"
                            maxDate="2016-06-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            showIcon={false}
                            customStyles={{
                                dateInput: {
                                    borderRadius: 20,
                                    borderColor: 'white',
                                },
                                dateText: {
                                    color: 'white'
                                }
                            }}
                        // onDateChange={(date) => { this.setState({ date: date }) }}
                        />
                        <Text style={styles.label}>Task valid till</Text>




                        <DatePicker
                            style={styles.datePicker}
                            date="2016-05-15"
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate="2016-05-01"
                            maxDate="2016-06-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            showIcon={false}
                            customStyles={{
                                dateInput: {
                                    borderRadius: 20,
                                    borderColor: 'white',

                                },
                                dateText: {
                                    color: 'white'
                                }
                            }}
                        // onDateChange={(date) => { this.setState({ date: date }) }}
                        />



                        <Text style={styles.label}>What will task description? </Text>
                        <Textarea style={styles.textarea} rowSpan={5} bordered placeholder="write description" placeholderTextColor='white' />


                        <Text style={styles.label}>What will task priority? </Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

                            <Button iconLeft rounded small danger>
                                <Icon name='checkmark' />
                                <Text>High</Text>

                            </Button>
                            <Button iconLeft rounded small >
                                <Icon name='checkmark' />
                                <Text>Medium</Text>

                            </Button>
                            <Button iconLeft rounded small success>
                                <Icon name='checkmark' />
                                <Text>Low</Text>

                            </Button>
                        </View>



                        <Text style={styles.label}>Whom do you want to assign? </Text>


                        <Item rounded style={styles.textbox}>
                            <Icon name="ios-search" color='white' />
                            <Input placeholder="Search" style={styles.inputText} placeholderTextColor='white' />
                        </Item>

                        <View >

                            <Card style={{ width: '90%', marginLeft: '5%' }}>
                                <CardItem>
                                    <Left>
                                        {/* <Thumbnail source={{ uri: '../images/doc.jpg' }} /> */}
                                        <Thumbnail source={require('../images/doc.jpg')} />
                                        <Text>Sabih Siddiqui</Text>
                                    </Left>

                                    <Right>

                                        <Icon name="checkmark" />
                                    </Right>

                                </CardItem>
                            </Card>


                        </View>


                        <Item style={styles.buttonStyle}>

                            <Button success rounded >
                                <Text>Create</Text>
                            </Button>
                        </Item>



                    </Content>






                </LinearGradient>

            </Container >
        )
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#039be5"
    },
    label: {
        fontFamily: 'Cochin',
        fontWeight: 'bold',
        color: 'white',
        padding: 10,
        // textAlign: 'center'

    },
    textbox: {
        width: '90%',
        marginLeft: "5%",
        color: 'white'

    },
    datePicker: {
        width: '90%',
        marginLeft: "5%",

    },
    textarea: {
        width: '90%',
        marginLeft: "5%",
        borderRadius: 20,
        borderColor: 'white',
    },
    buttonStyle: {
        justifyContent: 'center',
        borderBottomWidth: 0,
        marginBottom: 10,
        marginTop: 10,

    },
    inputText: {
        color: 'white'
    },
    iconColor: {
        color: 'white'
    }
})
export default CreateTask