import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { configKeys } from "./utils/config/config-keys";
import { dtoValidationPipe } from "./utils/pipes/dto-validation.pipe";
import * as session from "express-session";
import * as passport from "passport";
import { CustomLogger } from "./utils/config/logger.service";
import { HttpFilter } from "./utils/error-filters/http.filter";
import { DTOValidationFilter } from "./utils/error-filters/dto.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.init();

  const configService = new ConfigService();
  const logger = new CustomLogger();

  app.useLogger(logger);
  app.useGlobalPipes(dtoValidationPipe);
  app.useGlobalFilters(new DTOValidationFilter())
  app.useGlobalFilters(new HttpFilter());
  app.enableCors({
    origin: [configService.get(configKeys.frontendEndpoint)], // add the origin of your frontend endpoints
  });
  app.use(
    session({
      secret: configService.get(configKeys.sessionSecret),
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: parseInt(configService.get(configKeys.sessionMaxAge), 10), // In Milliseconds
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(parseInt(configService.get(configKeys.port), 10));
  logger.info('App is Listening on port: ' + configService.get(configKeys.port))
}

bootstrap();
