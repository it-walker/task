import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger'

import { AppModule } from '@src/app.module'
import { AppConfigService } from '@src/config/app/config.service'
import { ExceptionInterceptor } from '@src/infrastructure/interceptors/exception.interceptor'

/**
 *
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = new DocumentBuilder()
    .setTitle('task manager')
    .setDescription('The task manager API description')
    .setVersion('1.0')
    .addTag('task')
    .build()
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  }
  const document = SwaggerModule.createDocument(app, config, options)
  SwaggerModule.setup('api', app, document)
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new ExceptionInterceptor())
  app.enableShutdownHooks()

  const appConfig = app.get(AppConfigService)
  await app.listen(appConfig.port)
}
bootstrap()
