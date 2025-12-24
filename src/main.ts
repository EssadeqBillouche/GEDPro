
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import morgan from 'morgan';
import { ErrorInterceptor } from './common/interceptors/error.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(morgan('dev'))
  app.useGlobalInterceptors(new ErrorInterceptor()) // error interceptor
   // swager
  const config = new DocumentBuilder()
    .setTitle('GEDPro')
    .setDescription('Plateforme GED RH Intelligente')
    .setVersion('1.0')
    .addTag('GEDPro')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  // endSwager
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
