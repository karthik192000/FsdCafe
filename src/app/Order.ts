export class Order{

    itemKey:number;
    itemName:string;
    itemPrice:number;
    quantity:number;
    totalPrice: number;

    constructor(itemKey:number,itemName:string,itemPrice:number,quantity:number,totalPrice:number){
        this.itemKey = itemKey;
        this.itemName = itemName;
        this.itemPrice = itemPrice;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
    }
}