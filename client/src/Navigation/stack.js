import {
    createStackNavigator,
    createAppContainer
} from "react-navigation"
import Signup from "../components/Auth/Signup"
import Login from "../components/Auth/Login"
import Splash from "../components/splash"
import Drawer from "./Drawer"
import UpdateTask from "../components/task/updateTask";
import EditTask from "../components/task/editTask";


const AppNavigator = createStackNavigator({


    SplashRoute: {
        screen: Splash
    },

    LoginRoute: {
        screen: Login
    },
    DrawerRoute: {
        screen: Drawer,
        navigationOptions: props => ({
            header: false,
        })
    },

    updateTaskRoute: {
        screen: UpdateTask
    },
    editTaskRoute: {
        screen: EditTask
    },
    SignupRoute: {
        screen: Signup
    },
}, {
        headerMode: 'none',
        // initialRouteName: 'SplashRoute'
        initialRouteName: 'DrawerRoute'
    })
const Stack = createAppContainer(AppNavigator);

export default Stack