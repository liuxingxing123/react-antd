import actionTypes from "./actionsTypes";
import {loginRequest} from "../requests"

const startLogin = ()=>{
    return {
        type:actionTypes.START_MARK_AS_READ
    }
}

const loginSuccess = (userInfo)=>{
    return {
        type:actionTypes.LOGIN_SUCCESS,
        payload:{
            userInfo
        }
    }
}
export const change_avator=(avatorUrl)=>{
    return {
        type:actionTypes.CHANGE_AVATOR,
        payload:{
            avatorUrl
        }
    }
}
export const logout = ()=>{
    return dispatch=>{
        dispatch(loginFadiled())
    }
}
const loginFadiled = ()=>{
    window.sessionStorage.getItem("authToken") && window.sessionStorage.removeItem("autoToken");
    window.localStorage.getItem("authToken") &&  window.localStorage.removeItem("autoToken");
    window.sessionStorage.getItem("userInfo") &&  window.sessionStorage.removeItem("userInfo");
    window.localStorage.getItem("userInfo") &&  window.localStorage.removeItem("userInfo");
    return {
        type:actionTypes.LOGIN_FAILED
    }
}

export const login =(userInfo)=>{
    return dispatch=>{
        dispatch(startLogin())
        loginRequest(userInfo).then(resp=>{
           if(resp.data.code===200){
               const {authToken,...userInfo} = resp.data.data
               if(userInfo.remember){
                window.localStorage.setItem("authToken",authToken)
                window.localStorage.setItem("userInfo",JSON.stringify(userInfo))
               }else{
                window.sessionStorage.setItem("authToken",authToken)
                window.localStorage.setItem("userInfo",JSON.stringify(userInfo))
               }
               
               dispatch(loginSuccess(resp.data.data))
           }else{
               dispatch(loginFadiled())
           }
        })
    }
}