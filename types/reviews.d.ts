

interface Review {
    totalReview: number;
    averageRating: string;
}

interface ProductReview {
    id: string;
    rating: number;
    reviewText: string;
    user: User;
    products: Array<Product>
    createdTime: string;
    modifiedTime: string;
}