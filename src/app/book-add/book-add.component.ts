import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit {
  form: FormGroup;

  constructor(fb: FormBuilder, private http: HttpClient) {
    this.form = fb.group({
      author: [null, Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      status: [null, Validators.required],
      file: [null, Validators.required],
      rating: [null, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  @ViewChild("fileInput") fileInput;
  // Loading file
  addFile(): any {
    let fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
        return fi.files[0];
    }
    return null;
  }

  onSubmit(value: string) {
    let body = new FormData();
    body.append("file",this.addFile());
    Object.keys(this.form.value).forEach(k => {
      body.append(k, this.form.value[k]);
    });
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('jwtToken') })
    };
    this.http.post('http://localhost:4040/api/books/create', body, httpOptions).subscribe(
      data => {
        console.log(data);
        alert('Success!');
      }
    );
  }

  ngOnInit() {
  }

}
