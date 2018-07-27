import { Injectable } from '@angular/core';
import { Book } from './book/book.model';

@Injectable({
  providedIn: 'root'
})
export class TransferDataService {
  public book: Book;

  constructor() { }
}
