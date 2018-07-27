import { Component, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from "@angular/router";
import { Book } from "./book.model";
import { TransferDataService } from '../transfer-data.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  books: Book[] = [];
  bookSelected: boolean = false;
  currentBook: Book;
  params = { 'limit': '3', 'skip': '0', 'search': '' };
  order: number = -1;

  //Adding query params
  addSortBy(sortBy: string): void {
    if( this.params['sortBy'] == sortBy ) this.order = -this.order;
    this.params['sortBy'] = sortBy;
    this.params['order'] = this.order;
    this.getBooks();
  }

  //Listing books
  changePage(n: number): void {
    this.params.skip = ( +this.params.skip + +this.params.limit * n).toString();
    if (+this.params.skip < 0) this.params.skip = '0';
    this.bookSelected = false;
    this.getBooks();
  }

  //Stars based on ratingfor our books
  getStars(n: number): string {
    let result = '';
    for (let i=0; i<n; i++) result+=String.fromCharCode(9733);
    for (let i=n; i<5; i++) result+=String.fromCharCode(9734);
    return result;
  }

  constructor(private http: HttpClient, private router: Router, private transfer: TransferDataService) {

  }

  //Getting books list from API
  getBooks() {
    let bookCounter: number = 0;
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('jwtToken') }),
      params: this.params
    };
    this.http.get('http://localhost:4040/api/books', httpOptions).subscribe((data:Book[]) => {
      this.books = data.map((book) => {
        book.file = 'http://localhost:4040/' + book.file;
        bookCounter += 1;
        book.id = bookCounter;
        return new Book(book.author, book.title, book.rating, book.status, book.file, book.description, book.id, book._id);
      });
    }, err => {
      if (err.status === 401) {
        this.router.navigate(['login']);
      }
    });
  }
  
  //Routing to Edit route
  editBook (id: number): void {
    this.transfer.book = this.books[id-1];
    this.router.navigate(['edit']);
  }

  //Deleting book
  deleteBook (id: number): void{
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('jwtToken') })
    };
    this.http.delete('http://localhost:4040/api/books/' + id, httpOptions).subscribe(
      data => {
        this.getBooks();
        alert('Deleted!');
      }
    );
  }

  //Showing book details
  showDetails(id: string): void {
    this.bookSelected = true;
    id = (+id - 1).toString();
    this.currentBook = this.books[id];
    console.log( JSON.stringify(this.currentBook) );
  }

  //Makes search working
  addSearchParam(s: string): void {
    this.params.search = s;
    this.getBooks();
  }

  ngOnInit() {
    this.getBooks();
  }

}
