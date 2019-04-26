import {
    createStackNavigator,
    createAppContainer
} from "react-navigation"
import Signup from "../components/Auth/Signup"
import Login from "../components/Auth/Login"
import Splash from "../components/splash"
import Drawer from "./Drawer"


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
    SignupRoute: {
        screen: Signup
    },
}, { headerMode: 'none' })
const Stack = createAppContainer(AppNavigator);

export default Stack