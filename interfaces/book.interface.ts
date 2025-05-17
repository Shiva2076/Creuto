export interface IBook {
  id: string;
  title: string;
  author: string;
  publishedYear: number;
}

export interface IBookInput {
  title: string;
  author: string;
  publishedYear: number;
}