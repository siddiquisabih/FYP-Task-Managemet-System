import { createDrawerNavigator, createAppContainer } from "react-navigation"
import Signup from "../components/Auth/Signup"
import Login from "../components/Auth/Login"
import Splash from "../components/splash"
import Logout from "../components/Auth/logout"
import Overview from "../components/overview";
import CreateTask from "../components/task/createTask";
import TaskList from "../components/task/taskList";
import UserProfile from "../components/profile/userProfile";
import CreateComm from '../components/communication/createComm'
import CommList from '../components/communication/commList'
import ChatRoom from '../components/communication/chatRoom'


const AppNavigator = createDrawerNavigator({


    createTaskRoute: {
        screen: CreateTask
    },
    ChatRoomRoute: {
        screen: ChatRoom
    },
    CommListRoute: {
        screen: CommList
    },

    CreateCommRoute: {
        screen: CreateComm
    },

    welcomeRoute: {
        screen: Overview,
    },

    taskListRoute: {
        screen: TaskList
    },
    lougoutRoute: {
        screen: Logout
    },
    userProfileRoute: {
        screen: UserProfile
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