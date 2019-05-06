import { createDrawerNavigator, createAppContainer } from "react-navigation"
import Signup from "../components/Auth/Signup"
import Login from "../components/Auth/Login"
import Splash from "../components/splash"
import Logout from "../components/Auth/logout"
import Overview from "../components/overview";
import CreateTask from "../components/task/createTask";
import TaskList from "../components/task/taskList";
import UserProfile from "../components/profile/userProfile";


const AppNavigator = createDrawerNavigator({



    userProfileRoute: {
        screen: UserProfile
    },
    welcomeRoute: {
        screen: Overview,
    },
    createTaskRoute: {
        screen: CreateTask
    },
    taskListRoute: {
        screen: TaskList
    },
    lougoutRoute: {
        screen: Logout
    },

    // userProfileRoute: {
    //     screen: UserProfile
    // },
},
    {
        contentOptions: {
            activeTintColor: "blue",
            
        },
    }

)

const Drawer = createAppContainer(AppNavigator);


export default Drawer