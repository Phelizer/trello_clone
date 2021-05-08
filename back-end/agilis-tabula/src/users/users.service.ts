import { BadRequestException, Injectable } from '@nestjs/common';
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

    return user;
  }

  async createUser(username: string, email: string, password: string) {
    // error handling
    const existingUser = await pool.query(
      'SELECT username FROM users WHERE username = $1',
      [username],
    );
    if (existingUser.rows.length !== 0)
      throw new BadRequestException('User already exists');

    // inserting new user
    const userData = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING user_id, username, email',
      [username, email, password],
    );

    // formatting output
    const userObj = userData.rows[0];
    const user = {
      userId: userObj.user_id,
      username: userObj.username,
      email: userObj.email,
    };

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
