export const actionTypes = {
    GET_USER : "GET_USER",
    GET_USER_SUCCESS : "GET_USER_SUCCESS",
    LOG_OUT : "LOGOUT",

}

export function getUser(value){
    return{
        type:actionTypes.GET_USER,
        payload:{
            value,
        }
    };
}
export function getUserSuccess(data){
    return{
        type:actionTypes.GET_USER_SUCCESS,
        payload:{
            data
        }
    };
}

export function logOut(){
    return{
        type:actionTypes.LOG_OUT,
    };
}