import React, { Component } from 'react'
import { Container, Icon } from 'native-base';
import { AsyncStorage } from "react-native"
import Constant from '../../Constants/constants';
import { Actions } from 'react-native-router-flux';
import RouteKey from '../../Constants/routesConstants';



class Logout extends Component {


    // static navigationOptions = {
    //     title: "Logout",

    //     drawerIcon: () => {
    //         return (
    //             <Icon name="ios-cog" />
    //         )
    //     }

    // }

    componentWillMount() {
        AsyncStorage.removeItem(Constant.USER_DETAIL_KEY)
            .then((res) => {
                // this.props.navigation.navigate("LoginRoute")
                Actions[RouteKey.SPLASH]()
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