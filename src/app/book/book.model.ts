export class Book {
  constructor(
    public author: string,
    public title: string,
    public rating: number,
    public status: boolean,
    public file: string,
    public description: string,
    public id: number,
    public _id: string
  ) {}
}