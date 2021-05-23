import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const httpContext = context.switchToHttp();
    return next
      .handle()
      .pipe(
        map(data => ({
          succeeded: true,
          statusCode: httpContext.getResponse().statusCode,
          data }))
      );
  }

}