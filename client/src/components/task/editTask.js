import React, { Component } from 'react'
import { View } from 'react-native'
import { Textarea, Button, Input, Content, Body, Container, Header, Title, Card, CardItem, Right, Text, Left, Icon, Item, Thumbnail } from 'native-base';
import DatePicker from 'react-native-datepicker'
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles'
class EditTask extends Component {



    goBack() {
        this.props.navigation.pop()
    }

    render() {
        return (
            <Container>
                <Header style={styles.header} hasTabs>
                    <Left >
                        <Icon name="arrow-round-back" style={styles.iconColor} onPress={this.goBack.bind(this)} />
                    </Left>
                    <Body>
                        <Title>Edit Task</Title>
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
export default EditTask