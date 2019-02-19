class Actions {


    static signup = "signup"
    static signupError = "signupError"
    static login = "login"
    static loginError = "loginError"
    static logout = "logout"
    static authentic = "authentic"
    static authenticError = "authenticError"




    static signupUser(value) {
        return {
            type: Actions.signup,
            data: value
        }
    }


    static signupUserError(message) {
        return {
            type: Actions.signupError,
            errorMessage: message
        }
    }


    static LoginUser(value) {
        return {

            type: Actions.login,
            data: value

        }
    }

    static LoginUserError(message) {
        return {
            type: Actions.loginError,
            errorMessage: message
        }
    }

    static Logout() {
        return {
            type: Actions.logout,
        }
    }


    static userAuthentic(value) {
        return {
            type: Actions.authentic,
            data: value
        }
    }


    static userAuthenticError() {
        return {
            type: Actions.authenticError
        }
    }



}
export default Actions