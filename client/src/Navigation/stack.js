import {
    createStackNavigator,
    createAppContainer
} from "react-navigation"
// import Signup from "../components/Auth/Signup"
// import Login from "../components/Auth/Login"
import Splash from "../components/splash"
import React from 'react'
// import Drawer from "./Drawer"
// import UpdateTask from "../components/task/updateTask";
// import EditTask from "../components/task/editTask";

import { Router, Scene, Stack, Drawer, Tabs, Actions } from "react-native-router-flux";
const RouteFlux = (props) => {

    return (



        <Router >


            <Scene key="root" hideNavBar >

                <Scene key="splash" path="" component={Splash} initial hideNavBar />
            </Scene>
        </Router >

    )
}
export default RouteFlux














// const AppNavigator = createStackNavigator({


//     SplashRoute: {
//         screen: Splash
//     },

//     LoginRoute: {
//         screen: Login
//     },
//     DrawerRoute: {
//         screen: Drawer,
//         navigationOptions: props => ({
//             header: false,
//         })
//     },

//     updateTaskRoute: {
//         screen: UpdateTask
//     },
//     editTaskRoute: {
//         screen: EditTask
//     },
//     SignupRoute: {
//         screen: Signup
//     },
// }, {
//         headerMode: 'none',
//         // initialRouteName: 'SplashRoute'
//         initialRouteName: 'DrawerRoute'
//     })
// const Stack = createAppContainer(AppNavigator);
