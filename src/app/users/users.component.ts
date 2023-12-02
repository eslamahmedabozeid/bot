import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../classes/User';
import {Router} from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  title = 'Users';
  users: User[] = [];
  @Output() updateUser = new EventEmitter<User>();

  constructor(private  service: UserService , private router: Router) {
    this.rols = localStorage.getItem('rols')
    this.id_rols = localStorage.getItem('id');

    if(this.rols == "user"){
      this.router.navigate([`/users/${this.id_rols}`]);
    }
  }
  hide = false
  rols:any
  id_rols:any
  ngOnInit() {
    this.service.getUsers().subscribe(
      (res)=>{
        if (res) {
          hideloader();
        }
        this.users = res.users
        console.log(this.users)
        function hideloader() {
        document.getElementById('loading')!.style.display = 'none';
        document.getElementById('reload')!.style.display = 'none';
    }
      }
    )
  }

  onDeleteUser(user: User) {
    const deleteUser = confirm('Do you really want to delete this user?');
    if (deleteUser) {
      this.service.deleteUser(user).subscribe(
        response => {
          const idx = this.users.indexOf(user);
          this.users.splice(idx, 1);
          alert('success');
        }
      );
    }
  }

  onSelectUser(user: User) {
    const userCopy = Object.assign({}, user);
    this.updateUser.emit(userCopy);
  }
}
