



class Constant {



    static BASE_URL = 'http://192.168.0.104:3050/' //laptop    
    // static BASE_URL = 'https://patient-server.herokuapp.com/' //live
    // static BASE_URL = 'http://10.30.1.115:3050/' // office
    // static BASE_URL = 'http://10.65.1.199:3050/' // university

    // static AUTH_LOCAL_KEY = 'auth'
    static USER_DETAIL_KEY = "profileDetails"



    // Auth Apis

    static SIGNUP = 'api/signup'
    static LOGIN = 'api/login'




    // employee

    static GET_ALL_EMPLOYEE = 'api/employee/getAllEmployees/'

    // task

    static GET_ALL_TASK_BY_ID = 'api/task/getAllTaskByEmpID/'

    static GET_ALL_TASK_BY_YOU = 'api/task/getAllByYouTask/'

    static UPLOAD_FILE = 'api/image/upload'

    static IMAGE_URL_PATH = 'api/image/'


    static CREATE_TASK = 'api/task/create'

    static UPDATE_TASK = 'api/task/update'


}

export default Constant





