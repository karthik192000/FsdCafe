import { OrderItem } from "./OrderItem";

export class Order{


    orderItemList:OrderItem[];

    totalOrderPrice:number;

    orderStatus:string;

    constructor(orderItemList:OrderItem[],totalOrderPrice:number,orderStatus:string){
        this.orderItemList  = orderItemList;
        this.totalOrderPrice = totalOrderPrice;
        this.orderStatus = orderStatus;
    }
}