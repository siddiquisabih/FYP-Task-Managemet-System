import AllPatientList from "../components/AllPatientList"
import { DrawerNavigator , StackNavigator } from "react-navigation"
import DataEntry from "../components/CreatePatient"
import SearchByName from "../components/SearchByName"
import SearchByDate from "../components/SearchByDate"
import Signup from "../components/Auth/Signup"
import Login from "../components/Auth/Login"
import Splash from "../components/splash"
import Logout from "../components/Auth/logout"
import Welcome from "../components/welcome";


const Drawer = StackNavigator({


    // allPatienRoute: {
    //     screen: AllPatientList,
        
            
     
        
    // },

    allPatienRoute: {
        screen: Welcome,
        
            
     
        
    },


    // patientCreateRoute: {
    //     screen: DataEntry,
    // },

    // SearchByNameRoute: {
    //     screen: SearchByName
    // },

    // SearchByDateRoute: {
    //     screen: SearchByDate
    // },

    // lougoutRoute: { screen: Logout },

},

    {
        contentOptions: { activeTintColor: "green" },
    }

)




export default Drawer