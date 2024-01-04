export class Product {
    id: number;
    name: {
        [key: string]: string
    };
    description: {
        [key: string]: string
    };
    price: number;
    quantity: number;
    dateCreated: Date;
    lastUpdated: Date;
    imageUrl: string;

    constructor(id: number, name: any, description: any, price: number, quantity: number, dateCreated: Date, lastUpdated: Date, imageUrl: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.dateCreated = dateCreated;
        this.lastUpdated = lastUpdated;
        this.imageUrl = imageUrl;
    }

}
