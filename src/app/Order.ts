import { OrderItem } from "./OrderItem";

export class Order{


    orderItemList:OrderItem[];

    totalOrderPrice:number;

    constructor(orderItemList:OrderItem[],totalOrderPrice:number){
        this.orderItemList  = orderItemList;
        this.totalOrderPrice = totalOrderPrice;
    }
}