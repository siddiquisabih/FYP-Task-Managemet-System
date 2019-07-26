



class Constant {



    static BASE_URL = 'http://192.168.0.105:3050/' //laptop    
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


    static CREATE_CHAT = 'api/create/chat'

    static GET_CHAT_TO_YOU = 'api/chat/toYou/getByEmpId/'

    static GET_CHAT_BTY_YOU = 'api/chat/byYou/getByEmpId/'

    static GET_CHAT_MESSAGES = 'api/chat/getChatByTranId/'

    static SEND_MESSAGE = 'api/chat/sendMessage/'

    static CREATE_EMPLOYEE = 'api/create/employee'

    static CHANGE_PASSWORD = 'api/change/password/'

    static GET_MEMBER_LIST = 'api/team/getMemberList/'

    static GET_ALL_EMPLOYEE_FOR_TEAM = 'api/team/getAllForTeam/'

    static DELETE_MEMBER = 'api/team/deleteMember/'

    static ADD_TEAM_MEMBER = 'api/team/addMember/'

    static CREATE_EXPENSE = 'api/expense/create'

    static GET_ALL_EXPENSE = 'api/expense/getAll'

    static EXPENSE_APPROVAL = 'api/expense/updateExpense'

    static GET_EXPENSE_BY_ID = 'api/expense/getByEmpId/'

}

export default Constant





