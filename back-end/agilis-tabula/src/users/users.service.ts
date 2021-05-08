import { Injectable } from '@nestjs/common';
import { pool } from '../dbPool';

export interface User {
  userId: number;
  username: string;
  email: string;
  password: string;
}

@Injectable()
export class UsersService {
  async findOne(username: string): Promise<User | undefined> {
    const userData = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username],
    );
    const userObject = userData.rows[0];
    const user = this.convertToUser(userObject);
    console.log(user);

    return user;
  }

  convertToUser(userObj): User {
    const user: User = {
      userId: userObj.user_id,
      username: userObj.username,
      email: userObj.email,
      password: userObj.password,
    };

    return user;
  }
}
