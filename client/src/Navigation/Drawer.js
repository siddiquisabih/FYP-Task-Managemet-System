import { createDrawerNavigator, createAppContainer } from "react-navigation"
import Signup from "../components/Auth/Signup"
import Login from "../components/Auth/Login"
import Splash from "../components/splash"
import Logout from "../components/Auth/logout"
import Overview from "../components/overview";
import CreateTask from "../components/createTask";


const AppNavigator = createDrawerNavigator({


    createTaskRoute: {
        screen: CreateTask
    },

    welcomeRoute: {
        screen: Overview,
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

const Drawer = createAppContainer(AppNavigator);


export default Drawer