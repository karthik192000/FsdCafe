export class SignUpResponse {

    userName:string;
    name: string;
    userRole:string;

    constructor(userName:string,name:string,userRole:string){
        this.userName = userName;
        this.name = name;
        this.userRole = userRole;
    }

}