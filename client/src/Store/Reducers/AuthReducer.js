import Actions from "../Actions/AuthActions"

const initialState = {
    signup: false,
    signupError: false,
    userObjectId: '',
    signupErrorMessage: '',
    login: false,
    loginError: false,
    loginErrorMessage: '',
    logoutUser: false,
}


function Reducer(state = initialState, action) {
    switch (action.type) {

        case Actions.signup:
            return Object.assign({}, state, { signup: true, signupError: false, signupErrorMessage: '', userObjectId: action.data })

        case Actions.signupError:
            return Object.assign({}, state, { signup: false, signupError: true, signupErrorMessage: action.errorMessage })

        case Actions.login:
            return Object.assign({}, state, { login: true, loginError: false, loginErrorMessage: '', userObjectId: action.data })

        case Actions.loginError:
            return Object.assign({}, state, { login: false, loginError: true, loginErrorMessage: action.errorMessage })

        case Actions.authentic:
            return Object.assign({}, state, { userObjectId: action.data, userAuthentic: true, userAuthError: false })

        case Actions.authenticError:
            return Object.assign({}, state, { userAuthError: true, userAuthentic: false, userObjectId: '' })

        case Actions.logout:
            return Object.assign({}, state, {
                signup: false, signupError: false, userObjectId: '', signupErrorMessage: '',
                login: false, loginError: false, loginErrorMessage: '', logoutUser: true })

        default:
            return state

    }
}

export default Reducer