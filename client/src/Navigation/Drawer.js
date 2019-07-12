import { createDrawerNavigator, createAppContainer, DrawerItem } from "react-navigation"
import Logout from "../components/Auth/logout"
import Overview from "../components/overview";
import CreateTask from "../components/createTask";



const AppNavigator = createDrawerNavigator({

    welcomeRoute: {
        screen: Overview,
    },
    createTaskRoute: {
        screen: CreateTask
    },
    lougoutRoute: {
        screen: Logout
    },
})

const Drawer = createAppContainer(AppNavigator);

export default Drawer