import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { configKeys } from "./utils/config/config-keys";
import { argsValidationError } from "./utils/errors/ArgsValidationError";
import * as session from "express-session";
import * as passport from "passport";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.init();

  const configService = new ConfigService();

  app.useGlobalPipes(argsValidationError);
  app.enableCors({
    origin: [configService.get(configKeys.frontendEndpoint)], // add the origin of your frontend endpoints
  });
  app.use(
    session({
      secret: configService.get(configKeys.sessionSecret),
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: parseInt(configService.get(configKeys.sessionMaxAge), 10)  // In Milliseconds
      }
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(parseInt(configService.get(configKeys.port), 10));
}

bootstrap();
