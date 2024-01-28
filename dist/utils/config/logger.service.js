"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomLogger = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const client_cloudwatch_logs_1 = require("@aws-sdk/client-cloudwatch-logs");
const colors_1 = require("colors");
const config_keys_1 = require("./config-keys");
let CustomLogger = class CustomLogger {
    constructor() {
        this.configService = new config_1.ConfigService();
        this.devEnv = this.configService.get(config_keys_1.configKeys.currentEnv) === "development";
        if (!this.devEnv) {
            this.cloudWatchLogsClient = new client_cloudwatch_logs_1.CloudWatchLogsClient({
                credentials: {
                    accessKeyId: this.configService.get(config_keys_1.configKeys.awsAccessKey),
                    secretAccessKey: this.configService.get(config_keys_1.configKeys.awsSecretKey),
                },
                region: this.configService.get(config_keys_1.configKeys.awsRegion),
            });
        }
    }
    async writeToCloudwatch(message, stream, trace) {
        if (this.devEnv)
            return;
        try {
            const params = {
                logGroupName: "nest-app",
                logStreamName: stream,
                logEvents: [
                    {
                        timestamp: new Date().getTime(),
                        message: trace ? message + trace : message,
                    },
                ],
            };
            const putLogEventsCommand = new client_cloudwatch_logs_1.PutLogEventsCommand(params);
            await this.cloudWatchLogsClient.send(putLogEventsCommand);
            return;
        }
        catch (error) {
            console.error("Error writing to CloudWatch:", error);
            throw new Error("Logger AWS cannot be initialized");
        }
    }
    writeToConsole(message, stream, trace) {
        let meta = `[${new Date().toISOString()}] [${stream}]`;
        if (stream === "info")
            meta = (0, colors_1.blue)(meta);
        if (stream === "warn")
            meta = (0, colors_1.yellow)(meta);
        if (stream === "debug")
            meta = (0, colors_1.green)(meta);
        let msg = `${meta} : ${message}`;
        if (stream === "error")
            msg = (0, colors_1.red)(msg);
        if (trace)
            console.log(msg + (0, colors_1.red)(trace));
        else
            console.log(msg);
    }
    log(message) {
        console.log(message);
    }
    error(message, trace) {
        this.writeToCloudwatch(message, "error", trace);
        this.writeToConsole(message, "error", trace);
    }
    warn(message) {
        this.writeToCloudwatch(message, "warn");
        this.writeToConsole(message, "warn");
    }
    info(message) {
        this.writeToCloudwatch(message, "info");
        this.writeToConsole(message, "info");
    }
    debug(message) {
        this.writeToCloudwatch(message, "debug");
        this.writeToConsole("👾" + message, "debug");
    }
};
exports.CustomLogger = CustomLogger;
exports.CustomLogger = CustomLogger = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __metadata("design:paramtypes", [])
], CustomLogger);
//# sourceMappingURL=logger.service.js.map