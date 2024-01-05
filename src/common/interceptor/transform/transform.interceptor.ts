import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class CreateInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next
      .handle()
      .pipe(map((data) => ({ code: 200, data, message: '请求成功' })));
  }
}

@Injectable()
export class DeleteInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next
      .handle()
      .pipe(
        map((data) =>
          data.affected
            ? { code: 200, data, message: '删除成功' }
            : { code: 200, data, message: '找不到该数据，可能已被删除' },
        ),
      );
  }
}

@Injectable()
export class UpdateInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next
      .handle()
      .pipe(
        map((data) =>
          data.affected
            ? { code: 200, data, message: '修改成功' }
            : { code: 200, data, message: '该用户不存在' },
        ),
      );
  }
}

@Injectable()
export class QueryInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next
      .handle()
      .pipe(map((data) => ({ code: 200, data, message: '查询成功' })));
  }
}
