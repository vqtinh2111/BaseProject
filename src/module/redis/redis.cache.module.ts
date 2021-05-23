import { CacheModule, Module } from "@nestjs/common";
import { ConfigModule } from "../../config/config.module";
import { ConfigService } from "../../config/config.service";
import { RedisCacheService } from "./redis.cache.service";

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.getRedisConfig()
    }),
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService]
})
export class RedisCacheModule {

}