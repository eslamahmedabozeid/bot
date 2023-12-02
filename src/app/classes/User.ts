import {UserInterface} from '../interfaces/user';

export class User implements UserInterface {
  id: number;
  name: string;
  firstName:string;
  lastName: string;
  email: string;
  fiscalCode: string;
  province: string;
  phone: string;
  age: number;
  gender:string
  constructor() {
    // this.id = 0;
    // this.fiscalCode = '';
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.phone = '';
    this.gender = 'male';
    this.age = 18;
  }
  lastname: string;
}
