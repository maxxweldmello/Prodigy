import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { User } from './user-interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm!: FormGroup;
  errorMessage: string = '';
  users: User[] = [];

  constructor(
    private builder: FormBuilder, 
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userForm = this.builder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get username() {
    return this.userForm.controls['username'];
  }

  get password() {
    return this.userForm.controls['password'];
  }

  authenticate(): void {
    const username = this.userForm.value.username;
    const password = this.userForm.value.password;

    this.userService.getUser().subscribe((users: User[]) => {
      const user = users.find(u => u.username === username && u.password === password);
      
      if (user) {
        if (this.userService.login(username, password)) {
          this.router.navigate(['/products']).then(() => {
            this.router.navigate([{ outlets: { notificationOutlet: ['notification'] } }]);
          });
        }
      } else {
        this.errorMessage = 'Invalid Username or Password';
      }
    });
  }
}
