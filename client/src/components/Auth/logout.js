import React, { Component } from 'react'
import { Container, Icon } from 'native-base';
import { AsyncStorage } from "react-native"
import Constant from '../../Constants/constants';
 
 

class Logout extends Component {


    static navigationOptions = {
        title: "Logout",

        drawerIcon: () => {
            return (
                <Icon name="ios-cog" />
            )
        }

    }

    componentWillMount = () => {
        AsyncStorage.removeItem(Constant.USER_DETAIL_KEY)
            .then((res) => {
                this.props.navigation.navigate("LoginRoute")
            })
        console.disableYellowBox = true
    }

    render() {
        return (
            <Container>
            </Container>
        )
    }
}

export default Logout 