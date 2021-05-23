import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ResponseInterceptor } from "./middleware/interceptor/response.interceptor";

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseInterceptor());
  await app.listen(port);
}

bootstrap();
