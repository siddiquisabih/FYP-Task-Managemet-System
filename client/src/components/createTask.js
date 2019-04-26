import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Textarea, Button, Input, Content, Body, Container, Header, Title, Card, CardItem, Right, Text, Left, Icon, Item, Thumbnail } from 'native-base';
import DatePicker from 'react-native-datepicker'

class CreateTask extends Component {


    static navigationOptions = {
        title: "Create Task",

        drawerIcon: () => {
            return (
                <Icon name="ios-cog" />
            )
        }

    }
    render() {
        return (
            <Container>
                <Header style={styles.header}>
                    <Left />
                    <Body>
                        <Title>Create</Title>
                    </Body>
                    <Right />
                </Header>



                <Content>
                    <Text style={styles.label}>What will be task title?</Text>
                    <Item rounded style={styles.textbox}>
                        <Input placeholder='Task title' />
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
                            }
                        }}
                    // onDateChange={(date) => { this.setState({ date: date }) }}
                    />



                    <Text style={styles.label}>What will task description? </Text>
                    <Textarea style={styles.textarea} rowSpan={5} bordered placeholder="write description" />


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




                    <View >

                        <Card style={{ width: '50%' ,  }}>
                            <CardItem>
                                <Left>
                                    {/* <Thumbnail source={{ uri: '../images/doc.jpg' }} /> */}
                                    <Thumbnail source={require('../images/doc.jpg')} />
                                </Left>
                                <Text>NativeBase</Text>

                            </CardItem>
                        </Card>
                    </View>







                </Content>








            </Container>
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
        color: 'black',
        padding: 10,
        // textAlign: 'center'

    },
    textbox: {
        width: '90%',
        marginLeft: "5%"
    },
    datePicker: {
        width: '90%',
        marginLeft: "5%"
    },
    textarea: {
        width: '90%',
        marginLeft: "5%",
        borderRadius: 20
    }
})
export default CreateTask