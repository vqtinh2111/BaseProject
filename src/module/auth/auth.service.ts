import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { User } from '../../entity/user/user.schema';
import { JwtToken } from './jwt.token';
import { ConfigService } from '../../config/config.service';
import { UserDto } from '../user/dto/user.dto';
import { UserLoginService } from '../user/user.login.service';
import { RedisCacheService } from "../redis/redis.cache.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userLoginService: UserLoginService,
  ) {
  }

  async login(username: string, password: string): Promise<JwtToken> {
    const user = await this.validateUser(username, password);
    return this.generateToken(user);
  }

  async generateToken(user: User): Promise<JwtToken> {
    const jwtToken = new JwtToken();
    const userDto = new UserDto(user);
    jwtToken.accessToken = await this.jwtService.signAsync({
      sub: user._id,
      ...userDto,
    });
    jwtToken.expiresIn = Number(this.configService.get('JWT_EXPIRATION_TIME'));
    this.saveUserToken(user, jwtToken);
    return jwtToken;
  }

  private saveUserToken(user: User, jwtToken: JwtToken) {
    this.userLoginService.saveLoginSession(user._id, jwtToken.accessToken);
  }

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.getByUserName(username);
    const isMatched = await argon2.verify(user.password, password);
    if (!isMatched) {
      throw new BadRequestException('Invalid password');
    }
    return user;
  }
}