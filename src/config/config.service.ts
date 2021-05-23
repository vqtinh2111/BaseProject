import * as dotenv from 'dotenv';
import * as redisStore from 'cache-manager-redis-store';

export class ConfigService {
  private readonly config: Record<string, string>;

  constructor() {
    const conf = dotenv.config();
    if (conf.error) {
      throw new Error("Couldn't read config");
    }
    this.config = conf.parsed;
  }

  public get(key: string): string {
    return this.config[key];
  }

  public getPortConfig(): number {
    return parseInt(this.config['PORT']);
  }

  public getJwtConfig(): any {
    return {
      secret: this.get('JWT_SECRET_KEY'),
      signOptions: { expiresIn: Number(this.get('JWT_EXPIRATION_TIME')) },
    };
  }

  public getMongoConfig(): any {
    return {
      uri: this.config['MONGO_URL'],
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    };
  }

  public getRedisConfig(): any {
    return {
      store: redisStore,
      host: this.get('REDIS_HOST'),
      port: this.get('REDIS_PORT'),
      ttl: 120
    };
  }
}
