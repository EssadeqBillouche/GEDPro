import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './config/config';
import cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  // Allow frontend to call API with cookies
  app.enableCors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });

  // All routes start with /api
  app.setGlobalPrefix('api');

  // ============ Swagger API Docs ============
  const swaggerConfig = new DocumentBuilder()
    .setTitle('GEDPro API')
    .setDescription(
      `
## Intelligent HR Document Management Platform

### Authentication
All protected endpoints require a JWT Bearer token in the Authorization header.

### Multi-Tenancy
Each user belongs to an organization. Data is isolated per-tenant.

### Available Modules
- **Auth**: Login, Register, Token Refresh
- **Users**: User management
- **Candidates**: Candidate lifecycle management
- **Organizations**: Tenant management
    `,
    )
    .setVersion('1.0')
    // JWT token auth (shows lock icon on protected endpoints)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter your JWT access token',
        in: 'header',
      },
      'access-token',
    )
    // Refresh token in cookies
    .addCookieAuth('refreshToken', {
      type: 'apiKey',
      in: 'cookie',
      name: 'refreshToken',
    })
    // Endpoint groups
    .addTag('Auth', 'Authentication endpoints (login, register, refresh)')
    .addTag('Users', 'User management')
    .addTag('Candidates', 'Candidate lifecycle management')
    .addTag('Organizations', 'Tenant management')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  // Swagger UI available at /api/docs
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
    customSiteTitle: 'GEDPro API Documentation',
  });

  await app.listen(config.PORT);

  console.log(`🚀 Application running on: http://localhost:${config.PORT}/api`);
  console.log(`📚 Swagger docs available at: http://localhost:${config.PORT}/api/docs`);
}

bootstrap().catch((error) => {
  console.error('Error during application bootstrap:', error);
  process.exit(1);
});
