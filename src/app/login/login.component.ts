import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
 import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {User} from '../classes/User';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth:AuthService, private router: Router ,private  service: UserService ) {
    auth.usersignedin.subscribe(
      (user: User) => {
        if (this.email === 'admin@admin.com') {
         router.navigate(['/']);
        }else if(this.matchedUser){
          const userId = this.matchedUser.id;
          this.router.navigate([`/users/${userId}`]);
        }else{
          alert("email is not working")
        }
      }
    );
  }
  users:any
  ngOnInit() {
    this.service.getUsers().subscribe(
      (res)=>{
        this.users = res.users
        console.log(this.users)
      }
    )
  }

  id:any
  email:any
  password:any
  matchedUser:any
  signIn(form: NgForm) {
    this.email = form.value.email
    this.password = form.value.password;

    this.matchedUser = this.users.find(user => user.email === this.email && user.password === this.password);

    if (this.email === 'admin@admin.com') {
      this.router.navigate(['/']);
      this.auth.signIn(this.email, this.password);
      localStorage.setItem("rols",'admin')
    } else if(this.matchedUser){
      localStorage.setItem("rols",'user')
      const userId = this.matchedUser.id;
      this.router.navigate([`/users/${userId}`]);
      localStorage.setItem("id",userId)
      this.auth.signIn(this.email, this.password);
    }else{
      alert("email is not working")
    }
  }
}
