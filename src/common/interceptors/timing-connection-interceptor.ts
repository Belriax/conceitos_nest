import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { tap } from 'rxjs';

export class TimingConncetionInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const startTime = Date.now();
    console.log('TimingConnectionInterceptor executando ANTES...');

    // await new Promise((resolve) => setTimeout(resolve, 5000));

    return next.handle().pipe(
      tap(() => {
        const finalTIme = Date.now();
        const elapsed = startTime - finalTIme;
        console.log(
          `TimingConnectionInterceptor: levou ${elapsed}ms para executar`,
        );
      }),
    );
  }
}
