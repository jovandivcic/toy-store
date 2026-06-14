export interface ReviewModel {
    id: number;
    toyId: number;
    userEmail: string;
    userFullName: string;
    rating: number;
    comment: string;
    createdAt: string;
}