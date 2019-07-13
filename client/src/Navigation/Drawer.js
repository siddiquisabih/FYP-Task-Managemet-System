import { createDrawerNavigator, createAppContainer, DrawerItem } from "react-navigation"
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
    createTaskRoute: {
        screen: CreateTask
    },
    taskListRoute: {
        screen: TaskList
    },
    lougoutRoute: {
        screen: Logout
    },
)
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