import { Injectable, LoggerService, Scope } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  CloudWatchLogsClient,
  PutLogEventsCommand,
} from "@aws-sdk/client-cloudwatch-logs";
import { blue, yellow, red, green } from "colors";
import { configKeys } from "./config-keys";

type StreamType = "debug" | "error" | "warn" | "info";

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLogger implements LoggerService {
  private cloudWatchLogsClient;
  private configService = new ConfigService();
  private devEnv =
    this.configService.get(configKeys.currentEnv) === "development";

  constructor() {
    if (!this.devEnv) {
      this.cloudWatchLogsClient = new CloudWatchLogsClient({
        credentials: {
          accessKeyId: this.configService.get(configKeys.awsAccessKey),
          secretAccessKey: this.configService.get(configKeys.awsSecretKey),
        },
        region: this.configService.get(configKeys.awsRegion),
      });
    }
  }

  private async writeToCloudwatch(
    message: string,
    stream: StreamType,
    trace?: string,
  ) {
    if (this.devEnv) return;

    try {
      const params = {
        logGroupName: "nest-app",
        logStreamName: stream,
        logEvents: [
          {
            timestamp: new Date().getTime(), // current time in milliseconds
            message: trace ? message + trace : message,
          },
        ],
      };

      const putLogEventsCommand = new PutLogEventsCommand(params);
      await this.cloudWatchLogsClient.send(putLogEventsCommand);
      return;
    } catch (error) {
      console.error("Error writing to CloudWatch:", error);
      throw new Error("Logger AWS cannot be initialized");
    }
  }

  writeToConsole(message: string, stream: StreamType, trace?: string) {
    let meta = `[${new Date().toISOString()}] [${stream}]`;

    if (stream === "info") meta = blue(meta);
    if (stream === "warn") meta = yellow(meta);
    if (stream === "debug") meta = green(meta);

    let msg = `${meta} : ${message}`;

    if (stream === "error") msg = red(msg);

    if (trace) console.log(msg + red(trace));
    else console.log(msg);
  }

  log(message: string) {
    // This automatic log for nestjs, also includes app intializing logs which we dont want to include in cloudwatch
    console.log(message);
  }

  error(message: string, trace: string) {
    this.writeToCloudwatch(message, "error", trace);
    this.writeToConsole(message, "error", trace);
  }

  warn(message: string) {
    this.writeToCloudwatch(message, "warn");
    this.writeToConsole(message, "warn");
  }

  info(message: string) {
    // replace the traditional `log`.
    this.writeToCloudwatch(message, "info");
    this.writeToConsole(message, "info");
  }

  debug(message: string) {
    this.writeToConsole("👾" + message, "debug");
  }
}
