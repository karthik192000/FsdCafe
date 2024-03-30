export class OrderItem {


    itemName:string;
    itemPrice:number;
    quantity:number;
    totalPrice: number;


    constructor(itemName:string,itemPrice:number,quantity:number,totalPrice:number){
        this.itemName = itemName;
        this.itemPrice = itemPrice;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
    }

}