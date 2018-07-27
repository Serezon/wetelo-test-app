import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupData = { email: '', password: '' };
  message = '';

  signup() {
    this.http.post('http://localhost:4040/api/users/signup',this.signupData).subscribe(resp => {
      console.log(resp);
      this.router.navigate(['login']);
    }, err => {
      this.message = err.error.msg;
    });
  }

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

}
