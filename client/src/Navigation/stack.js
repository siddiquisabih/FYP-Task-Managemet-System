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
import RouteKey from "../Constants/routesConstants";


import CreateTask from "../components/task/createTask";
import TeamTask from "../components/task/teamTask";
import Logout from "../components/Auth/logout"
import Overview from "../components/overview";
import TaskList from "../components/task/taskList";
import UserProfile from "../components/profile/userProfile";
import CreateComm from '../components/communication/createComm'
import CommList from '../components/communication/commList'
import ChatRoom from '../components/communication/chatRoom'
import TaskDetail from "../components/task/taskDetail";
// import { Icon } from 'native-base';
import AddEmployee from "../components/addEmployee/newEmployee"
import ChangePass from "../components/profile/changePass"
import ManageTeam from "../components/Team/manageTeam"
import ViewTeam from "../components/Team/viewTeam";
import AddTeam from "../components/Team/addTeam";
import MyTeam from "../components/Team/myTeam";
import UpdateExpense from "../components/expense/updateExpense";
import CreateExpense from "../components/expense/createExpense";
import ExpenseList from "../components/expense/expenseList";



const RouteFlux = (props) => {
    // const MenuIcon = () => <Icon name="ios-cog" />

    return (



        <Router >


            <Scene key="root" hideNavBar >

                <Scene key={RouteKey.SPLASH} type="reset" component={Splash} hideNavBar initial />
                <Scene key={RouteKey.LOGIN} component={Login} hideNavBar />
                <Scene key={RouteKey.UPDATE_TASK} component={UpdateTask} hideNavBar />
                <Scene key={RouteKey.EDIT_TASK} component={EditTask} hideNavBar />
                <Scene key={RouteKey.TASK_DETAIL} component={TaskDetail} hideNavBar />
                <Scene key={RouteKey.CHAT_ROOM} component={ChatRoom} hideNavBar />
                <Scene key={RouteKey.CHANGE_PASS} component={ChangePass} hideNavBar />
                <Scene key={RouteKey.VIEW_TEAM} component={ViewTeam} hideNavBar />
                <Scene key={RouteKey.ADD_TEAM} component={AddTeam} hideNavBar />
                <Scene key={RouteKey.TEAM_TASK} component={TeamTask} hideNavBar />

                <Drawer key={RouteKey.DRAWER} type="reset" contentComponent={DrawerContent} hideNavBar drawer>
                    <Scene>
                        <Scene key={RouteKey.OVERVIEW} component={Overview} hideNavBar />
                        <Scene key={RouteKey.CREATE_TASK} component={CreateTask} hideNavBar />
                        <Scene key={RouteKey.TASK_LIST} component={TaskList} hideNavBar />
                        <Scene key={RouteKey.USER_PROFILE} component={UserProfile} hideNavBar />
                        <Scene key={RouteKey.CREATE_COMM} component={CreateComm} hideNavBar />
                        <Scene key={RouteKey.COMM_LIST} component={CommList} hideNavBar />
                        <Scene key={RouteKey.ADD_EMPLOYEE} component={AddEmployee} hideNavBar />
                        <Scene key={RouteKey.MANAGE_TEAM} component={ManageTeam} hideNavBar />
                        <Scene key={RouteKey.MY_TEAM} component={MyTeam} hideNavBar />
                        <Scene key={RouteKey.EXPENSE_UPDATE} component={UpdateExpense} hideNavBar />
                        <Scene key={RouteKey.CREATE_EXPENSE} component={CreateExpense} hideNavBar />
                        <Scene key={RouteKey.EXPENSE_LIST} component={ExpenseList} hideNavBar initial />
                        <Scene key={RouteKey.LOGOUT} component={Logout} hideNavBar />
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
