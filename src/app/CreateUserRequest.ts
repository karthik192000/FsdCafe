export class CreateUserRequest {


    userName:string;
    name:string;
    password:string;
    userRole:string;

    constructor(userName:string,name:string,password:string,role:string){
        this.userName = userName;
        this.name = name;
        this.password = password;
        this.userRole = role;
    }
}