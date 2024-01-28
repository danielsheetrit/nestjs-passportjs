import { LoggerService } from "@nestjs/common";
type StreamType = "debug" | "error" | "warn" | "info";
export declare class CustomLogger implements LoggerService {
    private cloudWatchLogsClient;
    private configService;
    private devEnv;
    constructor();
    private writeToCloudwatch;
    writeToConsole(message: string, stream: StreamType, trace?: string): void;
    log(message: string): void;
    error(message: string, trace: string): void;
    warn(message: string): void;
    info(message: string): void;
    debug(message: string): void;
}
export {};
