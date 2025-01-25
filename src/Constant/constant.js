 

const devUrl = "http://localhost:3008/";
const  DeployURl = "https://haqatoon-backend.vercel.app/";

export const BaseURl = devUrl;



export const AppRoutes ={
    login : BaseURl + "auth/login",
    register : BaseURl + "auth/register",
   
    myinfo : BaseURl + "user/myinfo",
    donarForm : BaseURl + "donarsinfo",
     
     
}