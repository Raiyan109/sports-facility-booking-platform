export type IRating = {
    user: string;
    rating: number;
}

export type TFacility = {
    name: string;
    image: string;
    description: string;
    pricePerHour: number;
    location: string;
    isDeleted?: boolean;
    ratings?: [IRating];
    averageRating?: number;
}

