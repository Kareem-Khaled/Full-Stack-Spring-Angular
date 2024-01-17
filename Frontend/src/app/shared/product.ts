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
    categoryId: number;
    // dateCreated: Date;
    lastUpdated: Date;
    imageUrl: string;

    constructor(id: number, name: any, description: any, price: number, quantity: number, lastUpdated: Date, imageUrl: string, categoryId: number = 1) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        // this.dateCreated = dateCreated;
        this.lastUpdated = lastUpdated;
        this.imageUrl = imageUrl;
        this.categoryId = categoryId;
    }

}
