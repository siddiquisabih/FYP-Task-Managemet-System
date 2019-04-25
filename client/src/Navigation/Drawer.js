import {createDrawerNavigator , createAppContainer } from "react-navigation"
import Signup from "../components/Auth/Signup"
import Login from "../components/Auth/Login"
import Splash from "../components/splash"
import Logout from "../components/Auth/logout"
import Welcome from "../components/overview";


const AppNavigator = createDrawerNavigator({


        welcomeRoute: {
            screen: Welcome,
        },
        lougoutRoute: {
            screen: Logout
        },
    },

    {
        contentOptions: {
            activeTintColor: "green"
        },
    }

)

const Drawer  = createAppContainer(AppNavigator);


export default Drawer