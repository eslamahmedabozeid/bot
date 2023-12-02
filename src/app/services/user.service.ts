import {Injectable} from '@angular/core';
import {User} from '../classes/User';
import {UserInterface} from '../interfaces/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  users: User[] = [];
  private APIURL = 'https://dummyjson.com/users';

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  getAuthHeader(): HttpHeaders {
    const headers = new HttpHeaders(
      {
        Authorization: 'Bearer ' + this.auth.getToken()
      }
  );
    return headers;
  }

  getUsers(): Observable <any> {
    return this.http.get(this.APIURL);
  }

  getUser(id: number) {
    return this.http.get(this.APIURL + '/' + id, {
      headers: this.getAuthHeader()
    });
  }

  deleteUser(user) {
    return this.http.delete(this.APIURL + '/' + user.id);
  }

  updateUser(user: UserInterface , id:string) {
    user['_method'] = 'PUT';
    return this.http.put(this.APIURL + '/' + id , {
      headers: this.getAuthHeader()
    });
  }

  createUser(user: UserInterface) {
    return this.http.post('https://dummyjson.com/users/add', user);
  }
}
