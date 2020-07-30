export class UrlConstants {
    
    static modal_name="NovoNordiskIN";
    
    static MAINURL = 'http://localhost:3000/';
    // static usersGetTableItems = 'ex/register/submit';
    static saveUser =  'portal/users/adduser';
    static updateUser = 'portal/users/updateportal';
    static getroles  = 'portal/users/getroles';
    static getuserlist = 'portal/users/getuserlist';
    static deleteportalUrl ='portal/users/deleteuser';
    static checkresetUrl ='portal/users/verifyreset';
    static updatepasswordUrl='portal/users/updatepassword';
    static defaultpasswordUrl='portal/users/cryptopass';
    static signin ='portal/users/signin';
    // static loginuserUrl ='portal/users/loginuserUrl';
    static saveState='org/addcat';
    static getstatelist='org/getcatlist';
    static updateState = 'org/updatecat';
    static deleteState='org/deletecat';
    static saveCity = 'states/addsubcat';
    static getcitylist = 'states/getsubcatlist';
    static updateCity ='states/updatesubcat';
    static deleteCity = 'states/deletesubcat';
    static getcats  = 'portal/users/getcat';
    static getcat = 'portal/users/get';
    static statuscheck = 'portal/users/status';
    static getsub = 'portal/users/getsub';
    static getvideos = 'portal/users/dashboardvideolist';
    static deletevideo = 'portal/users/deletevideo';
    static uploadVideo='upload';
    static getlikes = 'portal/users/analytics';
    static getMobileUsers ='portal/users/mobusr';
    static defaultsetting = 'portal/users/radio';
    static defaultsettings = 'portal/users/defaultsetting';
    static excelData = 'upload/exceltest';
    static excelCorrection = 'upload/excelstatecorrection'
    static sendMessage = 'https://cors-anywhere.herokuapp.com/https://api.msg91.com/api/v5/flow/';
    static getNumbers = 'upload/getexcel';
    static createMessage = 'message/createmessage';
    static getStateCount = 'message/getstatemsgcount';
    static getUserForwardRequest = 'message/userforwordrequest';
    static userForwardDetails = 'message/getmessagedetail';
    static userForwardButton = 'message/usermessagefwd';
    static userDeleteButton = 'message/usermessagedelete';
    static getAdminForwardRequest = 'message/adminfwdreq';
    static adminForwardDetails = 'message/adminmessagedetails'
    static adminSent = 'message/adminfwdmessage';
    static adminDelete = 'message/adminDeletemessage';

    static sentUserAtOrg = 'message/usersentmessageswaitorg';
    static sentUserAtAdmin = 'message/usersentmessageswaitadmin';
    static sentUserSuccess = 'message/usersentmessagessentsuccess';
    static sentUserdetail = 'message/getmessagedetailsent';
}