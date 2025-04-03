export const apiEndPoints = {
    AUTH:{
        LOGIN:"/auth/login",
        LOGOUT:"/auth/logout",
        VALIDATE_ME:"/auth/me",
        MY_PROFILE:"/auth/account"
    },
    USER:{
        GET:"/user",
        CREATE:"/user",
        PATCH:"/user/",
    },
    TRANSACTION:{
        ADD:"/transaction",
        UPDATE:"/transaction/"
    }

}