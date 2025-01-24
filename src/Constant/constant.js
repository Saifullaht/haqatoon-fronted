 

const devUrl = "http://localhost:3007/";
const  DeployURl = "https://haqatoon-backend.vercel.app/";

export const BaseURl = DeployURl;



export const AppRoutes ={
    login : BaseURl + "auth/login",
    register : BaseURl + "auth/register",
    Googlelogin : BaseURl + "auth/googlelogin",
    myinfo : BaseURl + "user/myinfo",
    donarForm : BaseURl + "donarsinfo",
     
     
}