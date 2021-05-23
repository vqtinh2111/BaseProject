import { Module } from '@nestjs/common';
import { ConfigModule } from '../../config/config.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '../../config/config.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { RedisCacheModule } from "../redis/redis.cache.module";

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return configService.getJwtConfig();
      },
      inject: [ConfigService],
    }),
    UserModule,
    RedisCacheModule
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [PassportModule.register({ defaultStrategy: 'jwt' })]
})
export class AuthModule {

}