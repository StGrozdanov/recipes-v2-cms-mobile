import { InfiniteData } from "react-query";
import { DEV_BACKEND_URL, BACKEND_URL } from "@env";

export const BASE_URL = DEV_BACKEND_URL || BACKEND_URL;

export type RecipeSummary = {
    imageURL: string,
    recipeName: string,
    category?: string,
}

export type ResponsePages = {
    pages: RecipeSummary[],
    pageData: {
        prevPage: number,
        nextPage: number,
        firstPage: boolean,
        lastPage: boolean
    }
}

export type RecipesPlaceholderData = InfiniteData<ResponsePages>

export type LoginData = {
    username: string,
    password: string,
}

export type User = {
    id: number,
    username: string,
    avatarURL: string,
    coverPhotoURL: string | null,
    email: string,
    sessionToken: string,
    avatar: string,
    isAdministrator: boolean,
}

export type VerificationCodeResponse = {
    email: string,
    username: string,
    code: string,
}

export type ResetPasswordParams = {
    id: string,
    password: string,
}

export type RecipeDetails = {
    recipeName: string,
    products: string[],
    steps: string[],
    imageURL: string,
    category: string,
    difficulty: 'MEDIUM' | 'HARD' | 'EASY'
    preparationTime: number,
    calories: number,
    protein: number,
    owner: {
        username: string,
        id: number,
    }
}

export type UserProfileData = {
    username: string,
    avatarURL: string,
    coverPhotoURL: string,
    email: string,
    createdRecipesCount: number,
}

export type Notifications = {
    id: number,
    senderAvatar: string,
    senderUsername: string,
    action: "EDITED_RECIPE" | "CREATED_RECIPE" | "CREATED_COMMENT" | "EDITED_COMMENT",
    locationName: string,
    createdAt: string
}

export type CreateNotificationData = {
    senderAvatar: string,
    senderUsername: string,
    senderId: number,
    action: string,
    locationName: string,
    ownerName?: string,
}

export type UploadImageProps = {
    username: string,
    formData: FormData,
}

export type RecipeFavouritesProps = {
    recipeName: string,
    userId: number,
    token?: string,
}

export type UploadRecipeImageProps = {
    token: string,
    formData: FormData,
}

export type BaseCommentData = {
    content: string,
    recipeName: string,
    owner: {
        username: string,
        id: number,
    }
}

export type ChartDataFormat = {
    labels: string[],
    datasets: [
        {
            data: number[]
        }
    ]
}

export type RecipeSearchData = {
    content: string[],
}

export type UserSearchData = {
    content: string[],
}

export type CommentSearchData = {
    content: string[],
}

export type GlobalSearchData = {
    resultType: 'users' | 'comments' | 'recipes',
    content: string,
}