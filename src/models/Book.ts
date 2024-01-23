import { IAuthor } from "./Author";
import { IGenre } from "./Genre";

export enum grade {
  First = "1ro",
  Second = "2do",
  Third = "3ero",
}

export interface IBook {
  id: string;
  title: string;
  grade: grade;
  author: IAuthor;
  summary?: string;
  rate: number;
  genre: IGenre;
}

export interface BookFromAPI extends IBook {
  image?: string;
}

export interface BookFromUser extends IBook {
  image: File;
}
