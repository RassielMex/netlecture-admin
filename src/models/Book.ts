import { IAuthor } from "./Author";
import { IGenre } from "./Genre";

export enum grade {
  First = "PRIMERO",
  Second = "SEGUNDO",
  Third = "TERCERO",
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
  imgURL?: string;
}

export interface BookFromUser extends IBook {
  image: File;
}
