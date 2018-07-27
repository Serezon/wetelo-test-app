import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = { email: '', password: '' };
  message = '';
  data: any;

  login() {
    this.http.post('http://localhost:4040/api/auth/login',this.loginData).subscribe(resp => {
      this.data = resp;
      localStorage.setItem('jwtToken', this.data.token);
      localStorage.setItem('email', this.loginData.email);
      this.router.navigate(['books']);
    }, err => {
      this.message = err.error.msg;
    });
  }

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

}
