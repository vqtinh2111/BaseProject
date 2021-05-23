import { CacheModule, MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { logger } from './middleware/logging/logger.middleware';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { RedisCacheModule } from "./module/redis/redis.cache.module";

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.getMongoConfig(),
    }),
    UserModule,
    AuthModule,
    RedisCacheModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(logger)
      .forRoutes({ path: '(.*)', method: RequestMethod.ALL });
  }
}
