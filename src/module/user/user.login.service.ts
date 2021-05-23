import { InjectModel } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Model, Types } from "mongoose";
import { UserLogin } from "../../entity/user/userLogin.schema";
import { RedisCacheService } from "../redis/redis.cache.service";

export class UserLoginService {
  constructor(
    @InjectModel(UserLogin.name)
    private readonly userLoginModel: Model<UserLogin>,
    private readonly redisCacheService: RedisCacheService
  ) {
  }

  async blockUser(userId: string) {
    const userLogins = await this.getAllToken(userId);
    const tokens = userLogins.map((userLogin) => userLogin.accessToken);
    for (const token of tokens) {
      await this.redisCacheService.set(token, true);
    }
  }

  async saveLoginSession(
    userId: string,
    accessToken: string
  ): Promise<UserLogin> {
    const userLogin = new this.userLoginModel();
    userLogin.userId = new Types.ObjectId(userId);
    userLogin.accessToken = accessToken;
    return userLogin.save();
  }

  async getAllToken(userId: string): Promise<UserLogin[]> {
    const query = {
      userId: new Types.ObjectId(userId)
    };
    return this.userLoginModel.find(query).exec();
  }
}