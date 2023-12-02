import {Component, Input, OnInit} from '@angular/core';
import {User} from '../classes/User';
import {UserService} from '../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  private userCopy: User;
  private __user: User;

  @Input() set user(user: User) {
    this.__user = user;

  }

  get user() {
    return this.__user;
  }
  id:any
  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }
  users:any
  ngOnInit() {
    this.user = new User();
    this.route.paramMap.subscribe(
      (params) => {
        if (!params.get('id')) {
          return;
        }
        this.userService.getUser(+params.get('id')).subscribe(
         (res)=>{
          this.users = res
          console.log("bbb", this.users)
         }
        );
      }
    );
  }

  saveUser() {
    // if (this.user.id > 0) {
    //   this.updateUser(this.user);
    // } else {
    //   this.createUser(this.user);
    // }
  }

  createUser() {
    this.userService.createUser(this.user).subscribe(response => {
      if (response['success']) {
        alert('success');
      } else {
        alert("success");
      }
       this.router.navigate(['users']);
    });
  }

  updateUser() {
    this.userService.updateUser(this.user,this.id).subscribe(response => {
        if (response['success']) {
          alert('success');
        } else {
          alert('success');
        }
        this.router.navigate(['users']);
      }
    );
  }

  resetForm() {

    if (this.user.id === 0) {
      this.user = new User();
    } else {
      this.user = this.userCopy;
    }
  }

  backToUsers() {
    this.router.navigate(['users']).then();
  }
}
