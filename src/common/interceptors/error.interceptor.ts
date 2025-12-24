import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, InternalServerErrorException } from '@nestjs/common';
import { error } from 'console';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LogToFile } from 'src/common/SystemLog';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
        catchError((err)=>{
          if(err instanceof HttpException){
            // throw the http exceptions to user
            throw err
          }
          console.error('errror with : ', err);
          LogToFile(err); // log the error inside the file 
          return throwError(()=> new InternalServerErrorException('unexpected error accured'))
        })
    )
  }
}

