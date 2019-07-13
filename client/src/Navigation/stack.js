import {
    createStackNavigator,
    createAppContainer
} from "react-navigation"
// import Signup from "../components/Auth/Signup"
import Login from "../components/Auth/Login"
import Splash from "../components/splash"
import React from 'react'
import DrawerContent from "./DrawerContent"
import UpdateTask from "../components/task/updateTask";
import EditTask from "../components/task/editTask";

import { Router, Scene, Stack, Drawer, Tabs, Actions } from "react-native-router-flux";
// import CreateTask from "../components/task/createTask";
import ConstantKey from "../Constants/routesConstants";


import CreateTask from "../components/task/createTask";
import Logout from "../components/Auth/logout"
import Overview from "../components/overview";
import TaskList from "../components/task/taskList";
import UserProfile from "../components/profile/userProfile";
import CreateComm from '../components/communication/createComm'
import CommList from '../components/communication/commList'
import ChatRoom from '../components/communication/chatRoom'
// import { Icon } from 'native-base';


const RouteFlux = (props) => {
    // const MenuIcon = () => <Icon name="ios-cog" />

    return (



        <Router >


            <Scene key="root" hideNavBar >

                <Scene key={ConstantKey.SPLASH} type="reset" component={Splash} initial hideNavBar />
                <Scene key={ConstantKey.LOGIN} component={Login} hideNavBar />
                <Scene key={ConstantKey.UPDATE_TASK} component={UpdateTask} hideNavBar />
                <Scene key={ConstantKey.EDIT_TASK} component={EditTask} hideNavBar />


                <Drawer key={ConstantKey.DRAWER} type="reset" contentComponent={DrawerContent} hideNavBar drawer>
                    {/* <Scene key={ConstantKey.OVERVIEW} component={Overview} initial hideNavBar /> */}
                    <Scene>

                        <Scene key={ConstantKey.OVERVIEW} component={Overview} initial hideNavBar />
                        <Scene key={ConstantKey.TASK_LIST} component={TaskList} hideNavBar />
                        <Scene key={ConstantKey.USER_PROFILE} component={UserProfile} hideNavBar />
                        <Scene key={ConstantKey.CREATE_COMM} component={CreateComm} hideNavBar />
                        <Scene key={ConstantKey.COMM_LIST} component={CommList} hideNavBar />
                        <Scene key={ConstantKey.CHAT_ROOM} component={ChatRoom} hideNavBar />
                        <Scene key={ConstantKey.CREATE_TASK} component={CreateTask} hideNavBar />
                        <Scene key={ConstantKey.LOGOUT} component={Logout} hideNavBar />
                    </Scene>

                </Drawer>





                {/* <Scene key="createTassk"  component={CreateTask} hideNavBar /> */}
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
