export class Menu{


    itemKey:number;
    itemName:string;
    itemCategory:string;
    vegOrNonVeg:string;
    itemPrice:number;


    constructor(itemKey:number,itemName:string,itemCategory:string,itemPrice:number,vegOrNonVeg:string){
        this.itemKey=itemKey;
        this.itemName=itemName;
        this.itemCategory=itemCategory;
        this.itemPrice=itemPrice;
        this.vegOrNonVeg = vegOrNonVeg;
    }

}