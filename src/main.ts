import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { configKeys } from "./utils/config/config.keys";
import { argsValidationError } from "./utils/errors/ArgsValidationError";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.init();

  // config the validation error for DTOs
  app.useGlobalPipes(argsValidationError);
  // TODO: implement unexpected error

  const configService = new ConfigService();

  app.enableCors({
    origin: [configService.get(configKeys.frontendEndpoint)], // add the origin of your frontend endpoints
  });

  await app.listen(configService.get(configKeys.port));
}

bootstrap();
