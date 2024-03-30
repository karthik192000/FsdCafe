import { OrderItem } from "./OrderItem";

export class Order{

    orderId:string;

    customerId:string;

    orderItemList:OrderItem[];

    totalOrderPrice:number;

    orderStatus:string;

    constructor(orderId:string,customerId:string,orderItemList:OrderItem[],totalOrderPrice:number,orderStatus:string){
        this.orderItemList  = orderItemList;
        this.totalOrderPrice = totalOrderPrice;
        this.orderStatus = orderStatus;
        this.orderId = orderId;
        this.customerId = customerId;
    }
}