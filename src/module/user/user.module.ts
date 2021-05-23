import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from '../../repository/user.repository';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../entity/user/user.schema';
import { UserLogin, UserLoginSchema } from '../../entity/user/userLogin.schema';
import { UserLoginService } from './user.login.service';
import { RedisCacheModule } from "../redis/redis.cache.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserLogin.name, schema: UserLoginSchema },
    ]),
    RedisCacheModule
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, UserLoginService],
  exports: [UserService, UserRepository, UserLoginService],
})
export class UserModule {}