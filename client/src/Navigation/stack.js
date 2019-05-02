import {
    createStackNavigator,
    createAppContainer
} from "react-navigation"
import Signup from "../components/Auth/Signup"
import Login from "../components/Auth/Login"
import Splash from "../components/splash"
import Drawer from "./Drawer"
import UpdateTask from "../components/task/updateTask";


const AppNavigator = createStackNavigator({


    // SplashRoute: {
    //     screen: Splash
    // },

    // LoginRoute: {
    //     screen: Login
    // },
    DrawerRoute: {
        screen: Drawer,
        navigationOptions: props => ({
            header: false,
        })
    },

    updateTaskRoute: {
        screen: UpdateTask
    },
    SignupRoute: {
        screen: Signup
    },
}, { headerMode: 'none' })
const Stack = createAppContainer(AppNavigator);

export default Stack