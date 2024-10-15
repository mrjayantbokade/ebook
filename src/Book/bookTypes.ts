import { IAuthor } from "../Author/authorTypes";

export interface IBook{

    _id: string,
    tittle: string,
    author: IAuthor,
    file: string,
    coverImage: string,
    description: string,
    genre: string,
    createdAt: Date,
    updatedAt: Date
    
}
