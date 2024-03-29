import { page } from "./page";
import { Product } from "./product";

export interface ProductResponse {
    _embedded: {
        products: Product[];
    };
    page: page;
}
