import { User } from '../../../entity/user/user.schema';

export class UserDto {
  _id: string;
  userName: string;
  fullName: string;
  email: string;
  phone: string;
  constructor(user: User) {
    this._id = user._id;
    this.userName = user.userName;
    this.fullName = user.fullName;
    this.email = user.email;
    this.phone = user.phone;
  }
}
