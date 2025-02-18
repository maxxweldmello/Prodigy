import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';
import { User } from './user-interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.css']
})
export class UsersDetailComponent implements OnInit, OnDestroy {
  user!: User | null;
  errMessage: string = '';
  sub!: Subscription;
  zeroId: string = "No Id Visible"

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe((params) => {
      const userId = params.get('id');
      if (userId) {
        this.userService.getUser().subscribe({
          next: (users) => {
            this.user = users.find((user) => user.userId === +userId)!;
            if (!this.user) {
              this.errMessage = 'User not found';
            }
          },
          error: (err) => (this.errMessage = err),
        });
      }
    });

    //SNAPSHOT
    // const userId = Number(this.route.snapshot.paramMap.get('id'));
    // if (userId) {
    //   this.userService.getUser().subscribe({
    //     next: (users) => {
    //       this.user = users.find((user) => user.userId === userId)!;
    //       if (!this.user) {
    //         this.errMessage = 'User not found';
    //       }
    //     },
    //     error: (err) => (this.errMessage = err),
    //   });
    // }  

  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }


}
