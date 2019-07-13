import React, { Component } from 'react';
import { View, Image, Slider, ScrollView } from 'react-native';
import { Textarea, Button, Input, Content, Body, Container, Header, Title, Card, CardItem, Right, Text, Left, Icon, Item, Thumbnail, Tab, Tabs, TabHeading } from 'native-base';
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import { Actions } from 'react-native-router-flux';



class UpdateTask extends Component {


    constructor(props) {
        super()
        this.state = {
            percentage: 0,
            taskDetail: {},
            attachments: []
        }
    }

    goBack() {
        // this.props.navigation.pop()
        Actions.pop()
    }


    componentDidMount() {
        console.log(this.props.data)

        this.setState({ taskDetail: this.props.data, percentage: this.props.data.progress, attachments: this.props.data.taskAttachment })
    }




    show() {
        var options = {
            title: 'Select Attachment',

            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        }


        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                console.log(response.uri)
                console.log(response.height)
                console.log(response.width)

            }
        });


    }





    showAttachments() {

        return (
            <ScrollView horizontal={true} contentContainerStyle={styles.contentContainer}>


                <View style={[styles.imageCard, { marginLeft: 10 }]} onPress={this.show.bind(this)}>
                    <Text style={[styles.number, { fontSize: 20, fontWeight: 'bold' }]}>+</Text>
                </View>
                {

                    this.state.attachments.map((m, v) => {
                        return (
                            <View key={v} style={[styles.imageCard]} >
                                <Image style={[styles.imageAttach]} source={require('../../images/doc1.jpg')} />
                            </View>
                        )
                    })
                }

            </ScrollView>





        )


    }




    render() {




        return (
            <Container>
                <Header style={styles.header} hasTabs>
                    <Left >
                        <Icon name="arrow-round-back" style={styles.iconColor} onPress={this.goBack.bind(this)} />
                    </Left>
                    <Body>
                        <Title>Update Task</Title>
                    </Body>
                    <Right />
                </Header>


                <LinearGradient colors={['#b39ddb', '#b39ddb', '#7e57c2']} style={{ flex: 1 }}>

                    <Content>

                        <Text style={styles.label}>Description about progress </Text>
                        <Textarea style={styles.textarea} rowSpan={5} bordered placeholder="write description" placeholderTextColor='white' />

                        <Text style={styles.label}>What is your task progress? </Text>
                        <Text style={styles.label}>{this.state.percentage}% updated </Text>

                        <Slider
                            maximumValue={100}
                            step={5}
                            onValueChange={(value) => { this.setState({ percentage: value }) }}
                            value={this.state.percentage}
                        />




                        <Text style={styles.label}>Attachment (optional) </Text>

                        {/* <ScrollView horizontal={true} contentContainerStyle={styles.contentContainer}>


                            <View style={[styles.imageCard, { marginLeft: 10 }]} onPress={this.show.bind(this)}>
                                <Text style={[styles.number, { fontSize: 20, fontWeight: 'bold' }]}>+</Text>
                            </View>


                            <View style={[styles.imageCard]} >
                                <Image style={[styles.imageAttach]} source={require('../../images/doc1.jpg')} />
                            </View> */}

                        {this.showAttachments()}


                        {/* </ScrollView> */}



                        <Item style={styles.buttonStyle}>

                            <Button info rounded >
                                <Text>update</Text>
                            </Button>
                        </Item>

                    </Content>
                </LinearGradient>
            </Container >
        );
    }
}
export default UpdateTask;
