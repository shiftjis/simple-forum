import { Logger, ILogObj } from "tslog"

declare global {
    var logger: Logger<ILogObj> | undefined
}

export const logger = globalThis.logger || new Logger<ILogObj>({
    prettyLogTemplate: "[{{logLevelName}}]\t"
})
globalThis.logger = logger
