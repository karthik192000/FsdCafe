export class TokenResponse {

    userName:string;

    userRole:string;

    token:string;

    constructor(userName:string,userRole:string,token:string){
        this.userName = userName;
        this.userRole = userRole;
        this.token = token;
    }
}