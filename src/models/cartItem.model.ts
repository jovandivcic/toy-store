import { ToyModel } from "./toy.model";

export interface CartItemModel {
    toy: ToyModel;
    quantity: number;
    status: 'reserved' | 'delivered';
    rating: number | null;
    review: string;
}