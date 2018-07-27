import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { TransferDataService } from '../transfer-data.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  form: FormGroup;

  constructor(fb: FormBuilder, private http: HttpClient, private router: Router, private transfer: TransferDataService) {
    if (this.transfer.book == undefined) {
      this.router.navigate(['books']);
    } else {
      this.form = fb.group({
        author: [transfer.book.author, Validators.required],
        title: [transfer.book.title, Validators.required],
        description: [transfer.book.description, Validators.required],
        status: [transfer.book.status, Validators.required],
        file: [null],
        rating: [transfer.book.rating, [Validators.required, Validators.min(1), Validators.max(5)]]
      });
      console.log(JSON.stringify(transfer.book));
    }
  }

  @ViewChild("fileInput") fileInput;

  addFile(): any {
    let fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
      return fi.files[0];
    }
    return null;
  }

  onSubmit(value: string): void {
    let body = new FormData();
    body.append("file", this.addFile());
    Object.keys(this.form.value).forEach(k => {
      body.append(k, this.form.value[k]);
    });
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('jwtToken') })
    };
    this.http.put('http://localhost:4040/api/books/' + this.transfer.book._id, body, httpOptions).subscribe(
      data => {
        console.log(data);
        alert('Successfully updated!');
        this.router.navigate(['books']);
      }
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.transfer.book = undefined;
  }

}
