import Actions from "../Actions/AuthActions"
import axios from "axios"
import { AsyncStorage } from "react-native"
import Constant from "../../Constants/constants";
  



var uid = ''
class Midware {

    static Signup(data) {
        return (dispatch) => {
            axios.post(`${Constant.BASE_URL}${Constant.SIGNUP}`, data)
                .then((responce) => {
                    if (responce.data.error) {
                        dispatch(Actions.signupUserError(responce.data.error))
                    }
                    else {
                        uid = responce.data._id
                        AsyncStorage.setItem(Constant.AUTH_LOCAL_KEY, uid)
                            .then(() => {
                                dispatch(Actions.signupUser(uid))
                            })
                    }
                })
        }
    }

    static Login(data) {
        return (dispatch) => {
            axios.post(`${Constant.BASE_URL}${Constant.LOGIN}`, data)
                .then((responce) => {
                    if (responce.data.error) {
                        dispatch(Actions.LoginUserError(responce.data.error))
                    }
                    else {
                        uid = responce.data._id
                        AsyncStorage.setItem(Constant.AUTH_LOCAL_KEY, uid)
                            .then(() => {
                                dispatch(Actions.LoginUser(uid))
                            })
                    }
                })
        }
    }

    static checkingForAuthentication() {
        return (dispatch) => {
            AsyncStorage.getItem(Constant.AUTH_LOCAL_KEY)
                .then((responce) => {
                    if (responce) {
                        uid = responce
                        dispatch(Actions.userAuthentic(responce))
                    }
                    else {
                        dispatch(Actions.userAuthenticError())
                    }
                })
        }
    }

    static Logout() {
        return (dispatch) => {
            AsyncStorage.removeItem(Constant.AUTH_LOCAL_KEY).then(() => {
                dispatch(Actions.Logout())
            })
        }
    }
}

export default Midware