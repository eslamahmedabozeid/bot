import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../classes/User';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

  public title = 'User Detail';
  public User: User;
  constructor( private route: ActivatedRoute,
               private userService: UserService,
               private router: Router
  ) {
  }
  datas:any
  ngOnInit() {
    this.User =  new User();
    this.route.paramMap.subscribe(
      (p) => {
        this.userService.getUser(+p.get('id')).subscribe(
          (res)=>{
            this.datas = res
          }
        );
      }
    );
  }
  backToUsers() {
    this.router.navigate(['users']);
  }
  id:any
  editeToUsers() {
    this.id = localStorage.getItem('id')
    this.router.navigate([`users/${this.id}/edit`]);
  }
}
