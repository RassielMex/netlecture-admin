export enum grade {
  First = "PRIMERO",
  Second = "SEGUNDO",
  Third = "TERCERO",
}

export interface IBook {
  id: string;
  title: string;
  grade: grade;
  author: string;
  review?: string;
  rate?: number;
}

export interface BookFromAPI extends IBook {
  imgURL?: string;
}

export interface BookFromUser extends IBook {
  image: File;
}
