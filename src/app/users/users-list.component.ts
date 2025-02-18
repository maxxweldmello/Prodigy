import { Component, OnInit } from '@angular/core';
import { User } from './user-interface';
import { Subscription } from 'rxjs';
import { UserService } from './user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  selectedUser!: User;
  errMessage: string = '';
  sub!: Subscription;

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.sub = this.userService.getUser().subscribe({
      next: users => {
        this.users = users
      },
      error: err => this.errMessage = err
    })

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
