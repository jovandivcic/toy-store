import { ReviewModel } from "../models/review.model";
import { UserService } from "./user.service";

export class ReviewService {



    private static storageKey = 'toy_reviews';


    static getAllReviews(): ReviewModel[]{
        return JSON.parse(
            localStorage.getItem(this.storageKey) ?? '[]');
    }


    static saveAllReviews(reviews: ReviewModel[]) {
        localStorage.setItem(
            this.storageKey,
            JSON.stringify(reviews)
        );
    }


    static addReview(toyId: number, rating: number, comment: string) {
        const activeUser = UserService.getActiveUser();

        if (!activeUser) {
            throw new Error("USER_NOT_FOUND");
        }

        const reviews = this.getAllReviews();

        const newReview: ReviewModel = {
            id: Date.now(),
            toyId: toyId,
            userEmail: activeUser.email,
            userFullName: activeUser.fullName,
            rating: rating,
            comment: comment,
            createdAt: new Date().toISOString()
        };
        reviews.push(newReview);
        this.saveAllReviews(reviews);
    }

    static getReviewsByToyId(toyId: number): ReviewModel[]{
        const allReviews = this.getAllReviews();

        return allReviews.filter(review => review.toyId === toyId);
    }


    static getAverageRatingByToyId(toyId: number): number {
        const allReviews = this.getReviewsByToyId(toyId);

        if (allReviews.length === 0) {
            return 0;
        }
        const sum = allReviews.reduce(
            (total, review) => total + review.rating,
            0
        );
        return Math.floor(sum / allReviews.length);
    }

}