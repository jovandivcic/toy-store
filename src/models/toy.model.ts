export interface ToyModel {
    id: number;
    name: string;
    overviewImage: string;
    profileImage: string;
    cartImage: string;
    description: string;
    type: string;
    age: string;
    targetAudience: string;
    dateOfManufacture: string;
    price: number;
    reviews: any[]; //možda ću morati zamijeniti modelom (chat gpt savjet)
    orderStatus: string;
    ratings: any[]; //možda ću morati zamijeniti modelom (chat gpt savjet)
}